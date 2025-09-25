import 'dotenv/config';

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export const env = {
  port: Number(process.env.PORT || 4000),
  dbUrl: requireEnv('DATABASE_URL'),
  jwtSecret: requireEnv('JWT_SECRET'),
  ai: {
    provider: process.env.AI_PROVIDER || 'openrouter',
    model: process.env.AI_MODEL || 'openrouter/anthropic/claude-3.5-sonnet',
    openrouterKey: process.env.OPENROUTER_API_KEY || '',
    openaiKey: process.env.OPENAI_API_KEY || ''
  },
  aave: {
    rpcUrl: process.env.AAVE_RPC_URL || '',
    network: process.env.AAVE_NETWORK || 'polygon',
    poolAddressProvider: process.env.AAVE_POOL_ADDRESS_PROVIDER || ''
  },
  obp: {
    baseUrl: process.env.OBP_BASE_URL || '',
    consumerKey: process.env.OBP_CONSUMER_KEY || '',
    username: process.env.OBP_USERNAME || '',
    password: process.env.OBP_PASSWORD || ''
  },
  stripe: {
    apiKey: process.env.STRIPE_API_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
  }
};

