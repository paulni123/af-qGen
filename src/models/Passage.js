import mongoose from 'mongoose'

// Define the schema for the Passage
const PassageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { collection: 'passages' });

const Passage = mongoose.model('Passage', PassageSchema);

export default Passage;
