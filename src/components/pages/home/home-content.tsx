'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, type Variants, type MotionStyle } from 'framer-motion';

const AMBER = '#D4890A';
const AMBER_DARK = '#A36308';
const AMBER_LIGHT = '#FEF3DC';

const NAV_ITEMS = [
  { label: 'ABOUT US', href: '#company', id: 'company' },
  { label: 'PRODUCTS', href: '#products', id: 'products' },
  { label: 'BENEFIT', href: '#benefit', id: 'benefit' },
  { label: 'HOW TO', href: '#howto', id: 'howto' },
  { label: 'GALERI', href: '#gallery', id: 'gallery' },
  { label: 'LEGAL', href: '#legal', id: 'legal' },
  { label: 'DECOMMENTATION', href: '#decommentation', id: 'decommentation' },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } } };
const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE } } };
const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE } } };

const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } } };

const viewOpts = { once: true, margin: '-80px' } as const;

function FadeIn({ children, className, style, variants = fadeUp }: {
  children: React.ReactNode; className?: string; style?: MotionStyle; variants?: Variants;
}) {
  return (
    <motion.div className={className} {...(style ? { style } : {})} initial="hidden" whileInView="visible" viewport={viewOpts} variants={variants}>
      {children}
    </motion.div>
  );
}

function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={viewOpts} variants={staggerContainer}>
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className, variants = staggerItem }: { children: React.ReactNode; className?: string; variants?: Variants }) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

const IMG = {
  hero: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80&auto=format&fit=crop',
  about: 'https://fwi.or.id/wp-content/uploads/2022/12/ID0617-MAHULU-DJI1106-NS-066.jpg',
  grow1: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80&auto=format&fit=crop',
  grow2: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80&auto=format&fit=crop',
  field1: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80&auto=format&fit=crop',
  field2: 'https://images.unsplash.com/photo-1562519819-016930ada31b?w=900&q=80&auto=format&fit=crop',
  gallery1: 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=600&q=80&auto=format&fit=crop',
  gallery2: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80&auto=format&fit=crop',
  gallery3: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80&auto=format&fit=crop',
  news1: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80&auto=format&fit=crop',
  news2: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80&auto=format&fit=crop',
  news3: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80&auto=format&fit=crop',
  plant: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80&auto=format&fit=crop',
};

