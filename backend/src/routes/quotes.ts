import { Router, Request, Response } from 'express';
import { QuoteModel } from '../models/Quote.js';

const router = Router();

// In-memory cache fallback if DB is offline
const memoryQuotes: any[] = [];

interface EstimationQuery {
  sqft?: string;
  floors?: string;
  type?: 'residential' | 'commercial';
}

// Calculate building material estimate based on square footage
router.get('/estimate', (req: Request<{}, {}, {}, EstimationQuery>, res: Response) => {
  const sqft = parseFloat(req.query.sqft || '1000');
  const floors = parseInt(req.query.floors || '1', 10);
  const totalArea = sqft * floors;

  // Standard Indian construction estimation formulas
  const cementBags = Math.round(totalArea * 0.4);
  const steelTons = +(totalArea * 0.0035).toFixed(2);
  const paintLitres = Math.round(totalArea * 0.18);
  const sandCft = Math.round(totalArea * 1.8);
  const bricksCount = Math.round(totalArea * 8.5);

  res.json({
    area: totalArea,
    floors,
    estimates: {
      cement: {
        amount: cementBags,
        unit: 'bags (50kg)',
        brands: ['UltraTech Super', 'Ramco Supercrete', 'Dalmia DSP'],
      },
      steel: {
        amount: steelTons,
        unit: 'metric tons (MT)',
        grades: ['Tata Tiscon 550D', 'JSW Neosteel', 'SAIL TMT'],
      },
      paint: {
        amount: paintLitres,
        unit: 'litres',
        brands: ['Asian Paints Apex Ultima', 'Royale Luxury', 'Tractor Emulsion'],
      },
      sand: {
        amount: sandCft,
        unit: 'cft (M-Sand/P-Sand)',
      },
      bricks: {
        amount: bricksCount,
        unit: 'pieces (Fly Ash / Red Clay)',
      },
    },
    storeAdvice: 'Free doorstep site delivery available across Harur, Dharmapuri & Krishnagiri districts.',
  });
});

// Handle quote request submissions (MongoDB + Memory fallback)
router.post('/request', async (req: Request, res: Response) => {
  const { name, phone, email, category, quantity, address, notes } = req.body;

  if (!name || !phone) {
    res.status(400).json({ error: 'Name and phone number are required.' });
    return;
  }

  const quoteId = `SMS-Q-${Date.now().toString().slice(-6)}`;
  const quoteData = {
    quoteId,
    customerName: name,
    phone,
    email,
    materialCategory: category || 'General Building Materials',
    estimatedQuantity: quantity || 'Not specified',
    deliverySiteAddress: address,
    notes,
    status: 'PENDING' as const,
  };

  try {
    const newQuote = new QuoteModel(quoteData);
    await newQuote.save();
    console.log(`✅ Saved quote ${quoteId} to MongoDB`);
  } catch (err) {
    memoryQuotes.push(quoteData);
    console.log(`ℹ️ Saved quote ${quoteId} to in-memory store`);
  }

  res.status(201).json({
    success: true,
    quoteId,
    message: 'Quote request received! Our sales representative will contact you within 2 hours.',
    details: quoteData,
  });
});

export default router;
