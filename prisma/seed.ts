import { PrismaClient } from '@prisma/client';
import { seedRole } from './seeders/role.seed';
import { seedUser } from './seeders/user.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...\n');

  await seedRole(prisma);
  await seedUser(prisma);

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
