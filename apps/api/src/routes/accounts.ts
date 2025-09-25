import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const r = Router();

r.get('/', requireAuth, async (req, res) => {
  const userId = (req as any).auth.userId as string;
  const accounts = await prisma.account.findMany({ where: { userId } });
  res.json({ accounts });
});

r.post('/', requireAuth, async (req, res) => {
  const userId = (req as any).auth.userId as string;
  const { currency } = req.body || {};
  const account = await prisma.account.create({ data: { userId, currency: currency || 'EUR', balanceMinor: 0 } });
  res.json({ account });
});

export default r;

