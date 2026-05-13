import { PrismaClient } from '@prisma/client';
import { seedRole } from './seeders/role.seed';
import { seedUser } from './seeders/user.seed';
import { seedHomeSection } from './seeders/home-section.seed';

const prisma = new PrismaClient();

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
