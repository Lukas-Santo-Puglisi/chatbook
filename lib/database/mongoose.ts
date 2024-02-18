import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL 


// Defines the structure of the database object representing the connection to my MOngoDB database

interface MongooseConnection {
    // conn represents the connection to the database and is of type Mongoose
    conn: Mongoose | null;
    // promise represents the promise that will be resolved when the connection to the database is established
    promise: Promise<Mongoose> | null;

}

let cached: MongooseConnection = (global as any).mongoose;


if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URL) {
        throw new Error(
            "Please define the MONGODB_URL environment variable inside .env.local"
        );
    }
    /* if cached.promise is truthy, we return it. If cached.promise is falsy we connect to the database and store the connection in the global variable. */
    cached.promise = cached.promise || 
        mongoose.connect(
            MONGODB_URL, {dbName: 'ChatBook', bufferCommands:false}
    );

    cached.conn = await cached.promise;
    return cached.conn;
}
/* if cached is not initialized we set up a new database instance and store it in the global variable. This is done to cache the connection to the database and reduce overhead. */

/* global allows for storing properties that are globablly accessible we are extending global dynamically here giving it a mongoose property if a connection was previously stored we access it here. In essence, we want to cache the connection in the global variable reducing overhead. */

/* Unlike traditional databases in Next.js we need to connect to the database on every request. This is because Next.js is a serverless framework and the server is spun up and down on every request. This means that we need to connect to the database on every request. In particular a serverless framework is a cloud computing execution model in which the cloud provider runs the server and dynamically manages the allocation of machine resources. Pricing is based on the actual amount of resources consumed by an application, rather than on pre-purchased units of capacity. We do never maintain a continuous server instance or continuous connection to the database. */