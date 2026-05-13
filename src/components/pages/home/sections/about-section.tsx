'use client';

import { IMG } from '../home-constants';
import { FadeIn, Stagger, StaggerItem, fadeLeft, fadeRight } from '../home-animations';

export function AboutSection() {
  return (
    <section id="company" className="bg-white">
      {/* Introduction */}
      <div className="py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <FadeIn variants={fadeLeft}>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary-100 text-primary">Introduction</span>
              <h2 className="font-black leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                Masalah Limbah Kulit<br /><span className="text-primary">Menjadi Berkah</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">Industri kulit Sukaregang memiliki lima titik pengolahan limbah kulit, namun sayangnya hingga kini kelima titik pengolahan tersebut tidak berfungsi sehingga para pelaku industri kebingungan mengolah limbahnya.</p>
              <p className="text-gray-600 leading-relaxed mb-6">Karena tidak ada tempat untuk mengolah limbah ini, sebagian orang langsung membuang limbah kulit ke sungai, menyebabkan sumber air bersih berkurang dan warga sekitar mulai kesulitan mendapatkan air bersih.</p>
              <div className="p-5 rounded-lg bg-primary-100 border-l-4 border-primary">
                <p className="font-bold text-sm text-primary-700">Namun, limbah kulit memiliki kandungan biologis organik tinggi dan kaya nutrisi sebagai kategori produk asam amino — mengandung potensi 1 juta liter/hari jika dikonversi menjadi pupuk organik cair.</p>
              </div>
            </FadeIn>
            <Stagger className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
              {[
                { label: 'Lime Waste', img: IMG.waste1 },
                { label: 'Leather Insertion Waste', img: IMG.waste2 },
                { label: 'Solid Waste', img: IMG.waste3 },
                { label: 'Leather Dye Waste', img: IMG.waste4 },
              ].map((item) => (
                <StaggerItem key={item.label} className="h-full">
                  <div
                    className="h-full rounded-lg p-5 flex flex-col justify-end text-white font-bold text-sm overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.6)), url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    {item.label}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>

      {/* Problems Bring Blessings */}
      <div className="py-16" style={{ background: '#1a1a1a' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <FadeIn>
            <h2 className="font-black text-white mb-10" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              <span className="text-primary">PROBLEMS</span> BRING BLESSINGS
            </h2>
          </FadeIn>
          <Stagger className="grid gap-3">
            {[
              'Leather waste has high organic biological content and is rich in nutrients as an amino acid product category',
              'Leather industry waste has 1 million liters / day if converted into liquid organic fertilizer',
              'It has more economic value for farmers in Indonesia',
              'Creating superior products in the form of animal fat amino acids and the only one in Indonesia',
              'Provides maximum results and creates healthier food and lower chemical residues',
            ].map((item, i) => (
              <StaggerItem key={item} variants={i % 2 === 0 ? fadeLeft : fadeRight}>
                <div className="px-6 py-4 rounded-full font-bold text-gray-900 bg-primary">{item}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* About Us detail */}
      <div className="py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeIn variants={fadeLeft}>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary-100 text-primary">About Us</span>
              <h2 className="font-black leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                PT. Mandraguna<br /><span className="text-primary">Pusaka Indonesia</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">PT. Mandraguna Pusaka Indonesia adalah perusahaan yang bergerak dalam bidang produksi berbagai macam pupuk kebutuhan tanaman, yang mengedepankan kepuasan pelanggan. Sejalan dengan perkembangan teknologi, Mandraguna Pusaka Indonesia memiliki sumber daya manusia yang profesional dan ahli dalam bidangnya.</p>
              <p className="text-gray-600 leading-relaxed mb-8">Kami terbentuk atas inisiasi Induk Perusahaan kami yaitu CV. Bir Ali Jaya yang bergerak di bidang pengolahan kulit sapi. Kami melihat visi yang lebih besar dari sumberdaya terkecil yang kami miliki berupa pemanfaatan limbah kulit yang memiliki kandungan hayati organik tinggi dan kaya nutrisi — untuk kemudian dengan cermat kami mengolah sumberdaya itu menjadi produk terbaik berupa Pupuk unggulan.</p>
              <div className="mb-6 p-5 rounded-lg bg-primary-100">
                <h3 className="font-black text-sm uppercase tracking-wider mb-3 text-primary-700">Visi</h3>
                <p className="text-gray-700 text-sm leading-relaxed">"Menjadi Perusahaan Terkemuka Dalam Menghasilkan Pupuk Organik Cair Lemak Hewani Yang Ramah Lingkungan Dan Berperan Pada Ketahanan Tanaman Pertanian Dan Pangan Sehingga Membuat Bumi Menjadi Tempat Hidup Lebih Baik Bagi Generasi Masa Depan"</p>
              </div>
            </FadeIn>
            <FadeIn variants={fadeRight}>
              <div className="mb-6">
                <h3 className="font-black text-sm uppercase tracking-wider mb-4 text-primary-700">Misi</h3>
                <ul className="space-y-2.5">
                  {[
                    'Sebagai solusi untuk masalah pembenah tanah dan penyubur tanaman.',
                    'Menginspirasi & menumbuhkan kesadaran manusia pada lingkungan hidup untuk masa depan yang berkelanjutan.',
                    'Memberikan pelayanan prima dan loyalitas sehingga tercipta kepuasan pelanggan.',
                    'Membentuk perusahaan yang dikenal luas dan menghasilkan keuntungan untuk kesejahteraan semua pihak terkait.',
                    'Melakukan usaha dan memanfaatkan asset yang terintegrasi dalam produk hewani.',
                    'Senantiasa melakukan perbaikan berkelanjutan.',
                  ].map((m) => (
                    <li key={m} className="flex gap-3 text-sm text-gray-600">
                      <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold bg-primary">✓</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-wider mb-4 text-primary-700">Nilai-Nilai ADAB</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { letter: 'A', name: 'Amanah', desc: 'Memegang teguh kepercayaan yang diberikan.' },
                    { letter: 'D', name: 'Dedikasi', desc: 'Pengorbanan tenaga, pikiran dan waktu demi keberhasilan usaha yang mempunyai tujuan mulia.' },
                    { letter: 'A', name: 'Arif', desc: 'Bijaksana, berakal sehat, cerda, tajam, berilmu, sadar.' },
                    { letter: 'B', name: 'Berani', desc: 'Memiliki hati yang mantap dan rasa percaya diri yang besar serta mampu menaklukkan rasa takut.' },
                  ].map((v) => (
                    <div key={v.name} className="p-4 rounded-lg border border-primary-100">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-white text-sm mb-2 bg-primary">{v.letter}</div>
                      <p className="font-bold text-sm text-gray-900 mb-1">{v.name}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
