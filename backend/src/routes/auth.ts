import { Router, Request, Response } from 'express';

const router = Router();

const ADMIN_EMAIL = 'murugansons@gmail.com';
const ADMIN_PASSWORD = '1234567890';

// POST /api/admin/login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.toString().trim();

  if (cleanEmail === ADMIN_EMAIL && cleanPass === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: 'Admin authenticated successfully',
      user: {
        name: 'M. Vivekananthan (Proprietor)',
        email: ADMIN_EMAIL,
        role: 'admin',
        store: 'Sree Murugan Sons, Ettiyampatti',
      },
      token: 'sms-admin-token-' + Date.now(),
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. Please use the official admin email and password.',
  });
});

export default router;
