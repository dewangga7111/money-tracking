import { PrismaClient } from '../../src/generated/prisma';

export async function seedSystem(prisma: PrismaClient) {
  console.log('Seeding tb_system...');

  const data = [
    // Measurement units for food recipes
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'G',
      sys_value: 'Gram',
      description: 'Unit for weight measurement',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'KG',
      sys_value: 'Kilogram',
      description: 'Unit for weight measurement',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'ML',
      sys_value: 'Milliliter',
      description: 'Unit for liquid volume measurement',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'L',
      sys_value: 'Liter',
      description: 'Unit for liquid volume measurement',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'TSP',
      sys_value: 'Teaspoon',
      description: 'Unit for small quantity measurement',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'TBSP',
      sys_value: 'Tablespoon',
      description: 'Unit for small quantity measurement',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'CUP',
      sys_value: 'Cup',
      description: 'Unit for volume measurement',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'PCS',
      sys_value: 'Pieces',
      description: 'Unit for counting items',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'SDM',
      sys_value: 'Sendok Makan',
      description: 'Indonesian: Tablespoon',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'SDT',
      sys_value: 'Sendok Teh',
      description: 'Indonesian: Teaspoon',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'SIUNG',
      sys_value: 'Siung',
      description: 'Indonesian: Clove (for garlic, shallot)',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'BUAH',
      sys_value: 'Buah',
      description: 'Indonesian: Piece/Fruit',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'BATANG',
      sys_value: 'Batang',
      description: 'Indonesian: Stalk/Stick',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'LEMBAR',
      sys_value: 'Lembar',
      description: 'Indonesian: Sheet/Leaf',
    },
    {
      sys_cat: 'RECIPE',
      sys_sub_cat: 'SATUAN',
      sys_code: 'IRIS',
      sys_value: 'Iris',
      description: 'Indonesian: Slice',
    },
  ];

  for (const row of data) {
    // Check if record exists
    const existing = await prisma.tbSystem.findUnique({
      where: {
        sysCat_sysSubCat_sysCode: {
          sysCat: row.sys_cat,
          sysSubCat: row.sys_sub_cat,
          sysCode: row.sys_code,
        },
      },
    });

    if (existing) {
      // Update existing record
      await prisma.tbSystem.update({
        where: {
          sysCat_sysSubCat_sysCode: {
            sysCat: row.sys_cat,
            sysSubCat: row.sys_sub_cat,
            sysCode: row.sys_code,
          },
        },
        data: {
          sysValue: row.sys_value,
          description: row.description || null,
          updatedBy: 'SYSTEM',
          updatedAt: new Date(),
        },
      });
      console.log(
        `  Updated: ${row.sys_cat}.${row.sys_sub_cat}.${row.sys_code}`
      );
    } else {
      // Insert new record
      await prisma.tbSystem.create({
        data: {
          sysCat: row.sys_cat,
          sysSubCat: row.sys_sub_cat,
          sysCode: row.sys_code,
          sysValue: row.sys_value,
          description: row.description || null,
          createdBy: 'SYSTEM',
          updatedBy: 'SYSTEM',
        },
      });
      console.log(
        `  Created: ${row.sys_cat}.${row.sys_sub_cat}.${row.sys_code}`
      );
    }
  }

  console.log('tb_system seeding completed!');
}

// Allow running this seeder directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const prisma = new PrismaClient();
  seedSystem(prisma)
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
