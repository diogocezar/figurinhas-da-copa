import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import countries from './data/contries';

async function main() {
  await prisma.country.createMany({
    data: countries,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
