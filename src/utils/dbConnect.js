import mongoose from 'mongoose'

const password = "<Input PassWord>"
const username = "songsen";

const dbName = 'qGen'

const URI = `mongodb+srv://${username}:${password}@afqgen.fj5fz10.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export default async function dbConnect() {
    try {
        console.log("Connecting to DB")
        const conn = await mongoose.connect(URI);
        console.log("Connection Successful!")
        return conn;
    } catch (err) {
        console.log("An error has occurred")
    }
}
