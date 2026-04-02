import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB!')
    } catch(e) {
        console.log(e)
    }
}

connectDB()