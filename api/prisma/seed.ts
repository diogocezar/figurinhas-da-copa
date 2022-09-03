import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import countries from './data/contries';

async function main() {
  await prisma.country.createMany({
    data: countries,
  });

  const allCountries = await prisma.country.findMany();
  allCountries.forEach(async (country) => {
    const { id, initials } = country;
    if (initials === 'FWC') return;
    for (let number = 1; number <= 20; number++) {
      await prisma.sticker.create({
        data: {
          number,
          countryId: id,
        },
      });
    }
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
