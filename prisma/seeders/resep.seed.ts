import { PrismaClient } from '@prisma/client';

export async function seedResep(prisma: PrismaClient) {
  console.log('Seeding tb_resep...');

  const data = [
    {
      name: 'Nasi Goreng Spesial',
      resep: '1. Panaskan minyak, tumis bawang putih hingga harum\n2. Masukkan telur, orak-arik\n3. Tambahkan nasi putih, aduk rata\n4. Beri kecap manis, garam, dan penyedap\n5. Aduk hingga bumbu meresap\n6. Sajikan dengan acar dan kerupuk',
      bahan: 'Nasi putih 2 piring, Bawang putih 3 siung, Telur 2 butir, Kecap manis 2 sdm, Garam secukupnya, Minyak goreng 3 sdm',
    },
    {
      name: 'Rendang Daging Sapi',
      resep: '1. Rebus daging dengan air dan serai hingga empuk\n2. Haluskan bumbu: bawang merah, bawang putih, cabai merah, jahe, kunyit\n3. Tumis bumbu halus dengan santan kental\n4. Masukkan daging, aduk rata\n5. Masak dengan api kecil hingga bumbu meresap dan kering\n6. Angkat dan sajikan',
      bahan: 'Daging sapi 500g, Santan 500ml, Bawang merah 10 siung, Bawang putih 5 siung, Cabai merah 8 buah, Serai 2 batang, Daun salam 3 lembar',
    },
    {
      name: 'Soto Ayam Kuning',
      resep: '1. Rebus ayam hingga empuk, suwir-suwir\n2. Tumis bumbu halus hingga harum\n3. Masukkan bumbu tumis ke air kaldu ayam\n4. Tambahkan kunyit, serai, daun salam\n5. Masak hingga mendidih\n6. Sajikan dengan soun, telur, dan bawang goreng',
      bahan: 'Ayam 1 ekor, Kunyit 2 cm, Serai 2 batang, Bawang putih 5 siung, Kemiri 3 butir, Soun 100g, Telur rebus 3 butir',
    },
    {
      name: 'Gado-Gado Jakarta',
      resep: '1. Rebus semua sayuran (kol, tauge, kangkung) hingga matang\n2. Haluskan kacang tanah goreng dengan cabai dan gula merah\n3. Tambahkan air asam jawa dan garam\n4. Masak bumbu kacang hingga kental\n5. Tata sayuran di piring\n6. Siram dengan bumbu kacang, tambahkan telur dan kerupuk',
      bahan: 'Kacang tanah 200g, Kol 150g, Tauge 100g, Kangkung 1 ikat, Telur rebus 4 butir, Cabai merah 3 buah, Gula merah 50g',
    },
    {
      name: 'Ayam Geprek Sambal Matah',
      resep: '1. Marinasi ayam dengan bawang putih, garam, dan merica\n2. Goreng ayam hingga crispy\n3. Geprek ayam dengan ulekan\n4. Iris tipis bawang merah, cabai rawit, serai, daun jeruk\n5. Siram dengan minyak panas\n6. Letakkan ayam geprek, taburi sambal matah',
      bahan: 'Ayam fillet 500g, Bawang merah 10 siung, Cabai rawit 15 buah, Serai 2 batang, Daun jeruk 5 lembar, Bawang putih 3 siung',
    },
    {
      name: 'Nasi Uduk Betawi',
      resep: '1. Cuci beras, tiriskan\n2. Masak beras dengan santan, serai, daun salam, dan garam\n3. Aduk hingga air terserap\n4. Kukus nasi hingga matang\n5. Sajikan dengan lauk ayam goreng, telur, dan sambal',
      bahan: 'Beras 500g, Santan 400ml, Serai 2 batang, Daun salam 3 lembar, Garam 1 sdt',
    },
    {
      name: 'Mie Ayam Bakso',
      resep: '1. Rebus mie hingga matang, tiriskan\n2. Rebus ayam dengan bumbu hingga empuk, suwir\n3. Buat kuah dari kaldu ayam, bawang putih, kecap\n4. Rebus bakso hingga mengapung\n5. Tata mie dalam mangkuk, beri ayam suwir dan bakso\n6. Siram dengan kuah panas, tambahkan sayuran',
      bahan: 'Mie telur 300g, Ayam fillet 250g, Bakso 10 butir, Bawang putih 4 siung, Kecap asin 2 sdm, Sawi hijau 100g',
    },
    {
      name: 'Pecel Lele Lamongan',
      resep: '1. Bersihkan lele, lumuri dengan garam dan jeruk nipis\n2. Goreng lele hingga kering dan crispy\n3. Haluskan cabai rawit, tomat, terasi, garam\n4. Tumis sambal sebentar\n5. Sajikan lele dengan sambal dan lalapan\n6. Tambahkan tempe goreng dan tahu',
      bahan: 'Lele 4 ekor, Cabai rawit 20 buah, Tomat 2 buah, Terasi 1 sdt, Jeruk nipis 1 buah, Tempe 200g',
    },
    {
      name: 'Opor Ayam Lebaran',
      resep: '1. Tumis bumbu halus dengan serai dan daun salam\n2. Masukkan ayam, aduk hingga berubah warna\n3. Tuang santan, masak dengan api kecil\n4. Tambahkan garam, gula, dan penyedap\n5. Masak hingga ayam empuk dan bumbu meresap\n6. Angkat dan sajikan dengan ketupat',
      bahan: 'Ayam 1 kg, Santan 800ml, Bawang putih 6 siung, Kemiri 5 butir, Ketumbar 2 sdt, Serai 3 batang, Daun salam 4 lembar',
    },
    {
      name: 'Bakso Sapi Kenyal',
      resep: '1. Giling daging sapi hingga halus\n2. Campurkan dengan tepung tapioka, bawang putih, garam, merica, es batu\n3. Uleni hingga kalis dan kenyal\n4. Bentuk bulat-bulat\n5. Rebus dalam air mendidih hingga mengapung\n6. Sajikan dengan kuah kaldu sapi dan mie',
      bahan: 'Daging sapi 500g, Tepung tapioka 100g, Bawang putih 5 siung, Es batu 50g, Garam 1 sdt, Merica 1/2 sdt',
    },
    {
      name: 'Gulai Kambing Khas Padang',
      resep: '1. Rebus kambing dengan jahe hingga empuk\n2. Tumis bumbu halus hingga harum\n3. Masukkan bumbu tumis ke kaldu kambing\n4. Tambahkan santan, masak hingga mendidih\n5. Beri daun jeruk dan serai\n6. Masak dengan api kecil hingga bumbu meresap',
      bahan: 'Daging kambing 750g, Santan 600ml, Bawang merah 8 siung, Jahe 3 cm, Kunyit 2 cm, Cabai merah 6 buah, Daun jeruk 4 lembar',
    },
    {
      name: 'Sayur Asem Jakarta',
      resep: '1. Rebus air hingga mendidih\n2. Masukkan jagung, labu siam, kacang panjang\n3. Tambahkan asam jawa, gula merah, garam\n4. Masukkan daun melinjo dan buah melinjo\n5. Masak hingga sayuran matang\n6. Koreksi rasa, angkat dan sajikan',
      bahan: 'Jagung manis 1 buah, Labu siam 1 buah, Kacang panjang 100g, Melinjo 50g, Asam jawa 2 sdm, Gula merah 30g',
    },
    {
      name: 'Ayam Bakar Madu',
      resep: '1. Rebus ayam dengan bumbu hingga setengah matang\n2. Campurkan kecap, madu, bawang putih, jeruk nipis untuk marinasi\n3. Lumuri ayam dengan marinasi, diamkan 30 menit\n4. Bakar ayam sambil terus dioles marinasi\n5. Bakar hingga matang dan berwarna kecoklatan\n6. Sajikan dengan sambal dan lalapan',
      bahan: 'Ayam 1 ekor, Madu 3 sdm, Kecap manis 4 sdm, Bawang putih 5 siung, Jeruk nipis 2 buah, Kecap asin 1 sdm',
    },
    {
      name: 'Capcay Kuah Seafood',
      resep: '1. Tumis bawang putih hingga harum\n2. Masukkan udang dan cumi, tumis sebentar\n3. Tambahkan air/kaldu, tunggu mendidih\n4. Masukkan semua sayuran (wortel, kembang kol, sawi)\n5. Beri kecap asin, saus tiram, garam, merica\n6. Kentalkan dengan larutan maizena, aduk rata',
      bahan: 'Udang 150g, Cumi 100g, Wortel 1 buah, Kembang kol 150g, Sawi putih 200g, Bawang putih 4 siung, Saus tiram 2 sdm',
    },
    {
      name: 'Sate Ayam Madura',
      resep: '1. Potong dadu ayam, marinasi dengan kecap dan bumbu\n2. Tusuk ayam dengan tusukan sate\n3. Bakar sate sambil dioles bumbu kecap\n4. Haluskan kacang goreng untuk bumbu sate\n5. Tambahkan kecap manis, cabai, bawang merah, air asam\n6. Sajikan sate dengan bumbu kacang dan lontong',
      bahan: 'Ayam fillet 600g, Kacang tanah 150g, Kecap manis 5 sdm, Bawang merah 6 siung, Cabai rawit 5 buah, Jeruk nipis 1 buah',
    },
    {
      name: 'Rawon Daging Sapi',
      resep: '1. Rebus daging sapi hingga empuk\n2. Haluskan kluwek, bawang merah, bawang putih, kemiri, jahe\n3. Tumis bumbu halus hingga harum\n4. Masukkan bumbu ke kaldu daging\n5. Tambahkan serai, daun salam, lengkuas\n6. Masak hingga kuah hitam pekat, sajikan dengan tauge',
      bahan: 'Daging sapi 500g, Kluwek 6 butir, Bawang merah 8 siung, Bawang putih 5 siung, Kemiri 4 butir, Serai 2 batang, Tauge 100g',
    },
    {
      name: 'Pempek Palembang',
      resep: '1. Haluskan ikan tenggiri\n2. Campurkan dengan tepung sagu, telur, bawang putih, garam\n3. Uleni hingga kalis\n4. Bentuk pempek kapal selam (isi dengan telur)\n5. Rebus dalam air mendidih hingga mengapung\n6. Goreng sebentar, sajikan dengan cuka',
      bahan: 'Ikan tenggiri 500g, Tepung sagu 250g, Telur 5 butir, Bawang putih 6 siung, Gula merah 100g, Cabai rawit 15 buah',
    },
    {
      name: 'Tumis Kangkung Terasi',
      resep: '1. Panaskan minyak, tumis bawang putih dan cabai\n2. Tambahkan terasi, aduk hingga harum\n3. Masukkan kangkung, aduk cepat dengan api besar\n4. Beri kecap asin, garam, gula\n5. Tumis hingga kangkung layu tapi masih hijau\n6. Angkat dan sajikan',
      bahan: 'Kangkung 2 ikat, Bawang putih 5 siung, Cabai merah 4 buah, Terasi 1 sdt, Kecap asin 1 sdm',
    },
    {
      name: 'Martabak Telur Daging',
      resep: '1. Buat adonan kulit dari tepung, telur, minyak, air\n2. Istirahatkan adonan 30 menit\n3. Tumis daging cincang dengan bawang bombay dan daun bawang\n4. Tipiskan adonan, beri isian daging dan telur\n5. Lipat adonan membentuk persegi\n6. Goreng hingga kuning kecoklatan',
      bahan: 'Tepung terigu 300g, Daging cincang 200g, Telur 6 butir, Bawang bombay 1 buah, Daun bawang 3 batang',
    },
    {
      name: 'Es Cendol Dawet',
      resep: '1. Masak tepung hunkwe dengan air daun pandan hingga kental\n2. Cetak cendol dengan cetakan\n3. Rendam dalam air es\n4. Rebus santan dengan gula dan garam\n5. Rebus gula merah dengan air untuk sirup\n6. Tata cendol, siram santan dan sirup gula merah, beri es serut',
      bahan: 'Tepung hunkwe 100g, Santan 400ml, Gula merah 200g, Daun pandan 5 lembar, Es batu secukupnya',
    },
  ];

  for (const row of data) {
    // Check if record exists
    const existing = await prisma.tbResep.findFirst({
      where: {
        name: row.name,
        status: true,
      },
    });

    if (existing) {
      // Update existing record
      await prisma.tbResep.update({
        where: {
          resepId: existing.resepId,
        },
        data: {
          resep: row.resep,
          bahan: row.bahan,
          updatedBy: 'SYSTEM',
          updatedAt: new Date(),
        },
      });
      console.log(`  Updated: ${row.name}`);
    } else {
      // Insert new record
      await prisma.tbResep.create({
        data: {
          ...row,
          createdBy: 'SYSTEM',
          updatedBy: 'SYSTEM',
        },
      });
      console.log(`  Created: ${row.name}`);
    }
  }

  console.log('tb_resep seeding completed!');
}

// Allow running this seeder directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const prisma = new PrismaClient();
  seedResep(prisma)
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
