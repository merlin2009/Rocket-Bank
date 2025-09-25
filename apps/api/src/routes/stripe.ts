import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import Stripe from 'stripe';
import { env } from '../lib/env';
import express from 'express';

const r = Router();
const stripe = new Stripe(env.stripe.apiKey || 'sk_test_XXX', { apiVersion: '2024-06-20' } as any);

r.post('/payment-intents', requireAuth, async (req, res) => {
  const { amountMinor, currency } = req.body || {};
  if (!amountMinor || !currency) return res.status(400).json({ error: 'amountMinor and currency required' });
  try {
    const pi = await stripe.paymentIntents.create({ amount: amountMinor, currency, automatic_payment_methods: { enabled: true } });
    res.json({ id: pi.id, client_secret: pi.client_secret, status: pi.status });
  } catch (e: any) {
    res.status(500).json({ error: 'Stripe error', detail: e?.message });
  }
});

// Webhook must use raw body. Mount under /stripe/webhook in index.ts BEFORE express.json
export const stripeWebhook = express.Router();
stripeWebhook.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, env.stripe.webhookSecret || 'whsec_XXX');
    // Handle event.type as needed
    res.json({ received: true, type: event.type });
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

export default r;

