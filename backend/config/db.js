import mongoose from "mongoose";
import { ENV_VARs } from './envVar.js';

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARs.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
