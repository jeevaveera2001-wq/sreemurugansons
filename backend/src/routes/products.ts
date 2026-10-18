import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Product } from '../models/Product.js';

const router = Router();

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'products.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load products from persistent disk storage (Empty by default - NO fake products)
function loadProductsFromDisk(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      // Filter out any legacy fake products that start with 'prod-steel-01', 'prod-cement', etc.
      const cleaned = parsed.filter((p: any) => !p._id?.startsWith('prod-steel-') && !p._id?.startsWith('prod-cement-') && !p._id?.startsWith('prod-paint-') && !p._id?.startsWith('prod-roofing-') && !p._id?.startsWith('prod-electrical-') && !p._id?.startsWith('prod-sanitary-') && !p._id?.startsWith('prod-hardware-') && !p._id?.startsWith('prod-agro-'));
      return cleaned;
    }
  } catch (err) {
    console.error('Error loading products from disk', err);
  }
  return [];
}

function saveProductsToDisk(products: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving products to disk', err);
  }
}

// Working copy containing strictly admin-uploaded products
let memoryProducts: any[] = loadProductsFromDisk();

// Clear legacy fake products from MongoDB if connected
(async () => {
  try {
    await Product.deleteMany({
      _id: { 
        $in: [
          'prod-steel-01', 'prod-cement-01', 'prod-cement-02', 
          'prod-paint-01', 'prod-paint-02', 'prod-steel-02', 
          'prod-roofing-01', 'prod-electrical-01', 'prod-sanitary-01', 
          'prod-hardware-01', 'prod-agro-01'
        ] 
      }
    });
  } catch (err) {
    // Ignore if DB is not connected
  }
})();

// GET /api/products - Get strictly admin-uploaded products
router.get('/', async (req: Request, res: Response) => {
  const categoryFilter = req.query.category as string;

  try {
    const dbProducts = await Product.find({
      _id: { 
        $nin: [
          'prod-steel-01', 'prod-cement-01', 'prod-cement-02', 
          'prod-paint-01', 'prod-paint-02', 'prod-steel-02', 
          'prod-roofing-01', 'prod-electrical-01', 'prod-sanitary-01', 
          'prod-hardware-01', 'prod-agro-01'
        ] 
      }
    }).sort({ createdAt: -1 });

    if (dbProducts && dbProducts.length > 0) {
      const items = categoryFilter && categoryFilter !== 'All'
        ? dbProducts.filter((p) => p.category.toLowerCase() === categoryFilter.toLowerCase())
        : dbProducts;
      return res.json({ success: true, count: items.length, products: items });
    }
  } catch (err) {
    // Fall back to disk/memory
  }

  const items = categoryFilter && categoryFilter !== 'All'
    ? memoryProducts.filter((p) => p.category.toLowerCase() === categoryFilter.toLowerCase())
    : memoryProducts;

  return res.json({ success: true, count: items.length, products: items });
});

// POST /api/products - Admin add new product
router.post('/', async (req: Request, res: Response) => {
  const { name, category, brand, price, originalPrice, unit, offerTag, description, image, badge, inStock } = req.body;

  if (!name || !category || price === undefined) {
    return res.status(400).json({ success: false, message: 'Name, category, and price are required' });
  }

  const newProductData = {
    _id: 'sms-prod-' + Date.now(),
    name: name.trim(),
    category,
    brand: brand ? brand.trim() : 'Sree Murugan Sons',
    price: Number(price),
    originalPrice: originalPrice ? Number(originalPrice) : undefined,
    unit: unit ? unit.trim() : 'unit',
    offerTag: offerTag ? offerTag.trim() : '',
    description: description ? description.trim() : 'Authentic quality guaranteed by Sree Murugan Sons.',
    image: image || '/assets/store-hero-W47zwWIs.jpg',
    badge: badge ? badge.trim() : '',
    inStock: inStock !== undefined ? Boolean(inStock) : true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const created = await Product.create(newProductData);
    memoryProducts.unshift(created.toObject());
    saveProductsToDisk(memoryProducts);
    return res.status(201).json({ success: true, message: 'Product published by admin successfully', product: created });
  } catch (err) {
    memoryProducts.unshift(newProductData);
    saveProductsToDisk(memoryProducts);
    return res.status(201).json({ success: true, message: 'Product published by admin successfully (disk)', product: newProductData });
  }
});

// PUT /api/products/:id - Admin update product price, offers, stock
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = { ...req.body, updatedAt: new Date() };

  try {
    const updated = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (updated) {
      const idx = memoryProducts.findIndex((p) => p._id.toString() === id);
      if (idx !== -1) memoryProducts[idx] = updated.toObject();
      saveProductsToDisk(memoryProducts);
      return res.json({ success: true, message: 'Product updated by admin successfully', product: updated });
    }
  } catch (err) {
    // continue
  }

  const idx = memoryProducts.findIndex((p) => p._id === id);
  if (idx !== -1) {
    memoryProducts[idx] = { ...memoryProducts[idx], ...updates };
    saveProductsToDisk(memoryProducts);
    return res.json({ success: true, message: 'Product updated by admin successfully', product: memoryProducts[idx] });
  }

  return res.status(404).json({ success: false, message: 'Product not found' });
});

// DELETE /api/products/:id - Admin delete product
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
  } catch (err) {
    // continue
  }

  memoryProducts = memoryProducts.filter((p) => p._id !== id && p._id.toString?.() !== id);
  saveProductsToDisk(memoryProducts);
  return res.json({ success: true, message: 'Product removed by admin successfully' });
});

export default router;
