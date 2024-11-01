import { connect, Mongoose } from "mongoose";

let connection: Mongoose | null = null;

async function connectMongo() {
    if (connection) return connection;
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        throw new Error("MongoDB URL not found");
    }
    // Test
    connection = await connect(mongoUrl, {
        serverSelectionTimeoutMS: 10000, // 10 seconds timeout
        socketTimeoutMS: 45000, // 45 seconds socket timeout
    });
}

export { connectMongo };