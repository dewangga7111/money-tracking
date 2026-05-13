'use client';

import { FadeIn, Stagger, StaggerItem, fadeLeft, fadeRight } from '../home-animations';
import type { AboutData } from '@/types/sections/about-section';

export function AboutSection({ data }: { data: AboutData | null }) {
  if (!data) return null;

  const { introduction, problems, company } = data;

  return (
    <section id="company" className="bg-white">
      {/* Introduction */}
      <div className="py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <FadeIn variants={fadeLeft}>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary-100 text-primary">{introduction.badge}</span>
              <h2 className="font-black leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                {introduction.headline}<br /><span className="text-primary">{introduction.headlineHighlight}</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">{introduction.paragraph1}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{introduction.paragraph2}</p>
              <div className="p-5 rounded-lg bg-primary-100 border-l-4 border-primary">
                <p className="font-bold text-sm text-primary-700">{introduction.callout}</p>
              </div>
            </FadeIn>
            <Stagger className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
              {introduction.wasteCards.map((item) => (
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
              <span className="text-primary">{problems.titleHighlight}</span> {problems.titleNormal}
            </h2>
          </FadeIn>
          <Stagger className="grid gap-3">
            {problems.items.map((item, i) => (
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
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary-100 text-primary">{company.badge}</span>
              <h2 className="font-black leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                {company.name}<br /><span className="text-primary">{company.nameHighlight}</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{company.paragraph1}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{company.paragraph2}</p>
              <div className="mb-6 p-5 rounded-lg bg-primary-100">
                <h3 className="font-black text-sm uppercase tracking-wider mb-3 text-primary-700">Visi</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{company.vision}</p>
              </div>
            </FadeIn>
            <FadeIn variants={fadeRight}>
              <div className="mb-6">
                <h3 className="font-black text-sm uppercase tracking-wider mb-4 text-primary-700">Misi</h3>
                <ul className="space-y-2.5">
                  {company.missions.map((m) => (
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
                  {company.values.map((v) => (
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
