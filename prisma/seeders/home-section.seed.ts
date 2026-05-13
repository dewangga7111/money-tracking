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
    {
      section: 'about',
      data: {
        introduction: {
          headline: 'Masalah Limbah Kulit',
          headlineHighlight: 'Menjadi Berkah',
          paragraph1:
            'Industri kulit Sukaregang memiliki lima titik pengolahan limbah kulit, namun sayangnya hingga kini kelima titik pengolahan tersebut tidak berfungsi sehingga para pelaku industri kebingungan mengolah limbahnya.',
          paragraph2:
            'Karena tidak ada tempat untuk mengolah limbah ini, sebagian orang langsung membuang limbah kulit ke sungai, menyebabkan sumber air bersih berkurang dan warga sekitar mulai kesulitan mendapatkan air bersih.',
          callout:
            'Namun, limbah kulit memiliki kandungan biologis organik tinggi dan kaya nutrisi sebagai kategori produk asam amino — mengandung potensi 1 juta liter/hari jika dikonversi menjadi pupuk organik cair.',
          wasteCards: [
            { label: 'Lime Waste', img: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&q=80&auto=format&fit=crop' },
            { label: 'Leather Insertion Waste', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop' },
            { label: 'Solid Waste', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop' },
            { label: 'Leather Dye Waste', img: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=600&q=80&auto=format&fit=crop' },
          ],
        },
        problems: {
          items: [
            'Leather waste has high organic biological content and is rich in nutrients as an amino acid product category',
            'Leather industry waste has 1 million liters / day if converted into liquid organic fertilizer',
            'It has more economic value for farmers in Indonesia',
            'Creating superior products in the form of animal fat amino acids and the only one in Indonesia',
            'Provides maximum results and creates healthier food and lower chemical residues',
          ],
        },
        company: {
          name: 'PT. Mandraguna',
          nameHighlight: 'Pusaka Indonesia',
          paragraph1:
            'PT. Mandraguna Pusaka Indonesia adalah perusahaan yang bergerak dalam bidang produksi berbagai macam pupuk kebutuhan tanaman, yang mengedepankan kepuasan pelanggan. Sejalan dengan perkembangan teknologi, Mandraguna Pusaka Indonesia memiliki sumber daya manusia yang profesional dan ahli dalam bidangnya.',
          paragraph2:
            'Kami terbentuk atas inisiasi Induk Perusahaan kami yaitu CV. Bir Ali Jaya yang bergerak di bidang pengolahan kulit sapi. Kami melihat visi yang lebih besar dari sumberdaya terkecil yang kami miliki berupa pemanfaatan limbah kulit yang memiliki kandungan hayati organik tinggi dan kaya nutrisi — untuk kemudian dengan cermat kami mengolah sumberdaya itu menjadi produk terbaik berupa Pupuk unggulan.',
          vision:
            '"Menjadi Perusahaan Terkemuka Dalam Menghasilkan Pupuk Organik Cair Lemak Hewani Yang Ramah Lingkungan Dan Berperan Pada Ketahanan Tanaman Pertanian Dan Pangan Sehingga Membuat Bumi Menjadi Tempat Hidup Lebih Baik Bagi Generasi Masa Depan"',
          missions: [
            'Sebagai solusi untuk masalah pembenah tanah dan penyubur tanaman.',
            'Menginspirasi & menumbuhkan kesadaran manusia pada lingkungan hidup untuk masa depan yang berkelanjutan.',
            'Memberikan pelayanan prima dan loyalitas sehingga tercipta kepuasan pelanggan.',
            'Membentuk perusahaan yang dikenal luas dan menghasilkan keuntungan untuk kesejahteraan semua pihak terkait.',
            'Melakukan usaha dan memanfaatkan asset yang terintegrasi dalam produk hewani.',
            'Senantiasa melakukan perbaikan berkelanjutan.',
          ],
          values: [
            { letter: 'A', name: 'Amanah', desc: 'Memegang teguh kepercayaan yang diberikan.' },
            { letter: 'D', name: 'Dedikasi', desc: 'Pengorbanan tenaga, pikiran dan waktu demi keberhasilan usaha yang mempunyai tujuan mulia.' },
            { letter: 'A', name: 'Arif', desc: 'Bijaksana, berakal sehat, cerda, tajam, berilmu, sadar.' },
            { letter: 'B', name: 'Berani', desc: 'Memiliki hati yang mantap dan rasa percaya diri yang besar serta mampu menaklukkan rasa takut.' },
          ],
        },
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
