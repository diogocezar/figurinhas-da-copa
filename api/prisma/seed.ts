import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import countries from './data/contries';

async function main() {
  await createAllCountries();
  await createAllStickers();
}

async function createAllCountries() {
  const createdCountries = await prisma.country.createMany({
    data: countries,
  });
  return createdCountries;
}

async function createAllStickers() {
  const allCountries = await prisma.country.findMany();
  allCountries.forEach(async (country) => {
    const { id, initials } = country;
    let qtdToCreate = 20;
    if (initials === 'FWC') qtdToCreate = 29;
    for (let number = 1; number <= qtdToCreate; number++) {
      await prisma.sticker.create({
        data: {
          name: `${initials} ${number}`,
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
