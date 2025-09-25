import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const r = Router();

r.get('/me', requireAuth, async (req, res) => {
  const userId = (req as any).auth.userId as string;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, createdAt: true }
  });
  res.json({ user });
});

export default r;

