"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB() {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sree_murugan_sons';
    try {
        // Attempt connection with 3-second timeout
        await mongoose_1.default.connect(mongoURI, {
            serverSelectionTimeoutMS: 3000,
        });
        console.log('🍃 MongoDB Connected successfully to database');
    }
    catch (error) {
        console.warn('⚠️  MongoDB connection failed (running in fallback memory-backed mode):', error.message);
        console.log('💡 Note: To connect to MongoDB, ensure MongoDB is running or set MONGODB_URI in backend/.env');
    }
}
