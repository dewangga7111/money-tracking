import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

export async function seedUser(prisma: PrismaClient) {
  console.log('Seeding tb_user...');

  const adminRole = await prisma.tbRole.findFirst({ where: { name: 'Admin' } });

  if (!adminRole) {
    console.log('  Admin role not found, skipping user seed.');
    return;
  }

  const users = [
    { name: 'Admin', email: 'admin@mail.com', password: 'admin1234', roleId: adminRole.roleId },
  ];

  for (const user of users) {
    const existing = await prisma.tbUser.findUnique({ where: { email: user.email } });

    if (existing) {
      await prisma.tbUser.update({
        where: { userId: existing.userId },
        data: { name: user.name, roleId: user.roleId, updatedBy: 'SYSTEM' },
      });
      console.log(`  Updated user: ${user.email}`);
    } else {
      const hashedPassword = await hash(user.password, 12);
      await prisma.tbUser.create({
        data: { name: user.name, email: user.email, password: hashedPassword, roleId: user.roleId, createdBy: 'SYSTEM', updatedBy: 'SYSTEM' },
      });
      console.log(`  Created user: ${user.email}`);
    }
  }

  console.log('tb_user seeding completed!');
}
