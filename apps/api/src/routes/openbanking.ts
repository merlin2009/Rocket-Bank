import { Router } from 'express';
import axios from 'axios';
import { env } from '../lib/env';
import { requireAuth } from '../middleware/auth';

const r = Router();

r.get('/banks', requireAuth, async (_req, res) => {
  try {
    const resp = await axios.get(`${env.obp.baseUrl}/obp/v4.0.0/banks`, {
      headers: { 'Authorization': `DirectLogin token=${env.obp.consumerKey}` }
    });
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ error: 'OBP error', detail: e?.message });
  }
});

export default r;

