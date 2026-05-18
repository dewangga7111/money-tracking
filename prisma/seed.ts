import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { seedRole } from './seeders/role.seed';
import { seedUser } from './seeders/user.seed';
import { seedHomeSection } from './seeders/home-section.seed';

function buildDatabaseUrl(): string {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST = 'localhost',
    POSTGRES_PORT = '5432',
    POSTGRES_DB,
  } = process.env;
  return `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
}

const prisma = new PrismaClient({ datasourceUrl: buildDatabaseUrl() });

async function main() {
  console.log('Start seeding...\n');

  await seedRole(prisma);
  await seedUser(prisma);
  await seedHomeSection(prisma);

  console.log('\nAll seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
