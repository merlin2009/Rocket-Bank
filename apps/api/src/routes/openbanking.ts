import { Router } from 'express';
import axios from 'axios';
import { env } from '../lib/env';
import { requireAuth } from '../middleware/auth';

const r = Router();

// Simple in-memory token store per user (replace with DB when available)
const obpTokenByUser = new Map<string, { token: string; obtainedAt: number }>();

// OAuth 1.0a (request token -> authorize -> access token) — simplified stub flow
// For real flow, redirect users to OBP authorize URL and handle callback.
r.get('/oauth/request', requireAuth, async (_req, res) => {
  // Return placeholder request token/secret
  res.json({ oauth_token: 'req_token_stub', oauth_token_secret: 'req_secret_stub', authorize_url: `${env.obp.baseUrl}/oauth/authorize?oauth_token=req_token_stub` });
});

r.get('/oauth/callback', requireAuth, async (_req, res) => {
  // Exchange request token for access token — here we just store a stub
  const userId = (req as any).auth.userId as string;
  const stubAccess = 'access_token_stub';
  obpTokenByUser.set(userId, { token: stubAccess, obtainedAt: Date.now() });
  res.json({ ok: true });
});

r.post('/directlogin', requireAuth, async (req, res) => {
  const userId = (req as any).auth.userId as string;
  try {
    const authHeader = `DirectLogin username=${env.obp.username},password=${env.obp.password},consumer_key=${env.obp.consumerKey}`;
    const resp = await axios.post(`${env.obp.baseUrl}/my/logins/direct`, null, {
      headers: { Authorization: authHeader }
    });
    const token = resp.data?.token || resp.headers['authorization']?.toString().replace('DirectLogin token=', '');
    if (!token) return res.status(500).json({ error: 'Failed to obtain OBP token' });
    obpTokenByUser.set(userId, { token, obtainedAt: Date.now() });
    res.json({ token });
  } catch (e: any) {
    res.status(500).json({ error: 'OBP DirectLogin failed', detail: e?.message });
  }
});

r.get('/banks', requireAuth, async (req, res) => {
  const userId = (req as any).auth.userId as string;
  const entry = obpTokenByUser.get(userId);
  if (!entry) return res.status(401).json({ error: 'OBP token missing. Call /openbanking/directlogin first.' });
  try {
    const resp = await axios.get(`${env.obp.baseUrl}/obp/v4.0.0/banks`, {
      headers: { Authorization: `DirectLogin token=${entry.token}` }
    });
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ error: 'OBP error', detail: e?.message });
  }
});

export default r;

