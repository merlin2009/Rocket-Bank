import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../lib/env';

export interface AuthPayload { userId: string }

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, env.jwtSecret) as AuthPayload;
    (req as any).auth = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

export async function requireKycApproved(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).auth?.userId as string | undefined;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    // Lazy import to avoid circular
    const { prisma } = await import('../lib/prisma');
    const kyc = await prisma.kycProfile.findUnique({ where: { userId } });
    if (!kyc || kyc.status !== 'APPROVED') {
      return res.status(403).json({ error: 'KYC not approved' });
    }
    next();
  } catch (e) {
    res.status(500).json({ error: 'KYC check failed' });
  }
}

