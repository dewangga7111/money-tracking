'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { IMG } from '../home-constants';
import { FadeIn, Stagger, StaggerItem } from '../home-animations';
import type { BenefitData } from '@/types/sections/benefit-section';

export function BenefitSection({ data }: { data: BenefitData | null }) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const bgY = useTransform(scrollY, [0, 1], ['-20%', '20%']);

  useEffect(() => {
    const update = () => {
      if (!bannerRef.current) return;
      const { top, height } = bannerRef.current.getBoundingClientRect();
      const progress = (window.innerHeight - top) / (window.innerHeight + height);
      scrollY.set(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [scrollY]);

  if (!data) return null;

  return (
    <section id="benefit">
      {/* Forest banner */}
      <div ref={bannerRef} className="relative py-16 md:py-24 overflow-hidden">
        <motion.div
          className="absolute inset-0 scale-125"
          style={{ backgroundImage: `url(${IMG.about})`, backgroundSize: 'cover', backgroundPosition: 'center', y: bgY }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
        <FadeIn className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
          <h2 className="text-white font-black leading-tight mb-6 whitespace-nowrap" style={{ fontSize: 'clamp(2rem, 6vw, 6rem)' }}>
            {data.quote}
          </h2>
          <p className="text-white/85 leading-[1.9]" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}>
            {data.quoteDesc}
          </p>
        </FadeIn>
      </div>

      {/* Specialty */}
      <div className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary-100 text-primary">{data.badge}</span>
            <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {data.headline} <span className="text-primary">{data.headlineHighlight}</span>
            </h2>
          </FadeIn>
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.specialtyCards.map((sp, i) => (
              <StaggerItem key={sp.label}>
                <div className="group p-6 rounded-xl border-2 border-primary/40 hover:border-primary transition-colors h-full">
                  <div className="font-black text-4xl mb-3 leading-none text-primary">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-bold text-base mb-3 text-[#1a1a1a] group-hover:text-primary-700 transition-colors">{sp.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{sp.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-16 grid md:grid-cols-2 gap-10 items-center p-8 rounded-2xl bg-primary-100">
            <div>
              <h3 className="font-black text-xl mb-4 text-primary-700">{data.info.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{data.info.desc}</p>
              <ul className="space-y-2 text-sm text-gray-700">
                {data.info.benefits.map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-primary">✦</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {data.info.type.map((c) => (
                <div key={c.label} className="p-3 rounded-lg text-center bg-white">
                  <p className="font-bold text-xs text-gray-900 mb-0.5">{c.label}</p>
                  <p className="text-[10px] text-gray-400">{c.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
