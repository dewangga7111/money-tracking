import { PrismaClient } from '@prisma/client';

export async function seedMoneyTracking(prisma: PrismaClient) {
  console.log('Seeding money tracking data...');

  const adminUser = await prisma.tbUser.findFirst({ where: { email: 'admin@mail.com' } });

  if (!adminUser) {
    console.log('  Admin user not found, skipping money tracking seed.');
    return;
  }

  const userId = adminUser.userId;

  // Check if wallet exists
  const existingWallet = await prisma.tbWallet.findFirst({ where: { userId, name: 'Dompet Utama' } });
  if (!existingWallet) {
    await prisma.tbWallet.create({
      data: {
        name: 'Dompet Utama',
        type: 'CASH',
        userId,
        createdBy: 'SYSTEM',
        updatedBy: 'SYSTEM',
      },
    });
    console.log('  Created default wallet.');
  }

  const categories = [
    { name: 'Gaji', type: 'INCOME', icon: '💰' },
    { name: 'Bonus', type: 'INCOME', icon: '🎁' },
    { name: 'Makanan & Minuman', type: 'EXPENSE', icon: '🍔' },
    { name: 'Transportasi', type: 'EXPENSE', icon: '🚗' },
    { name: 'Tagihan', type: 'EXPENSE', icon: '🧾' },
    { name: 'Belanja', type: 'EXPENSE', icon: '🛒' },
  ];

  for (const cat of categories) {
    const existingCat = await prisma.tbCategory.findFirst({
      where: { userId, name: cat.name, type: cat.type as any },
    });

    if (!existingCat) {
      await prisma.tbCategory.create({
        data: {
          name: cat.name,
          type: cat.type as any,
          icon: cat.icon,
          userId,
          createdBy: 'SYSTEM',
          updatedBy: 'SYSTEM',
        },
      });
      console.log(`  Created default category: ${cat.name}`);
    }
  }

  console.log('tb_wallet and tb_category seeding completed!');
}