export function HomeContent() {
  const [activeSection, setActiveSection] = useState<string>('company');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState(0);
  const [winW, setWinW] = useState(1200);
  useEffect(() => {
    setWinW(window.innerWidth);
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry?.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', isolation: 'isolate' }}>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ height: '100vh', minHeight: '650px' }}>
        <motion.div
          className="absolute inset-0"
          style={{
            y: bgY,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url(${IMG.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            scale: 1.2,
          }}
        />
        <motion.div
          className="relative z-10 h-full flex flex-col"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
          }}
        >
          <div className="flex-1 flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 w-full">
              <motion.p
                className="text-sm font-bold uppercase tracking-[0.2em] mb-5"
                style={{ color: AMBER }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
              >
                PT. Mandraguna Pusaka Indonesia
              </motion.p>
              <motion.h1
                className="text-white font-black leading-[0.95] mb-8"
                style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              >
                <span style={{ color: '#F5C561' }}>"PETANI </span>
                ADALAH TUAN<br />
                SEBUAH NEGERI DAN<br />
                SEJATINYA DIALAH{' '}
                <span style={{ color: '#F5C561' }}>RAJA YANG HAKIKI"</span>
              </motion.h1>
              <motion.div
                className="flex flex-wrap gap-3"
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
              >
                <a
                  href="#products"
                  onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded text-white"
                  style={{ background: AMBER }}
                >
                  Produk Kami <span>→</span>
                </a>
                <a
                  href="#company"
                  onClick={(e) => { e.preventDefault(); document.getElementById('company')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
                >
                  Tentang Kami <span>→</span>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Scroll guide */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0, 1, 1, 1, 1, 0, 0] }}
            transition={{ delay: 1.2, duration: 4, repeat: Infinity, times: [0, 0.05, 0.15, 0.4, 0.6, 0.85, 0.95, 1], ease: 'easeInOut' }}
            onClick={() => document.getElementById('company')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em]">Scroll</span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5"
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-white"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STICKY NAV ── */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        {/* Desktop: pill nav */}
        <div className="hidden md:flex max-w-[1400px] mx-auto px-6 py-4 justify-center">
          <nav className="bg-[#f0f0f0] rounded-full px-3 py-2 flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="relative text-xs font-bold tracking-wider px-4 py-2 rounded-full whitespace-nowrap cursor-pointer"
                  style={{ color: isActive ? '#fff' : '#333', zIndex: 1 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: AMBER, zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Mobile: burger nav */}
        <div className="md:hidden">
          <div className="px-5 py-3 flex items-center justify-between relative">
            {/* Burger */}
            <button onClick={() => setMenuOpen((o) => !o)} className="flex flex-col gap-1.5 p-1">
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block w-5 h-0.5 bg-gray-800" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-5 h-0.5 bg-gray-800" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-5 h-0.5 bg-gray-800" />
            </button>

            {/* Center logo */}
            <span className="absolute left-1/2 -translate-x-1/2 font-black text-sm tracking-wider" style={{ color: AMBER }}>
              MANDRAGUNA
            </span>

            {/* Active section indicator */}
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: AMBER }}>
              {NAV_ITEMS.find((n) => n.id === activeSection)?.label ?? ''}
            </span>
          </div>

          {/* Dropdown menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-gray-100"
              >
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.label}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 200);
                      }}
                      className="flex items-center justify-between px-6 py-3.5 text-sm font-bold border-b border-gray-50"
                      style={{ color: isActive ? AMBER : '#333', background: isActive ? '#FEF9F0' : 'white' }}
                    >
                      {item.label}
                      {isActive && <span style={{ color: AMBER }}>●</span>}
                    </motion.a>
                  );
                })}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── INTRODUCTION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn variants={fadeLeft}>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: AMBER_LIGHT, color: AMBER }}>Introduction</span>
              <h2 className="font-black leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                Masalah Limbah Kulit<br /><span style={{ color: AMBER }}>Menjadi Berkah</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">Industri kulit Sukaregang memiliki lima titik pengolahan limbah kulit, namun sayangnya hingga kini kelima titik pengolahan tersebut tidak berfungsi sehingga para pelaku industri kebingungan mengolah limbahnya.</p>
              <p className="text-gray-600 leading-relaxed mb-6">Karena tidak ada tempat untuk mengolah limbah ini, sebagian orang langsung membuang limbah kulit ke sungai, menyebabkan sumber air bersih berkurang dan warga sekitar mulai kesulitan mendapatkan air bersih.</p>
              <div className="p-5 rounded-lg" style={{ background: AMBER_LIGHT, borderLeft: `4px solid ${AMBER}` }}>
                <p className="font-bold text-sm" style={{ color: AMBER_DARK }}>Namun, limbah kulit memiliki kandungan biologis organik tinggi dan kaya nutrisi sebagai kategori produk asam amino — mengandung potensi 1 juta liter/hari jika dikonversi menjadi pupuk organik cair.</p>
              </div>
            </FadeIn>
            <Stagger className="grid grid-cols-2 gap-3">
              {[
                { label: 'Lime Waste', color: AMBER },
                { label: 'Leather Insertion Waste', color: AMBER_DARK },
                { label: 'Solid Waste', color: AMBER },
                { label: 'Leather Dye Waste', color: AMBER_DARK },
              ].map((item) => (
                <StaggerItem key={item.label}>
                  <div className="rounded-lg p-5 flex flex-col justify-end text-white font-bold text-sm" style={{ background: item.color, minHeight: '120px' }}>
                    {item.label}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS BRING BLESSINGS ── */}
      <section className="py-16" style={{ background: '#1a1a1a' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <FadeIn>
            <h2 className="font-black text-white mb-10" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              <span style={{ color: AMBER }}>PROBLEMS</span> BRING BLESSINGS
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
                <div className="px-6 py-4 rounded-full font-bold text-gray-900" style={{ background: AMBER }}>{item}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section id="company" className="py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeIn variants={fadeLeft}>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: AMBER_LIGHT, color: AMBER }}>About Us</span>
              <h2 className="font-black leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                PT. Mandraguna<br /><span style={{ color: AMBER }}>Pusaka Indonesia</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">PT. Mandraguna Pusaka Indonesia adalah perusahaan yang bergerak dalam bidang produksi berbagai macam pupuk kebutuhan tanaman, yang mengedepankan kepuasan pelanggan. Sejalan dengan perkembangan teknologi, Mandraguna Pusaka Indonesia memiliki sumber daya manusia yang profesional dan ahli dalam bidangnya.</p>
              <p className="text-gray-600 leading-relaxed mb-8">Kami terbentuk atas inisiasi Induk Perusahaan kami yaitu CV. Bir Ali Jaya yang bergerak di bidang pengolahan kulit sapi. Kami melihat visi yang lebih besar dari sumberdaya terkecil yang kami miliki berupa pemanfaatan limbah kulit yang memiliki kandungan hayati organik tinggi dan kaya nutrisi — untuk kemudian dengan cermat kami mengolah sumberdaya itu menjadi produk terbaik berupa Pupuk unggulan.</p>
              <div className="mb-6 p-5 rounded-lg" style={{ background: AMBER_LIGHT }}>
                <h3 className="font-black text-sm uppercase tracking-wider mb-3" style={{ color: AMBER_DARK }}>Visi</h3>
                <p className="text-gray-700 text-sm leading-relaxed">"Menjadi Perusahaan Terkemuka Dalam Menghasilkan Pupuk Organik Cair Lemak Hewani Yang Ramah Lingkungan Dan Berperan Pada Ketahanan Tanaman Pertanian Dan Pangan Sehingga Membuat Bumi Menjadi Tempat Hidup Lebih Baik Bagi Generasi Masa Depan"</p>
              </div>
            </FadeIn>
            <FadeIn variants={fadeRight}>
              <div className="mb-6">
                <h3 className="font-black text-sm uppercase tracking-wider mb-4" style={{ color: AMBER_DARK }}>Misi</h3>
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
                      <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: AMBER }}>✓</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-wider mb-4" style={{ color: AMBER_DARK }}>Nilai-Nilai ADAB</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { letter: 'A', name: 'Amanah', desc: 'Memegang teguh kepercayaan yang diberikan.' },
                    { letter: 'D', name: 'Dedikasi', desc: 'Pengorbanan tenaga, pikiran dan waktu demi keberhasilan usaha yang mempunyai tujuan mulia.' },
                    { letter: 'A', name: 'Arif', desc: 'Bijaksana, berakal sehat, cerda, tajam, berilmu, sadar.' },
                    { letter: 'B', name: 'Berani', desc: 'Memiliki hati yang mantap dan rasa percaya diri yang besar serta mampu menaklukkan rasa takut.' },
                  ].map((v) => (
                    <div key={v.name} className="p-4 rounded-lg border" style={{ borderColor: AMBER_LIGHT }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-white text-sm mb-2" style={{ background: AMBER }}>{v.letter}</div>
                      <p className="font-bold text-sm text-gray-900 mb-1">{v.name}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-24 relative" style={{ background: '#1a1a1a' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn className="mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: 'rgba(212,137,10,0.2)', color: AMBER }}>Produk Kami</span>
            <h2 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>PRODUK UNGGULAN</h2>
            <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">PT Mandraguna Pusaka Indonesia menghadirkan produk unggulan di pasaran dengan berbagai macam varian produk sesuai segmentasi pasar yang dibutuhkan, dari mulai produk tanaman bahan pokok berupa padi, dan juga buah dan sayuran hingga untuk produk tanaman hias.</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                image: IMG.grow1,
                name: 'MANDRAGUNA GROW',
                subtitle: 'Pupuk Organik Cair • Nutrisi Asam Amino',
                badge: { label: '1 LITER', bg: AMBER, color: 'white' },
                desc: 'Pupuk Asam Amino Yang Di Hasilkan Dari Lemak Hewani. Kaya Akan Protein Sehingga Dapat Menutrisi Tanaman Dengan Maksimal Dan Juga Meningkatkan Imunitas Tanaman Sehingga Rentan Terhadap Hama Dan Penyakit.',
                kandungan: [
                  ['C-Organik', '15,58%'],
                  ['N+P₂O₅+K₂O', '2,90%'],
                  ['N-Organik', '0,54%'],
                  ['pH', '4,4'],
                  ['Cu-total', '32,7 ppm'],
                  ['Zn-total', '27,2 ppm'],
                ] as [string, string][],
                valueColor: AMBER,
                reg: 'No. Reg: 02.02.2022.897 — PT. MANDRAGUNA PUSAKA INDONESIA',
              },
              {
                image: IMG.grow2,
                name: 'BIO-FAT',
                subtitle: 'Pupuk Hayati Cair • Majemuk',
                badge: { label: 'HAYATI', bg: '#2d5a1b', color: '#7ed952' },
                desc: 'Pupuk Hayati Cair dari CV. Bir Ali Jaya yang mengandung mikroba bermanfaat untuk meningkatkan kesuburan tanah dan mendukung pertumbuhan tanaman secara alami dan berkelanjutan.',
                kandungan: [
                  ['Bacillus sp.', '4,38 × 10⁸ CFU/ml'],
                  ['Pseudomonas sp.', '3,88 × 10⁸ CFU/ml'],
                  ['Actinomycetes sp.', '5,08 × 10⁶ CFU/ml'],
                  ['Trichoderma sp.', '1,20 × 10⁸ CFU/ml'],
                ] as [string, string][],
                valueColor: '#7ed952',
                reg: 'No. Reg: 03.02.2023.996 — CV. BIR ALI JAYA',
              },
            ].map((product, i) => (
              <FadeIn key={product.name} variants={i === 0 ? fadeLeft : fadeRight}>
                <div className="rounded-xl overflow-hidden h-full flex flex-col" style={{ background: '#111' }}>
                  <div className="h-56 shrink-0" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%), url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-black text-2xl text-white mb-1">{product.name}</h3>
                        <p className="text-sm" style={{ color: AMBER }}>{product.subtitle}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: product.badge.bg, color: product.badge.color }}>{product.badge.label}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">{product.desc}</p>
                    <div className="space-y-3 mb-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Kandungan</p>
                      {product.kandungan.map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-gray-400">{k}</span>
                          <span className="font-bold" style={{ color: product.valueColor }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-auto pt-4 border-t" style={{ borderColor: '#333' }}>{product.reg}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFIT ── */}
      <section id="benefit">
        {/* Forest banner */}
        <div className="relative py-16 md:py-24">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${IMG.about})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
          <FadeIn className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
            <h2 className="text-white font-black leading-tight mb-6 whitespace-nowrap" style={{ fontSize: 'clamp(1.5rem, 5vw, 5rem)' }}>
              Mandraguna is the Key
            </h2>
            <p className="text-white/85 leading-[1.9]" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}>
              Organic Fertilizer Plays A Vital Role In Improves Soil, Plant Health And Overall Human Welfare. Apart from providing direct benefits for Soil Health With Nutrition, Agriculture Organic Also Promotes Sustainability Environment By Reducing Pollution And Support Biodiversity.
            </p>
          </FadeIn>
        </div>

        {/* Specialty */}
        <div className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <FadeIn className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: AMBER_LIGHT, color: AMBER }}>Keunggulan Produk</span>
              <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                8 MANDRAGUNA GROW <span style={{ color: AMBER }}>SPECIALTY</span>
              </h2>
            </FadeIn>
            <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '01', title: 'Complete Nutrients', desc: 'MANDRAGUNA GROW provides complete macro and micro nutrients plants need.' },
                { num: '02', title: 'Enzymes & Amino Acids', desc: 'Contains complex organic compounds, especially enzymes and amino acids.' },
                { num: '03', title: 'Plant Fertilizer', desc: 'MANDRAGUNA GROW contains plant fertilizing microorganisms.' },
                { num: '04', title: 'Fertile & Nourishing', desc: 'Repairs physical fertility and nourishes the soil so plants absorb faster and easily.' },
                { num: '05', title: 'Reducing Chemical Fertilizers', desc: 'Reduces usage of chemical fertilizer by 50–100% gradually.' },
                { num: '06', title: 'Plant Durability', desc: 'Increases plant resistance to attack from pests and diseases.' },
                { num: '07', title: 'Healthier Plants', desc: 'Makes plants grow bigger, healthier and safe for human consumption.' },
                { num: '08', title: 'Increased Production', desc: 'Increases production as a whole — quantity, quality, taste, color, aroma, and storage durability.' },
              ].map((sp) => (
                <StaggerItem key={sp.num}>
                  <div className="group p-6 rounded-xl border-2 hover:border-amber-400 transition-colors h-full" style={{ borderColor: '#F5C561' }}>
                    <div className="font-black text-4xl mb-3 leading-none" style={{ color: '#F5C561' }}>{sp.num}</div>
                    <h3 className="font-bold text-base mb-3 group-hover:text-amber-700 transition-colors" style={{ color: '#1a1a1a' }}>{sp.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{sp.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <FadeIn className="mt-16 grid md:grid-cols-2 gap-10 items-center p-8 rounded-2xl" style={{ background: AMBER_LIGHT }}>
              <div>
                <h3 className="font-black text-xl mb-4" style={{ color: AMBER_DARK }}>Mengapa Asam Amino?</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">Amino acids are organic compounds containing an amino group (-NH₂) and carboxyl group (-COOH). Amino acids are the basic components of protein and play an important role in various biological processes.</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {['Meningkatkan kandungan klorofil dan laju fotosintesis', 'Meningkatkan aktivitas mikroba tanah yang menguntungkan, sehingga meningkatkan kesuburan tanah', 'Meningkatkan kualitas dan produktivitas tanaman serta metabolisme tanaman'].map((item) => (
                    <li key={item} className="flex gap-2"><span style={{ color: AMBER }}>✦</span>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{ label: 'Tanaman Padi & Jagung', desc: 'Food Crops' }, { label: 'Sayuran & Buah', desc: 'Vegetables & Fruits' }, { label: 'Tanaman Keras', desc: 'Perennials' }, { label: 'Umbi-umbian', desc: 'Tuber Plants' }, { label: 'Tanaman Hias', desc: 'Ornamental' }, { label: 'Perkebunan', desc: 'Plantation' }].map((c) => (
                  <div key={c.label} className="p-3 rounded-lg text-center" style={{ background: 'white' }}>
                    <p className="font-bold text-xs text-gray-900 mb-0.5">{c.label}</p>
                    <p className="text-[10px] text-gray-400">{c.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── HOW TO USE ── */}
      <section id="howto" className="py-24" style={{ background: '#1a1a1a' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn className="mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: 'rgba(212,137,10,0.2)', color: AMBER }}>Cara Pemakaian</span>
            <h2 className="font-black text-white leading-tight mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>MANDRAGUNA GROW</h2>
            <h3 className="font-bold mb-6" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: AMBER }}>DOSAGE, TIME &amp; HOW TO USE</h3>
            <div className="flex gap-8 mb-10 p-5 rounded-xl inline-flex" style={{ background: 'rgba(212,137,10,0.1)', border: `1px solid ${AMBER}` }}>
              <div>
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Spraying Time</p>
                <p className="text-white font-bold">Morning: 06.00 – 09.00</p>
                <p className="text-white font-bold">Afternoon: 15.00 – 18.00</p>
              </div>
            </div>
          </FadeIn>
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Food Crops', sub: 'Rice & Corn', color: AMBER, items: ['Seeds ready for sowing — soak 8 hours in POC solution 10ml/liter', 'Field plants: 10ml/liter — spray at 7th, 15th, 30th HST (vegetative)', '20ml/liter — spray at 45th & 60th HST (generative)'] },
              { title: 'Tuber Plants', sub: 'Cassava, Potato, etc.', color: '#C07A08', items: ['10ml/liter = vegetative period', '20ml/liter = generative period', 'Double dose when applied around stem and roots', 'Repeat every 10–14 days'] },
              { title: 'Vegetable & Fruit', sub: 'All types', color: AMBER, items: ['5ml/liter = vegetative period', '10ml/liter = generative period', 'Double dose when applied around stem and roots'] },
              { title: 'Perennials', sub: 'Palm, Durian, etc.', color: '#C07A08', items: ['10ml/liter = vegetative period', '20ml/liter = generative period', 'Double dose when applied around stem and roots'] },
            ].map((cat) => (
              <StaggerItem key={cat.title}>
                <div className="rounded-xl overflow-hidden h-full" style={{ background: '#111' }}>
                  <div className="px-6 py-4" style={{ background: cat.color }}>
                    <h3 className="font-black text-white text-base">{cat.title}</h3>
                    <p className="text-white/80 text-xs">{cat.sub}</p>
                  </div>
                  <ul className="p-6 space-y-3">
                    {cat.items.map((item) => (
                      <li key={item} className="text-gray-400 text-xs leading-relaxed flex gap-2"><span style={{ color: AMBER }}>•</span>{item}</li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-10 p-6 rounded-xl" style={{ background: '#111' }}>
            <h4 className="font-bold text-white mb-4">Petunjuk Umum</h4>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-400">
              <p>1. Kocok dahulu sebelum digunakan</p>
              <p>2. Lakukan penyemprotan dengan merata</p>
              <p>3. Waktu penyemprotan ideal: pagi 06.00–09.00, sore 15.00–18.00</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn className="mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: AMBER_LIGHT, color: AMBER }}>Dokumentasi</span>
            <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              BEST PARTNERS <span style={{ color: AMBER }}>FRIENDS</span> OF FARMERS INDONESIA
            </h2>
          </FadeIn>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: IMG.gallery1, caption: 'Pelatihan & Sosialisasi Petani Mandraguna' },
              { img: IMG.gallery2, caption: 'Uji Coba di Lahan Padi — Kabupaten Bone' },
              { img: IMG.gallery3, caption: 'Panen Bawang dengan Mandraguna Grow' },
              { img: IMG.field1, caption: 'Mitra Petani Mandraguna — Hasil Panen Padi' },
              { img: IMG.field2, caption: 'Aplikasi Mandraguna Grow pada Tanaman Jagung' },
              { img: IMG.hero, caption: 'Mandraguna Hadir di Seluruh Indonesia' },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="group relative rounded-xl overflow-hidden" style={{ height: '260px' }}>
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%), url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-bold text-sm">{item.caption}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── LEGAL ── */}
      <section id="legal" className="py-24" style={{ background: '#fafafa' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <FadeIn className="mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: AMBER_LIGHT, color: AMBER }}>Legalitas</span>
            <h2 className="font-black leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>LEGALITAS <span style={{ color: AMBER }}>PERUSAHAAN &amp; PRODUK</span></h2>
            <p className="text-gray-500 max-w-2xl text-sm">PT. Mandraguna Pusaka Indonesia melakukan operasi produksi dengan melalui proses perizinan sesuai perundangan di Indonesia. Kami terus berproses melengkapi dokumen legalitas dari mulai Akta Notariat, pengesahan Kemenkumham, Perizinan Perpajakan hingga legalitas HAKI untuk pengamanan merk nama produk kami semua.</p>
          </FadeIn>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'NIB Perusahaan', sub: 'PT Mandraguna Pusaka Indonesia', detail: 'NIB: 1289000121596', issued: '19 Januari 2021 — Rev. 22 Sep 2022', color: AMBER },
              { title: 'NIB Induk', sub: 'CV Bir Ali Jaya', detail: 'NIB: 0220105850731', issued: '3 Agustus 2020 — Rev. 13 Juni 2023', color: AMBER_DARK },
              { title: 'NPWP Perusahaan', sub: 'PT Mandraguna Pusaka Indonesia', detail: 'NPWP: 96.868.238.5-443.000', issued: 'KPP Pratama Garut', color: AMBER },
              { title: 'Reg. Mandraguna Grow', sub: 'Pupuk Organik Cair', detail: 'No. Reg: 02.02.2022.897', issued: 'Izin Edar Kementrian Pertanian', color: AMBER_DARK },
              { title: 'Reg. Bio-Fat', sub: 'Pupuk Hayati Majemuk Cair', detail: 'No. Reg: 03.02.2023.996', issued: '25 Juli 2023', color: AMBER },
              { title: 'Sertifikat Merek', sub: 'Kementerian Hukum dan HAM', detail: 'IDM000953284', issued: '3 Feb 2021 — berlaku hingga 2031', color: AMBER_DARK },
            ].map((doc) => (
              <StaggerItem key={doc.title}>
                <div className="bg-white p-6 rounded-xl border-l-4 shadow-sm h-full" style={{ borderColor: doc.color }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: AMBER_LIGHT }}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={AMBER}><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{doc.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{doc.sub}</p>
                  <p className="text-sm font-bold" style={{ color: doc.color }}>{doc.detail}</p>
                  <p className="text-xs text-gray-400 mt-1">{doc.issued}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── DECOMMENTATION ── */}
      {(() => {
        const articles = [
          { media: 'Analis News', date: '11 November 2024', title: 'Mandraguna: Terobosan Pupuk Asam Amino Hewani H. Muhamad Rian untuk Pertanian Berkelanjutan', img: IMG.news1, tag: 'JABAR' },
          { media: 'Priangan Insider', date: '26 November 2024', title: 'H. Rian, Pengusaha Muda Visioner dari Garut Mengubah Limbah Menjadi Berkah', img: IMG.news2, tag: 'PRIANGAN' },
          { media: 'Harian Fajar', date: 'Desember 2023', title: 'Kunci Sukses Petani di Bone Bisa Panen Tembus 7,3 Ton Per Hektare', img: IMG.news3, tag: 'BONE' },
        ];
        const prev = () => setActiveArticle((i) => (i - 1 + articles.length) % articles.length);
        const next = () => setActiveArticle((i) => (i + 1) % articles.length);
        const isMobile = winW < 768;
        const activeW = isMobile ? Math.min(winW - 48, 480) : 520;
        const inactiveW = isMobile ? activeW : 300;
        const activeH = isMobile ? 420 : 460;
        const inactiveH = isMobile ? activeH : 380;
        const xStep = isMobile ? activeW + 16 : 360;

        return (
          <section id="decommentation" className="py-24 overflow-hidden" style={{ background: '#111' }}>
            <div className="max-w-[1400px] mx-auto px-6">
              {/* Header row */}
              <FadeIn className="mb-12">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: 'rgba(212,137,10,0.2)', color: AMBER }}>Media Coverage</span>
                    <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>DECOMMENTATION</h2>
                    <p className="text-sm mt-2" style={{ color: AMBER }}>Mandraguna di Mata Media</p>
                  </div>
                  {/* Desktop buttons — right side of header */}
                  <div className="hidden md:flex gap-3">
                    {[{ fn: prev, icon: '←' }, { fn: next, icon: '→' }].map(({ fn, icon }) => (
                      <button
                        key={icon}
                        onClick={fn}
                        className="w-11 h-11 rounded-full border-2 flex items-center justify-center font-bold text-lg"
                        style={{ borderColor: AMBER, color: AMBER }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = AMBER; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = AMBER; }}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Mobile buttons — below subtitle, centered */}
                <div className="md:hidden flex justify-center gap-3 mt-5">
                  {[{ fn: prev, icon: '←' }, { fn: next, icon: '→' }].map(({ fn, icon }) => (
                    <button
                      key={icon}
                      onClick={fn}
                      className="w-11 h-11 rounded-full border-2 flex items-center justify-center font-bold text-lg"
                      style={{ borderColor: AMBER, color: AMBER }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </FadeIn>

              {/* Carousel */}
              <div className="relative flex items-center justify-center" style={{ height: isMobile ? activeH + 20 : 480 }}>
                {articles.map((a, i) => {
                  const offset = i - activeArticle;
                  const isActive = offset === 0;
                  const isVisible = isMobile ? isActive : Math.abs(offset) <= 1;

                  return (
                    <motion.div
                      key={a.title}
                      onClick={() => !isActive && setActiveArticle(i)}
                      layout
                      animate={{
                        x: offset * xStep,
                        scale: isActive ? 1 : 0.8,
                        opacity: isVisible ? (isActive ? 1 : 0.6) : 0,
                        zIndex: isActive ? 10 : 5 - Math.abs(offset),
                        width: isActive ? activeW : inactiveW,
                        height: isActive ? activeH : inactiveH,
                        background: isActive ? AMBER : '#1e1e1e',
                      }}
                      transition={{
                        x: { type: 'spring', stiffness: 220, damping: 28, mass: 0.8 },
                        scale: { type: 'spring', stiffness: 220, damping: 28, mass: 0.8 },
                        opacity: { duration: 0.35, ease: 'easeOut' },
                        width: { type: 'spring', stiffness: 180, damping: 26, mass: 0.9 },
                        height: { type: 'spring', stiffness: 180, damping: 26, mass: 0.9 },
                        background: { duration: 0.4, ease: 'easeInOut' },
                      }}
                      className="absolute rounded-2xl overflow-hidden cursor-pointer"
                      style={{ flexShrink: 0 }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {isActive ? (
                          <motion.div
                            key="active"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                          >
                            <div className="p-8 pb-4">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: 'rgba(0,0,0,0.2)', color: '#fff' }}>{a.tag}</span>
                                <span className="text-xs text-white/70">{a.date}</span>
                              </div>
                              <p className="font-black text-white/90 text-xl mb-1">{a.media}</p>
                              <h3 className="font-bold text-white text-sm leading-snug">{a.title}</h3>
                            </div>
                            <div
                              className="mx-4 rounded-xl"
                              style={{
                                height: '200px',
                                backgroundImage: `url(${a.img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                            />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="inactive"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="p-8 h-full flex flex-col justify-between"
                          >
                            <div>
                              <span className="text-xs font-bold px-2 py-1 rounded mb-4 inline-block" style={{ background: 'rgba(212,137,10,0.2)', color: AMBER }}>{a.tag}</span>
                              <p className="font-black text-white/20 leading-none mb-4" style={{ fontSize: '4rem' }}>{a.media.split(' ')[0]}</p>
                              <p className="font-bold text-white/60 text-sm leading-snug">{a.title}</p>
                            </div>
                            <p className="text-xs" style={{ color: AMBER }}>{a.date}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-10">
                {articles.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveArticle(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: activeArticle === i ? '24px' : '8px',
                      height: '8px',
                      background: activeArticle === i ? AMBER : '#444',
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── CONTACT ── */}
      <section className="py-16" style={{ background: AMBER }}>
        <FadeIn className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="font-black text-white mb-3" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>HUBUNGI KAMI</h2>
          <p className="text-white/90 text-sm mb-8 max-w-xl mx-auto">Bergabunglah bersama ribuan petani Indonesia yang telah merasakan manfaat Mandraguna Grow.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:02622803406" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded text-amber-900 bg-white hover:bg-amber-50 transition-colors">📞 (0262) 2803406</a>
            <a href="mailto:mandragunapusaka2022@gmail.com" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded border-2 border-white text-white hover:bg-white hover:text-amber-700 transition-colors">✉ mandragunapusaka2022@gmail.com</a>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#1a1a1a' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-14">
          {/* Logo */}
          <div className="mb-10">
            <p className="font-black text-2xl mb-1" style={{ color: AMBER }}>MANDRAGUNA</p>
            <p className="text-gray-400 text-sm">PUSAKA INDONESIA</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Alamat</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Kp. Ciherang RT. 01 RW. 07<br />
                Desa/Kelurahan Suci, Kec. Karangpawitan<br />
                Kab. Garut, Provinsi Jawa Barat<br />
                Kode Pos: 44182
              </p>
              <div className="mt-4 space-y-1 text-sm text-gray-400">
                <p>📞 (0262) 2803406</p>
                <p>✉ mandragunapusaka2022@gmail.com</p>
              </div>
              <div className="mt-4 flex gap-3">
                {[
                  { label: 'IG', href: '#' },
                  { label: 'YT', href: '#' },
                  { label: 'FB', href: '#' },
                ].map((s) => (
                  <a key={s.label} href={s.href} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-gray-900" style={{ background: AMBER }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {['Mandraguna Grow', 'Bio-Fat', 'Produk Lainnya'].map((l) => (
                  <li key={l}><a href="#products" className="hover:text-amber-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Navigasi</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {[
                  ['About Us', '#company'],
                  ['Products', '#products'],
                  ['Benefit', '#benefit'],
                  ['How To', '#howto'],
                  ['Galeri', '#gallery'],
                  ['Legal', '#legal'],
                  ['Decommentation', '#decommentation'],
                ].map(([l, h]) => (
                  <li key={l}><a href={h} className="hover:text-amber-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © 2024 PT. Mandraguna Pusaka Indonesia — NIB: 1289000121596
            </p>
            <p className="text-gray-600 text-xs">
              <span style={{ color: AMBER }}>YouTube:</span> Petani Mandraguna &nbsp;|&nbsp;
              <span style={{ color: AMBER }}>Instagram:</span> @ptmandragunaofficial
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
