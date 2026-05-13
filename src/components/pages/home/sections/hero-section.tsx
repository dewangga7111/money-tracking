'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { HeroData } from '@/types/sections/home-section';

type HeroSectionProps = {
  data: HeroData | null;
};

export function HeroSection({ data }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const scrollY = useMotionValue(0);
  const bgY = useTransform(scrollY, [0, 1], ['0%', '40%']);

  useEffect(() => {
    const update = () => {
      if (!heroRef.current) return;
      const { top, height } = heroRef.current.getBoundingClientRect();
      scrollY.set(Math.max(0, Math.min(1, -top / height)));
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [scrollY]);

  if (!data) return null;
  const d = data;

  return (
    <section ref={heroRef} className="relative overflow-hidden" style={{ height: '100vh', minHeight: '650px' }}>
      <motion.div
        className="absolute inset-0"
        style={{
          y: bgY,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url(${d.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale: 1.2,
        }}
      />
      <motion.div
        className="relative z-10 h-full flex flex-col"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
      >
        <div className="flex-1 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <motion.p
              className="text-sm font-bold uppercase tracking-[0.2em] mb-5 text-primary"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
            >
              {d.subtitle}
            </motion.p>
            <motion.h1
              className="text-white font-black leading-[0.95] mb-8 whitespace-pre-line"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            >
              {d.headline}
            </motion.h1>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
            >
              <a
                href="#products"
                onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded text-white bg-primary"
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
          <motion.div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
