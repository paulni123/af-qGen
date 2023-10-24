import getRandomDocument from '../utils/getRandomDocument.js';
import dbConnect from '../utils/dbConnect.js';

export default async function processReadingCategory(questionSubCategory, questionCount, questionType, format) {
    const document = await getRandomDocument(questionSubCategory);

    if (!document) {
        return "No document found";
    }

    return document.text;

}