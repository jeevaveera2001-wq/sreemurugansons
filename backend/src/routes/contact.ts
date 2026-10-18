import { Router, Request, Response } from 'express';
import { ContactModel } from '../models/Contact.js';

const router = Router();

// Store information
router.get('/info', (_req: Request, res: Response) => {
  res.json({
    storeName: 'SREE MURUGAN SONS',
    proprietor: 'M. Vivekananthan',
    gstin: '33AFDFS8443P1ZE',
    address: {
      street: 'Main Road, Ettiyampatti P.O.',
      taluk: 'Harur (TK)',
      district: 'Dharmapuri (DT)',
      pincode: '636903',
      state: 'Tamil Nadu, India',
    },
    contact: {
      phone: '+91 94883 31932',
      altPhone: '+91 94426 24882',
      whatsapp: '+91 94883 31932',
      email: 'murugansons@gmail.com',
    },
    timings: {
      mondayToSaturday: '07:30 AM - 09:00 PM',
      sunday: '08:00 AM - 02:00 PM',
    },
  });
});

// Handle incoming contact message
router.post('/message', async (req: Request, res: Response) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone) {
    res.status(400).json({ error: 'Name and phone number are required.' });
    return;
  }

  try {
    const contactDoc = new ContactModel({ name, phone, email, message });
    await contactDoc.save();
    console.log(`✅ Saved contact message from ${name} to MongoDB`);
  } catch (err) {
    console.log(`ℹ️ Received contact message from ${name}`);
  }

  res.status(200).json({
    success: true,
    message: 'Thank you for reaching out! We have received your inquiry.',
  });
});

export default router;
