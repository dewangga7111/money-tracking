import { PrismaClient } from '../src/generated/prisma';
import { seedSystem } from './seeders/system.seed';
import { seedBahan } from './seeders/bahan.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...\n');

  // Only seed system table
  await seedSystem(prisma);
  await seedBahan(prisma);

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
