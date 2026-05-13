import { PrismaClient } from '@prisma/client';

export async function seedHomeSection(prisma: PrismaClient) {
  console.log('Seeding tb_home_section...');

  const sections = [
    {
      section: 'hero',
      data: {
        headline: '"PETANI ADALAH TUAN\nSEBUAH NEGERI DAN\nSEJATINYA DIALAH RAJA YANG HAKIKI"',
        subtitle: 'PT. Mandraguna Pusaka Indonesia',
        bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80&auto=format&fit=crop',
      },
    },
  ];

  for (const section of sections) {
    await prisma.tbHomeSection.upsert({
      where: { section: section.section },
      create: { ...section, updatedBy: 'SYSTEM' },
      update: { data: section.data, updatedBy: 'SYSTEM' },
    });
    console.log(`  Upserted section: ${section.section}`);
  }

  console.log('tb_home_section seeding completed!');
}
