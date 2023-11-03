import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

export default async (req, res) => {

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

    console.log("File is found")
    
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
    //   body_data: body,
    //   message: result,  // replace this with your actual data
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
};
