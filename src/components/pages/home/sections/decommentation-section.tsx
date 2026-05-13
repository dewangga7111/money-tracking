'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { IMG } from '../home-constants';
import { FadeIn } from '../home-animations';

const ARTICLES = [
  { media: 'Analis News', date: '11 November 2024', title: 'Mandraguna: Terobosan Pupuk Asam Amino Hewani H. Muhamad Rian untuk Pertanian Berkelanjutan', img: IMG.news1, tag: 'JABAR' },
  { media: 'Priangan Insider', date: '26 November 2024', title: 'H. Rian, Pengusaha Muda Visioner dari Garut Mengubah Limbah Menjadi Berkah', img: IMG.news2, tag: 'PRIANGAN' },
  { media: 'Harian Fajar', date: 'Desember 2023', title: 'Kunci Sukses Petani di Bone Bisa Panen Tembus 7,3 Ton Per Hektare', img: IMG.news3, tag: 'BONE' },
];

type DecommentationSectionProps = {
  activeArticle: number;
  setActiveArticle: (i: number) => void;
  winW: number;
};

export function DecommentationSection({ activeArticle, setActiveArticle, winW }: DecommentationSectionProps) {
  const prev = () => setActiveArticle((activeArticle - 1 + ARTICLES.length) % ARTICLES.length);
  const next = () => setActiveArticle((activeArticle + 1) % ARTICLES.length);

  const isMobile = winW < 768;
  const activeW = isMobile ? Math.min(winW - 48, 480) : 520;
  const inactiveW = isMobile ? activeW : 300;
  const activeH = isMobile ? 420 : 460;
  const inactiveH = isMobile ? activeH : 380;
  const xStep = isMobile ? activeW + 16 : 360;

  return (
    <section id="decommentation" className="py-24 overflow-hidden" style={{ background: '#111' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <FadeIn className="mb-12">
          <div className="flex items-end justify-between">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary/20 text-primary">Media Coverage</span>
              <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>DECOMMENTATION</h2>
              <p className="text-sm mt-2 text-primary">Mandraguna di Mata Media</p>
            </div>
            <div className="hidden md:flex gap-3">
              {[{ fn: prev, icon: '←' }, { fn: next, icon: '→' }].map(({ fn, icon }) => (
                <button
                  key={icon}
                  onClick={fn}
                  className="w-11 h-11 rounded-full border-2 border-primary text-primary flex items-center justify-center font-bold text-lg hover:bg-primary hover:text-white transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <div className="md:hidden flex justify-center gap-3 mt-5">
            {[{ fn: prev, icon: '←' }, { fn: next, icon: '→' }].map(({ fn, icon }) => (
              <button
                key={icon}
                onClick={fn}
                className="w-11 h-11 rounded-full border-2 border-primary text-primary flex items-center justify-center font-bold text-lg"
              >
                {icon}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Carousel */}
        <div className="relative flex items-center justify-center" style={{ height: isMobile ? activeH + 20 : 480 }}>
          {ARTICLES.map((a, i) => {
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
                  background: isActive ? 'rgb(212, 137, 10)' : '#1e1e1e',
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
                        style={{ height: '200px', backgroundImage: `url(${a.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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
                        <span className="text-xs font-bold px-2 py-1 rounded mb-4 inline-block bg-primary/20 text-primary">{a.tag}</span>
                        <p className="font-black text-white/20 leading-none mb-4" style={{ fontSize: '4rem' }}>{a.media.split(' ')[0]}</p>
                        <p className="font-bold text-white/60 text-sm leading-snug">{a.title}</p>
                      </div>
                      <p className="text-xs text-primary">{a.date}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {ARTICLES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveArticle(i)}
              className={`rounded-full transition-all ${activeArticle === i ? 'bg-primary' : 'bg-[#444]'}`}
              style={{ width: activeArticle === i ? '24px' : '8px', height: '8px' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
