import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/dbConnect.js'
import processReadingCategory from '../../processCategories/processReadingCategory.js'

type ResponseData = {
  name?: string
  message?: string
  data?: any // To send back the received data for debugging purposes
  connection?: any
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed!' });
  }

  await dbConnect();

  const body = req.body;

  const { timestamp, questionCategory, questionSubCategory, questionCount, questionType, format } = body;

  let result;

  switch (questionCategory) {
    case "reading":
      result = await processReadingCategory(questionSubCategory, questionCount, questionType, format);
      break;
    case "writing":
      result = { success: true, message: "Placeholder" }
      break;
    case "math":
      result = { success: true, message: "Placeholder" }
      break;
    default:
      break;
  }

  // if (!result?.success) {
  //   return res.status(404).json({ message: result?.message });
  // }

  res.status(200).json({ data: body, message: result });
}



