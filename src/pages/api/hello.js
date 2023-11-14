import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { generateQuestions } from '../../utils/generateQuestions';
import { generateMathQuestions } from '../../utils/generateMathQuestions';
import { getRandomDocument } from '../../utils/getRandomDocument';
import { generatePdf } from '../../utils/generatePdf';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed!' });
  }

  const body = req.body;
  const { timestamp, questionCategory, questionSubCategory, mathSubTopic, questionCount, questionType, format } = body;
  console.log(JSON.stringify(body));

  let result;
  let passageText = "";

  switch (questionCategory) {
    case 'reading':
      try {
        // Call the generateQuestions function to get a StreamingTextResponse
        const streamingResponse = await generateQuestions(passageText);
        const document = await getRandomDocument(questionSubCategory);
        passageText = document.text;

        let chunks = '';
        const reader = streamingResponse.body.getReader();
        const readNextChunk = async () => {
          const { done, value } = await reader.read();
          if (done) {
            try {
              result = JSON.parse(chunks);
              console.log(result)
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
      try {
        // Call the generateQuestions function to get a StreamingTextResponse
        const streamingResponse = await generateMathQuestions(questionCount, questionSubCategory, mathSubTopic);


        let chunks = '';
        const reader = streamingResponse.body.getReader();
        const readNextChunk = async () => {
          const { done, value } = await reader.read();
          if (done) {
            try {
              result = JSON.parse(chunks);
              console.log(result)
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
    default:
      break;
  }

  if (!result) {
    return res.status(404).json({ message: 'Failed to process response.' });
  }

  try {
    const pdfBuffer = await generatePdf(passageText, result.questions, questionCategory);

    const localFilePath = path.join(process.cwd(), 'public', `sat_${questionCategory}_test.pdf`);
    fs.writeFileSync(localFilePath, pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Error generating PDF' });
  }

  console.log("Generated the PDF")

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2',
  });

  const s3 = new AWS.S3();
  const pdfFilename = `sat_${questionCategory}_test.pdf`;
  const pdfFilePath = path.join(process.cwd(), 'public', `sat_${questionCategory}_test.pdf`);
  const pdfUrl = `https://qgenbucket.s3.us-east-2.amazonaws.com/${pdfFilename}`;

  try {
    const pdfFile = await fs.promises.readFile(pdfFilePath);
    console.log("Successfully read the file")
    await s3.putObject({
      Bucket: process.env.PDF_BUCKET_NAME,
      Key: pdfFilename,
      Body: pdfFile,
      ContentType: 'application/pdf',
    }).promise();

    console.log("put PDF in S3 bucket")

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
