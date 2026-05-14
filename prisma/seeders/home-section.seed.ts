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
      section: 'gallery',
      data: {
        badge: 'Galeri',
        headline: 'BEST PARTNERS',
        headlineHighlight: 'FRIENDS OF FARMERS INDONESIA',
        items: [
          { img: 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=600&q=80&auto=format&fit=crop', caption: 'Pelatihan & Sosialisasi Petani Mandraguna' },
          { img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80&auto=format&fit=crop', caption: 'Uji Coba di Lahan Padi — Kabupaten Bone' },
          { img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80&auto=format&fit=crop', caption: 'Panen Bawang dengan Mandraguna Grow' },
          { img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80&auto=format&fit=crop', caption: 'Mitra Petani Mandraguna — Hasil Panen Padi' },
          { img: 'https://images.unsplash.com/photo-1562519819-016930ada31b?w=900&q=80&auto=format&fit=crop', caption: 'Aplikasi Mandraguna Grow pada Tanaman Jagung' },
          { img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80&auto=format&fit=crop', caption: 'Mandraguna Hadir di Seluruh Indonesia' },
        ],
      },
    },
    {
      section: 'howto',
      data: {
        badge: 'Cara Pemakaian',
        headline: 'MANDRAGUNA GROW',
        subheadline: 'DOSAGE, TIME & HOW TO USE',
        sprayingTimes: ['Morning: 06.00 – 09.00', 'Afternoon: 15.00 – 18.00'],
        categories: [
          {
            title: 'Food Crops',
            sub: 'Rice & Corn',
            cls: 'bg-primary',
            items: [
              'Seeds ready for sowing — soak 8 hours in POC solution 10ml/liter',
              'Field plants: 10ml/liter — spray at 7th, 15th, 30th HST (vegetative)',
              '20ml/liter — spray at 45th & 60th HST (generative)',
            ],
          },
          {
            title: 'Tuber Plants',
            sub: 'Cassava, Potato, etc.',
            cls: 'bg-primary-700',
            items: [
              '10ml/liter = vegetative period',
              '20ml/liter = generative period',
              'Double dose when applied around stem and roots',
              'Repeat every 10–14 days',
            ],
          },
          {
            title: 'Vegetable & Fruit',
            sub: 'All types',
            cls: 'bg-primary',
            items: [
              '5ml/liter = vegetative period',
              '10ml/liter = generative period',
              'Double dose when applied around stem and roots',
            ],
          },
          {
            title: 'Perennials',
            sub: 'Palm, Durian, etc.',
            cls: 'bg-primary-700',
            items: [
              '10ml/liter = vegetative period',
              '20ml/liter = generative period',
              'Double dose when applied around stem and roots',
            ],
          },
        ],
        generalNotes: [
          'Kocok dahulu sebelum digunakan',
          'Lakukan penyemprotan dengan merata',
          'Waktu penyemprotan ideal: pagi 06.00–09.00, sore 15.00–18.00',
        ],
      },
    },
    {
      section: 'benefit',
      data: {
        quote: 'Mandraguna is the Key',
        quoteDesc: 'Organic Fertilizer Plays A Vital Role In Improves Soil, Plant Health And Overall Human Welfare. Apart from providing direct benefits for Soil Health With Nutrition, Agriculture Organic Also Promotes Sustainability Environment By Reducing Pollution And Support Biodiversity.',
        badge: 'Keunggulan Produk',
        headline: '8 MANDRAGUNA GROW',
        headlineHighlight: 'SPECIALTY',
        specialtyCards: [
          { label: 'Complete Nutrients', desc: 'MANDRAGUNA GROW provides complete macro and micro nutrients plants need.' },
          { label: 'Enzymes & Amino Acids', desc: 'Contains complex organic compounds, especially enzymes and amino acids.' },
          { label: 'Plant Fertilizer', desc: 'MANDRAGUNA GROW contains plant fertilizing microorganisms.' },
          { label: 'Fertile & Nourishing', desc: 'Repairs physical fertility and nourishes the soil so plants absorb faster and easily.' },
          { label: 'Reducing Chemical Fertilizers', desc: 'Reduces usage of chemical fertilizer by 50–100% gradually.' },
          { label: 'Plant Durability', desc: 'Increases plant resistance to attack from pests and diseases.' },
          { label: 'Healthier Plants', desc: 'Makes plants grow bigger, healthier and safe for human consumption.' },
          { label: 'Increased Production', desc: 'Increases production as a whole — quantity, quality, taste, color, aroma, and storage durability.' },
        ],
        info: {
          title: 'Mengapa Asam Amino?',
          desc: 'Amino acids are organic compounds containing an amino group (-NH₂) and carboxyl group (-COOH). Amino acids are the basic components of protein and play an important role in various biological processes.',
          benefits: [
            'Meningkatkan kandungan klorofil dan laju fotosintesis',
            'Meningkatkan aktivitas mikroba tanah yang menguntungkan, sehingga meningkatkan kesuburan tanah',
            'Meningkatkan kualitas dan produktivitas tanaman serta metabolisme tanaman',
          ],
          type: [
            { label: 'Tanaman Padi & Jagung', desc: 'Food Crops' },
            { label: 'Sayuran & Buah', desc: 'Vegetables & Fruits' },
            { label: 'Tanaman Keras', desc: 'Perennials' },
            { label: 'Umbi-umbian', desc: 'Tuber Plants' },
            { label: 'Tanaman Hias', desc: 'Ornamental' },
            { label: 'Perkebunan', desc: 'Plantation' },
          ],
        },
      },
    },
    {
      section: 'products',
      data: {
        badge: 'Produk Kami',
        title: 'PRODUK UNGGULAN',
        description:
          'PT Mandraguna Pusaka Indonesia menghadirkan produk unggulan di pasaran dengan berbagai macam varian produk sesuai segmentasi pasar yang dibutuhkan, dari mulai produk tanaman bahan pokok berupa padi, dan juga buah dan sayuran hingga untuk produk tanaman hias.',
        products: [
          {
            image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80&auto=format&fit=crop',
            name: 'MANDRAGUNA GROW',
            subtitle: 'Pupuk Organik Cair • Nutrisi Asam Amino',
            badge: { label: '1 LITER', cls: 'bg-primary text-white' },
            desc: 'Pupuk Asam Amino Yang Di Hasilkan Dari Lemak Hewani. Kaya Akan Protein Sehingga Dapat Menutrisi Tanaman Dengan Maksimal Dan Juga Meningkatkan Imunitas Tanaman Sehingga Rentan Terhadap Hama Dan Penyakit.',
            kandungan: [
              { key: 'C-Organik', value: '15,58%' },
              { key: 'N+P₂O₅+K₂O', value: '2,90%' },
              { key: 'N-Organik', value: '0,54%' },
              { key: 'pH', value: '4,4' },
              { key: 'Cu-total', value: '32,7 ppm' },
              { key: 'Zn-total', value: '27,2 ppm' },
            ],
            valueCls: 'text-primary',
            reg: 'No. Reg: 02.02.2022.897 — PT. MANDRAGUNA PUSAKA INDONESIA',
          },
          {
            image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80&auto=format&fit=crop',
            name: 'BIO-FAT',
            subtitle: 'Pupuk Hayati Cair • Majemuk',
            badge: { label: 'HAYATI', cls: 'bg-[#2d5a1b] text-[#7ed952]' },
            desc: 'Pupuk Hayati Cair dari CV. Bir Ali Jaya yang mengandung mikroba bermanfaat untuk meningkatkan kesuburan tanah dan mendukung pertumbuhan tanaman secara alami dan berkelanjutan.',
            kandungan: [
              { key: 'Bacillus sp.', value: '4,38 × 10⁸ CFU/ml' },
              { key: 'Pseudomonas sp.', value: '3,88 × 10⁸ CFU/ml' },
              { key: 'Actinomycetes sp.', value: '5,08 × 10⁶ CFU/ml' },
              { key: 'Trichoderma sp.', value: '1,20 × 10⁸ CFU/ml' },
            ],
            valueCls: 'text-[#7ed952]',
            reg: 'No. Reg: 03.02.2023.996 — CV. BIR ALI JAYA',
          },
        ],
      },
    },
    {
      section: 'footer',
      data: {
        contact: {
          headline: 'HUBUNGI KAMI',
          subheadline: 'Bergabunglah bersama ribuan petani Indonesia yang telah merasakan manfaat Mandraguna Grow.',
        },
        brand: {
          name: 'MANDRAGUNA',
          sub: 'PUSAKA INDONESIA',
        },
        address: 'Kp. Ciherang RT. 01 RW. 07\nDesa/Kelurahan Suci, Kec. Karangpawitan\nKab. Garut, Provinsi Jawa Barat\nKode Pos: 44182',
        phone: '(0262) 2803406',
        email: 'mandragunapusaka2022@gmail.com',
        socials: [
          { label: 'IG', href: 'https://instagram.com/ptmandragunaofficial' },
          { label: 'YT', href: 'https://youtube.com/@PetaniMandraguna' },
          { label: 'FB', href: '#' },
        ],
        products: [
          { label: 'Mandraguna Grow', href: '#products' },
          { label: 'Bio-Fat', href: '#products' },
          { label: 'Produk Lainnya', href: '#products' },
        ],
        copyright: '© 2024 PT. Mandraguna Pusaka Indonesia — NIB: 1289000121596',
        youtubeHandle: 'Petani Mandraguna',
        instagramHandle: '@ptmandragunaofficial',
      },
    },
    {
      section: 'legal',
      data: {
        badge: 'Legalitas',
        headline: 'LEGALITAS',
        headlineHighlight: 'PERUSAHAAN & PRODUK',
        description:
          'PT. Mandraguna Pusaka Indonesia melakukan operasi produksi dengan melalui proses perizinan sesuai perundangan di Indonesia. Kami terus berproses melengkapi dokumen legalitas dari mulai Akta Notariat, pengesahan Kemenkumham, Perizinan Perpajakan hingga legalitas HAKI untuk pengamanan merk nama produk kami semua.',
        docs: [
          { title: 'NIB Perusahaan', sub: 'PT Mandraguna Pusaka Indonesia', detail: 'NIB: 1289000121596', issued: '19 Januari 2021 — Rev. 22 Sep 2022', variant: 'primary', image: '' },
          { title: 'NIB Induk', sub: 'CV Bir Ali Jaya', detail: 'NIB: 0220105850731', issued: '3 Agustus 2020 — Rev. 13 Juni 2023', variant: 'secondary', image: '' },
          { title: 'NPWP Perusahaan', sub: 'PT Mandraguna Pusaka Indonesia', detail: 'NPWP: 96.868.238.5-443.000', issued: 'KPP Pratama Garut', variant: 'primary', image: '' },
          { title: 'Reg. Mandraguna Grow', sub: 'Pupuk Organik Cair', detail: 'No. Reg: 02.02.2022.897', issued: 'Izin Edar Kementrian Pertanian', variant: 'secondary', image: '' },
          { title: 'Reg. Bio-Fat', sub: 'Pupuk Hayati Majemuk Cair', detail: 'No. Reg: 03.02.2023.996', issued: '25 Juli 2023', variant: 'primary', image: '' },
          { title: 'Sertifikat Merek', sub: 'Kementerian Hukum dan HAM', detail: 'IDM000953284', issued: '3 Feb 2021 — berlaku hingga 2031', variant: 'secondary', image: '' },
        ],
      },
    },
    {
      section: 'documentation',
      data: {
        badge: 'Documentation',
        headline: 'Media Coverage',
        subheadline: 'Mandraguna di Mata Media',
        articles: [
          {
            media: 'Analis News',
            date: '11 November 2024',
            title: 'Mandraguna: Terobosan Pupuk Asam Amino Hewani H. Muhamad Rian untuk Pertanian Berkelanjutan',
            img: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80&auto=format&fit=crop',
            tag: 'JABAR',
            link: '',
          },
          {
            media: 'Priangan Insider',
            date: '26 November 2024',
            title: 'H. Rian, Pengusaha Muda Visioner dari Garut Mengubah Limbah Menjadi Berkah',
            img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80&auto=format&fit=crop',
            tag: 'PRIANGAN',
            link: '',
          },
          {
            media: 'Harian Fajar',
            date: 'Desember 2023',
            title: 'Kunci Sukses Petani di Bone Bisa Panen Tembus 7,3 Ton Per Hektare',
            img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80&auto=format&fit=crop',
            tag: 'BONE',
            link: '',
          },
        ],
      },
    },
    {
      section: 'about',
      data: {
        introduction: {
          badge: 'Introduction',
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
          titleHighlight: 'PROBLEMS',
          titleNormal: 'BRING BLESSINGS',
          items: [
            'Leather waste has high organic biological content and is rich in nutrients as an amino acid product category',
            'Leather industry waste has 1 million liters / day if converted into liquid organic fertilizer',
            'It has more economic value for farmers in Indonesia',
            'Creating superior products in the form of animal fat amino acids and the only one in Indonesia',
            'Provides maximum results and creates healthier food and lower chemical residues',
          ],
        },
        company: {
          badge: 'About Us',
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
