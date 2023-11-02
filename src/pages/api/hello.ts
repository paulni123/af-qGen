import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';


type ResponseData = {
  name?: string;
  message?: string | { success: boolean; message: string; };
  data?: any; // To send back the received data for debugging purposes
  connection?: any;
  passage?: string;
  error?: any;
  body_data?: any;
  pdf_url?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed!' });
  }

  const body = req.body;

  const {
    timestamp,
    questionCategory,
    questionSubCategory,
    questionCount,
    questionType,
    format
  } = body;

  const response = await fetch(
    `http://localhost:3000/api/getRandomDocument?category=${questionSubCategory}`
  );
  const data = await response.json();

  const passageText = data.text;

  // console.log(passageText);

  let result;

  switch (questionCategory) {
    case 'reading':
      try {
        const fetchResponse = await fetch(
          'http://localhost:3000/api/generateQuestions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: passageText }), // Send it as a JSON object
          }
        );
    
        if (!fetchResponse.ok) {
          console.error('API call failed:', fetchResponse.statusText);
          return res
            .status(fetchResponse.status)
            .send({ message: 'API call failed.' });
        }
    
        let chunks = '';
        const reader = fetchResponse.body.getReader();
        const readNextChunk = async () => {
          const { done, value } = await reader.read();
        
          if (done) {
            try {
              console.log(chunks)
              result = JSON.parse(chunks);
            } catch (error) {
              console.error("Failed to parse JSON", error);
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

  console.log('Reached here');

  // If the result was successfully parsed, it can be sent in the response.
  if (!result) {
    return res.status(404).json({ message: 'Failed to process response.' });
  }

  // Call the generatePDF endpoint with the necessary data
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

    // If you want to get the data from the PDF generation, use this:
    // const pdfData = await pdfResponse.json();

  } catch (error) {
    console.error('Error while generating PDF:', error);
    return res.status(500).send({ message: 'Internal server error during PDF generation.' });
  }

  // Set the AWS credentials
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
  });

  const s3 = new AWS.S3();

  const pdfFilename = "sat_reading_test.pdf";
  const pdfFilePath = path.join(process.cwd(), 'public', 'sat_reading_test.pdf');  // Assuming the PDF is generated here
  const pdfUrl = `https://qgenbucket.s3.us-east-2.amazonaws.com/${pdfFilename}`;

  try {
    // Read the PDF file
    const pdfFile = await fs.promises.readFile(pdfFilePath);
    
    // Upload the PDF to S3
    await s3.putObject({
      Bucket: process.env.PDF_BUCKET_NAME,
      Key: pdfFilename,
      Body: pdfFile,
      ContentType: 'application/pdf',
    }).promise();

    console.log(pdfUrl)

    // After successful upload, you can send the response
    res.status(200).json({
      body_data: body,
      message: result,  // replace this with your actual data
      pdf_url: pdfUrl
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File not found error
      res.status(404).json({ error: 'PDF not found' });
    } else if (error.code === 'CredentialsError') {
      // AWS credentials error
      res.status(401).json({ error: 'Credentials not available' });
    } else {
      // Other errors
      res.status(500).json({ error: 'Failed to upload PDF to S3.' });
    }
  }
}
