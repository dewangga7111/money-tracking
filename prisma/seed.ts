import { PrismaClient } from '@prisma/client';
import { seedSystem } from './seeders/system.seed';
import { seedBahan } from './seeders/bahan.seed';
import { seedResep } from './seeders/resep.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...\n');

  await seedSystem(prisma);
  await seedBahan(prisma);
  await seedResep(prisma);

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
