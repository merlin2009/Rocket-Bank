import 'dotenv/config';
import { prisma } from './lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'demo@rocket.bank';
  const password = 'demo1234';
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash: hash }
  });
  await prisma.account.create({ data: { userId: user.id, currency: 'EUR', balanceMinor: 100000 } });
  console.log('Seeded user', email);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });

