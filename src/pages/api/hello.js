import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed!' });
  }

  const body = req.body;
  const { timestamp, questionCategory, questionSubCategory, questionCount, questionType, format } = body;

  const response = await fetch(`http://localhost:3000/api/getRandomDocument?category=${questionSubCategory}`);
  const data = await response.json();
  const passageText = data.text;

  let result;

  switch (questionCategory) {
    case 'reading':
      try {
        const fetchResponse = await fetch('http://localhost:3000/api/generateQuestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: passageText }),
        });

        if (!fetchResponse.ok) {
          console.error('API call failed:', fetchResponse.statusText);
          return res.status(fetchResponse.status).send({ message: 'API call failed.' });
        }

        let chunks = '';
        const reader = fetchResponse.body.getReader();
        const readNextChunk = async () => {
          const { done, value } = await reader.read();
          if (done) {
            try {
              result = JSON.parse(chunks);
            } catch (error) {
              console.error('Failed to parse JSON', error);
              return res.status(500).json({ message: 'Failed to parse response.' });
            }
          } else {
            chunks += new TextDecoder().decode(value);
            await readNextChunk();
          }
        };
        await readNextChunk();

      } catch (error) {
        console.error('Error while fetching:', error);
        return res.status(500).send({ message: 'Internal server error.' });
      }
      break;

    case 'writing':
      result = { success: true, message: 'Placeholder' };
      break;
    case 'math':
      result = { success: true, message: 'Placeholder' };
      break;
    default:
      break;
  }

  if (!result) {
    return res.status(404).json({ message: 'Failed to process response.' });
  }

  try {
    const pdfResponse = await fetch('http://localhost:3000/api/generatePdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: body, message: result, passage: passageText }),
    });

    if (!pdfResponse.ok) {
      console.error('PDF generation failed:', pdfResponse.statusText);
      return res.status(pdfResponse.status).send({ message: 'PDF generation failed.' });
    }

  } catch (error) {
    console.error('Error while generating PDF:', error);
    return res.status(500).send({ message: 'Internal server error during PDF generation.' });
  }

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2',
  });

  const s3 = new AWS.S3();
  const pdfFilename = "sat_reading_test.pdf";
  const pdfFilePath = path.join(process.cwd(), 'public', 'sat_reading_test.pdf');
  const pdfUrl = `https://qgenbucket.s3.us-east-2.amazonaws.com/${pdfFilename}`;

  try {
    const pdfFile = await fs.promises.readFile(pdfFilePath);
    await s3.putObject({
      Bucket: process.env.PDF_BUCKET_NAME,
      Key: pdfFilename,
      Body: pdfFile,
      ContentType: 'application/pdf',
    }).promise();

    res.status(200).json({
      body_data: body,
      message: result,
      pdf_url: pdfUrl,
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'PDF not found' });
    } else if (error.code === 'CredentialsError') {
      res.status(401).json({ error: 'Credentials not available' });
    } else {
      res.status(500).json({ error: 'Failed to upload PDF to S3.' });
    }
  }
}
