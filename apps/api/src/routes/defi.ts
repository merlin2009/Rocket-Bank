import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { env } from '../lib/env';
import { JsonRpcProvider, Contract } from 'ethers';

const r = Router();

// Minimal ABI example to read reserve data from Aave Pool Data Provider (placeholder)
const POOL_DATA_PROVIDER_ABI = [
  "function getAllReservesTokens() view returns (tuple(string symbol, address tokenAddress)[])"
];

r.get('/markets', requireAuth, async (_req, res) => {
  try {
    const provider = new JsonRpcProvider(env.aave.rpcUrl);
    const dataProvider = new Contract(env.aave.poolAddressProvider, POOL_DATA_PROVIDER_ABI, provider);
    let markets: any[] = [];
    try {
      const tokens = await dataProvider.getAllReservesTokens();
      markets = (tokens || []).slice(0, 5).map((t: any) => ({ symbol: t.symbol, token: t.tokenAddress }));
    } catch {
      markets = [
        { symbol: 'USDC', token: '0x0000000000000000000000000000000000000000' },
        { symbol: 'DAI', token: '0x0000000000000000000000000000000000000000' }
      ];
    }
    res.json({ network: env.aave.network, markets });
  } catch (e: any) {
    res.status(500).json({ error: 'Aave read error', detail: e?.message });
  }
});

export default r;

