import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const r = Router();

r.post('/transfer', requireAuth, async (req, res) => {
  const userId = (req as any).auth.userId as string;
  const { fromAccountId, toAccountId, amountMinor, currency } = req.body || {};
  if (!fromAccountId || !toAccountId || !amountMinor) return res.status(400).json({ error: 'Missing fields' });

  const from = await prisma.account.findUnique({ where: { id: fromAccountId } });
  const to = await prisma.account.findUnique({ where: { id: toAccountId } });
  if (!from || !to || from.userId !== userId) return res.status(400).json({ error: 'Invalid accounts' });
  if (from.balanceMinor < amountMinor) return res.status(400).json({ error: 'Insufficient funds' });

  const txn = await prisma.$transaction(async (tx) => {
    await tx.account.update({ where: { id: from.id }, data: { balanceMinor: { decrement: amountMinor } } });
    await tx.account.update({ where: { id: to.id }, data: { balanceMinor: { increment: amountMinor } } });
    return tx.transaction.create({
      data: {
        fromAccountId,
        toAccountId,
        amountMinor,
        currency: currency || from.currency,
        status: 'SETTLED'
      }
    });
  });

  res.json({ transaction: txn });
});

export default r;

