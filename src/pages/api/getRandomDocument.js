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

  const db = client.db(dbName);
  cachedDb = db;
  return db;
}

export default async function handler(req, res) {
  console.log("Hit the endpoint")
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const category = req.query.category;

  try {
    const db = await connectToDatabase(URI);
    const passageCollection = db.collection('passagesNew');
    const randomDocs = await passageCollection.aggregate([
      { "$match": { "category": category } },
      { "$sample": { "size": 1 } }
    ]).toArray();

    if (!randomDocs.length) {
      return res.status(404).json({ error: 'No document found' });
    }

    console.log(randomDocs[0])
    return res.status(200).json(randomDocs[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
