import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sree_murugan_sons';

  try {
    // Attempt connection with 3-second timeout
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('🍃 MongoDB Connected successfully to database');
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed (running in fallback memory-backed mode):', (error as Error).message);
    console.log('💡 Note: To connect to MongoDB, ensure MongoDB is running or set MONGODB_URI in backend/.env');
  }
}
