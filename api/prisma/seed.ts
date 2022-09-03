import { PrismaClient, Role } from '@prisma/client';
import { CreatePassword } from '../src/helpers/handlePassword';

const prisma = new PrismaClient();

import countries from './data/contries';

async function main() {
  await createAllCountries();
  await createAllStickers();
  await createAdminUser();
  await createUser();
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

async function createAdminUser() {
  const password = await CreatePassword('admin');
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@figurinhas.com',
      password,
      role: Role.ADMIN,
    },
  });
}

async function createUser() {
  const password = await CreatePassword('123');
  await prisma.user.create({
    data: {
      name: 'Diogo Cezar',
      email: 'diogo@diogocezar.com',
      password,
      role: Role.USER,
    },
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
