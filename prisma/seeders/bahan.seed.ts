import { PrismaClient } from '@prisma/client';

export async function seedBahan(prisma: PrismaClient) {
  console.log('Seeding tb_bahan...');

  const data = [
    {
      name: 'Tepung Terigu',
      jumlah: 500,
      satuan: 'G',
    },
    {
      name: 'Santan',
      jumlah: 250,
      satuan: 'ML',
    },
    {
      name: 'Bawang Putih',
      jumlah: 3,
      satuan: 'SIUNG',
    },
    {
      name: 'Gula Pasir',
      jumlah: 2,
      satuan: 'SDM',
    },
    {
      name: 'Garam',
      jumlah: 1,
      satuan: 'SDT',
    },
    {
      name: 'Daging Sapi',
      jumlah: 500,
      satuan: 'G',
    },
    {
      name: 'Cabai Merah',
      jumlah: 5,
      satuan: 'BUAH',
    },
    {
      name: 'Serai',
      jumlah: 2,
      satuan: 'BATANG',
    },
    {
      name: 'Daun Salam',
      jumlah: 3,
      satuan: 'LEMBAR',
    },
    {
      name: 'Bawang Merah',
      jumlah: 5,
      satuan: 'SIUNG',
    },
  ];

  for (const row of data) {
    // Check if record exists
    const existing = await prisma.tbBahan.findFirst({
      where: {
        name: row.name,
        satuan: row.satuan,
        status: true,
      },
    });

    if (existing) {
      // Update existing record
      await prisma.tbBahan.update({
        where: {
          bahanId: existing.bahanId,
        },
        data: {
          jumlah: row.jumlah,
          updatedBy: 'SYSTEM',
          updatedAt: new Date(),
        },
      });
      console.log(`  Updated: ${row.name} - ${row.jumlah} ${row.satuan}`);
    } else {
      // Insert new record
      await prisma.tbBahan.create({
        data: {
          ...row,
          createdBy: 'SYSTEM',
          updatedBy: 'SYSTEM',
        },
      });
      console.log(`  Created: ${row.name} - ${row.jumlah} ${row.satuan}`);
    }
  }

  console.log('tb_bahan seeding completed!');
}

// Allow running this seeder directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const prisma = new PrismaClient();
  seedBahan(prisma)
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
