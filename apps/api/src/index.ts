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
import stripe from './routes/stripe';

const app = express();
app.use(cors());
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

app.listen(env.port, () => {
  console.log(`API listening on :${env.port}`);
});

