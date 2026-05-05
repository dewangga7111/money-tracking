import { PrismaClient } from '@prisma/client';

export async function seedRole(prisma: PrismaClient) {
  console.log('Seeding tb_role...');

  const roles = [
    { name: 'Admin', description: 'Full access to all features' },
  ];

  for (const role of roles) {
    const existing = await prisma.tbRole.findFirst({ where: { name: role.name } });

    if (existing) {
      await prisma.tbRole.update({
        where: { roleId: existing.roleId },
        data: { description: role.description, updatedBy: 'SYSTEM' },
      });
      console.log(`  Updated role: ${role.name}`);
    } else {
      await prisma.tbRole.create({
        data: { name: role.name, description: role.description, createdBy: 'SYSTEM', updatedBy: 'SYSTEM' },
      });
      console.log(`  Created role: ${role.name}`);
    }
  }

  console.log('tb_role seeding completed!');
}
