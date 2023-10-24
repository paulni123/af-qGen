import Passage from '../models/Passage.js'

// PreCondition: Connected to MongoDB Cluster Already
export default async function getRandomDocument(category) {

    const randomDocs = await Passage.aggregate([
        { $match: { category: category } }, // Filter by the desired category
        { $sample: { size: 1 } }  // Return 1 random document
    ])

    if (randomDocs.length) return randomDocs[0];

    return null;
}
