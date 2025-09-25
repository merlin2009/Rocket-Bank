import { Router } from 'express';
import { requireAuth } from '../middleware/auth';

// Stubs for Bisq, HodlHodl, iCard (listings/status). Replace with real APIs/SDKs.
const r = Router();

r.get('/bisq/listings', requireAuth, async (_req, res) => {
  res.json({ listings: [{ id: 'bisq-1', asset: 'BTC', currency: 'EUR', price: 60000 }] });
});

r.get('/hodlhodl/offers', requireAuth, async (_req, res) => {
  res.json({ offers: [{ id: 'hodl-1', asset: 'BTC', currency: 'EUR', price: 60200 }] });
});

r.get('/icard/cards', requireAuth, async (_req, res) => {
  res.json({ cards: [{ id: 'icard-1', brand: 'Visa', last4: '4242' }] });
});

export default r;

