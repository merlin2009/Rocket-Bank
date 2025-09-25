import express from 'express';
import cors from 'cors';
import { env } from './lib/env';
import auth from './routes/auth';
import users from './routes/users';
import accounts from './routes/accounts';
import payments from './routes/payments';
import ai from './routes/ai';
import defi from './routes/defi';
import obp from './routes/openbanking';
import stripe, { stripeWebhook } from './routes/stripe';
import p2p from './routes/p2p';

const app = express();
app.use(cors());
// Stripe webhook requires raw body
app.use('/stripe', stripeWebhook);
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/auth', auth);
app.use('/users', users);
app.use('/accounts', accounts);
app.use('/payments', payments);
app.use('/ai', ai);
app.use('/defi', defi);
app.use('/openbanking', obp);
app.use('/stripe', stripe);
app.use('/p2p', p2p);

app.listen(env.port, () => {
  console.log(`API listening on :${env.port}`);
});

