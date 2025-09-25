import { Router } from 'express';
import axios from 'axios';
import { env } from '../lib/env';
import { requireAuth } from '../middleware/auth';

const r = Router();

r.post('/chat', requireAuth, async (req, res) => {
  const { messages } = req.body || {};
  try {
    if (env.ai.provider === 'openrouter') {
      const resp = await axios.post('https://openrouter.ai/api/v1/chat/completions',
        { model: env.ai.model, messages },
        { headers: { Authorization: `Bearer ${env.ai.openrouterKey}` } });
      return res.json(resp.data);
    } else {
      const resp = await axios.post('https://api.openai.com/v1/chat/completions',
        { model: 'gpt-4o-mini', messages },
        { headers: { Authorization: `Bearer ${env.ai.openaiKey}` } });
      return res.json(resp.data);
    }
  } catch (e: any) {
    res.status(500).json({ error: 'AI error', detail: e?.message });
  }
});

r.post('/risk-score', requireAuth, async (req, res) => {
  const { accountSnapshot } = req.body || {};
  res.json({ riskScore: 0.25, accountSnapshot });
});

export default r;

