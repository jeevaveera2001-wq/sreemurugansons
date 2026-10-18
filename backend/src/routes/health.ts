import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'SREE MURUGAN SONS API',
    version: '1.0.0',
    uptime: process.uptime(),
  });
});

export default router;
