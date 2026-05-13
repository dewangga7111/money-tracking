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
    const existing = await prisma.tbHomeSection.findUnique({ where: { section: section.section } });
    if (existing) {
      console.log(`  Skipped section (already exists): ${section.section}`);
      continue;
    }
    await prisma.tbHomeSection.create({
      data: { ...section, updatedBy: 'SYSTEM' },
    });
    console.log(`  Created section: ${section.section}`);
  }

  console.log('tb_home_section seeding completed!');
}
