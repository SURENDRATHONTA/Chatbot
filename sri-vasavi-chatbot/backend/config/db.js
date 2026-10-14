import mongoose from 'mongoose';

export let isMongoConnected = mongoose.connection.readyState === 1;

mongoose.connection.on('connected', () => {
  isMongoConnected = true;
  console.log('[Database] Connected to MongoDB.');
});

mongoose.connection.on('disconnected', () => {
  isMongoConnected = false;
  console.warn('[Database] MongoDB connection closed.');
});

export const connectDatabase = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('[Database] MONGO_URI is not set; using the local in-memory data store.');
    return false;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    return true;
  } catch (error) {
    isMongoConnected = false;
    console.error(`[Database] MongoDB connection failed: ${error.message}`);
    console.warn('[Database] The API will continue using the local in-memory data store.');
    return false;
  }
};
