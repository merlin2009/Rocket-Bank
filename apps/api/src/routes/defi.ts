import { Router } from 'express';
import { requireAuth } from '../middleware/auth';

const r = Router();

r.get('/markets', requireAuth, async (_req, res) => {
  res.json({
    network: 'polygon',
    markets: [
      { symbol: 'USDC', supplyAPY: 0.05, borrowAPY: 0.08 },
      { symbol: 'DAI', supplyAPY: 0.045, borrowAPY: 0.075 }
    ]
  });
});

export default r;

