import { connect, Mongoose } from "mongoose";

let connection: Mongoose | null = null;

async function connectMongo() {
    if (connection) return connection;
    connection = await connect('mongodb+srv://hallyson:6j74U0e1JsnFP27h@cluster0.fpptiy1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        serverSelectionTimeoutMS: 10000, // 10 seconds timeout
        socketTimeoutMS: 45000, // 45 seconds socket timeout
    });
}

export { connectMongo }; 