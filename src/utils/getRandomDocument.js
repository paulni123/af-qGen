import { MongoClient } from 'mongodb';

const dbName = process.env.MONGO_DB_NAME;
const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const URI = `mongodb+srv://${username}:${password}@afqgen.fj5fz10.mongodb.net/${dbName}?retryWrites=true&w=majority`;

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = client.db(dbName);
  return cachedDb;
}

// This function can now be used directly in your other code.
export async function getRandomDocument(category) {
  if (!category) {
    throw new Error('Category is required to fetch the document');
  }

  const db = await connectToDatabase(URI);
  const passageCollection = db.collection('passagesNew');

  const randomDocs = await passageCollection.aggregate([
    { "$match": { "category": category } },
    { "$sample": { "size": 1 } }
  ]).toArray();

  if (!randomDocs.length) {
    throw new Error('No document found');
  }

  return randomDocs[0]; // Returns the document directly.
}
