import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables.");
}

// Type assertion after validation
const mongoUri: string = MONGODB_URI;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const globalCache = global.mongooseCache ?? { conn: null, promise: null };

export async function connectToDatabase() {
  if (globalCache.conn) return globalCache.conn;
  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB ?? "orbitflow",
    });
  }
  globalCache.conn = await globalCache.promise;
  if (process.env.NODE_ENV !== "production") {
    console.log("MongoDB connected");
  }
  global.mongooseCache = globalCache;
  return globalCache.conn;
}

