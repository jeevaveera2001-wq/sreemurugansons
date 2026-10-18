import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import healthRoute from './routes/health.js';
import quotesRoute from './routes/quotes.js';
import productsRoute from './routes/products.js';
import contactRoute from './routes/contact.js';
import authRoute from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

import path from 'path';

// API Routes
app.use('/api/health', healthRoute);
app.use('/api/quotes', quotesRoute);
app.use('/api/products', productsRoute);
app.use('/api/contact', contactRoute);
app.use('/api/admin', authRoute);

// 404 Handler for unknown API endpoints
app.use('/api/*', (_req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Serve production static frontend assets if public directory exists
const publicPath = path.resolve(__dirname, process.env.PUBLIC_DIR || '../public');
app.use(express.static(publicPath));

// Fallback to index.html for client-side routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(publicPath, 'index.html'), (err) => {
    if (err) {
      next();
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 SREE MURUGAN SONS Backend (Node.js/Express/MongoDB) running on http://localhost:${PORT}`);
  console.log(`   - Health:   http://localhost:${PORT}/api/health`);
  console.log(`   - Quotes:   http://localhost:${PORT}/api/quotes/estimate?sqft=1200`);
  console.log(`   - Products: http://localhost:${PORT}/api/products/categories`);
  console.log(`   - Contact:  http://localhost:${PORT}/api/contact/info`);
});
