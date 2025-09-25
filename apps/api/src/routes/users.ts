import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const r = Router();

r.get('/me', requireAuth, async (req, res) => {
  const userId = (req as any).auth.userId as string;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, createdAt: true, kyc: true }
  });
  res.json({ user });
});

// KYC stub endpoints: create profile and approve/reject
import { z } from 'zod';
const KycCreate = z.object({ fullName: z.string().optional(), country: z.string().optional(), dob: z.string().optional() });

r.post('/kyc', requireAuth, async (req, res) => {
  const userId = (req as any).auth.userId as string;
  const body = KycCreate.safeParse(req.body || {});
  if (!body.success) return res.status(400).json({ error: 'Invalid body' });
  const { fullName, country, dob } = body.data;
  const profile = await prisma.kycProfile.upsert({
    where: { userId },
    update: { fullName, country, dob: dob ? new Date(dob) : undefined },
    create: { userId, fullName, country, dob: dob ? new Date(dob) : undefined, provider: 'STUB', status: 'PENDING' }
  });
  res.json({ kyc: profile });
});

r.post('/kyc/approve', requireAuth, async (req, res) => {
  const userId = (req as any).auth.userId as string;
  const profile = await prisma.kycProfile.update({ where: { userId }, data: { status: 'APPROVED' } });
  res.json({ kyc: profile });
});

r.post('/kyc/reject', requireAuth, async (req, res) => {
  const userId = (req as any).auth.userId as string;
  const profile = await prisma.kycProfile.update({ where: { userId }, data: { status: 'REJECTED' } });
  res.json({ kyc: profile });
});

export default r;

