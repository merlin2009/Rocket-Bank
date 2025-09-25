import { Router } from 'express';
import { requireAuth } from '../middleware/auth';

const r = Router();

r.post('/payment-intents', requireAuth, async (_req, res) => {
  res.json({ id: 'pi_dummy', client_secret: 'dummy_secret', status: 'requires_payment_method' });
});

export default r;

