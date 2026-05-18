'use client';

import { FadeIn, Stagger, StaggerItem } from '../home-animations';
import type { HowToData } from '@/types/sections/howto-section';

export function HowToSection({ data }: { data: HowToData | null }) {
  if (!data) return null;

  return (
    <section id="howto" className="py-24" style={{ background: '#1a1a1a' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeIn className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary/20 text-primary">{data.badge}</span>
          <h2 className="font-black text-white leading-tight mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{data.headline}</h2>
          <h3 className="font-bold mb-6 text-primary" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>{data.subheadline}</h3>
          <div className="flex gap-8 mb-10 p-5 rounded-xl inline-flex bg-primary/10 border border-primary">
            <div>
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Spraying Time</p>
              {data.sprayingTimes.map((t) => (
                <p key={t} className="text-white font-bold">{t}</p>
              ))}
            </div>
          </div>
        </FadeIn>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.categories.map((cat) => (
            <StaggerItem key={cat.title}>
              <div className="rounded-xl overflow-hidden h-full" style={{ background: '#111' }}>
                <div className={`px-6 py-4 ${cat.cls}`}>
                  <h3 className="font-black text-white text-base">{cat.title}</h3>
                  <p className="text-white/80 text-xs">{cat.sub}</p>
                </div>
                <ul className="p-6 space-y-3">
                  {cat.items.map((item) => (
                    <li key={item} className="text-gray-400 text-xs leading-relaxed flex gap-2"><span className="text-primary">•</span>{item}</li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn className="mt-10 p-6 rounded-xl" style={{ background: '#111' }}>
          <h4 className="font-bold text-white mb-4">Petunjuk Umum</h4>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-400">
            {data.generalNotes.map((note, i) => (
              <p key={i}>{i + 1}. {note}</p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
