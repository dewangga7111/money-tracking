'use client';

import { FadeIn, Stagger, StaggerItem } from '../home-animations';

const CATEGORIES = [
  { title: 'Food Crops', sub: 'Rice & Corn', cls: 'bg-primary', items: ['Seeds ready for sowing — soak 8 hours in POC solution 10ml/liter', 'Field plants: 10ml/liter — spray at 7th, 15th, 30th HST (vegetative)', '20ml/liter — spray at 45th & 60th HST (generative)'] },
  { title: 'Tuber Plants', sub: 'Cassava, Potato, etc.', cls: 'bg-primary-700', items: ['10ml/liter = vegetative period', '20ml/liter = generative period', 'Double dose when applied around stem and roots', 'Repeat every 10–14 days'] },
  { title: 'Vegetable & Fruit', sub: 'All types', cls: 'bg-primary', items: ['5ml/liter = vegetative period', '10ml/liter = generative period', 'Double dose when applied around stem and roots'] },
  { title: 'Perennials', sub: 'Palm, Durian, etc.', cls: 'bg-primary-700', items: ['10ml/liter = vegetative period', '20ml/liter = generative period', 'Double dose when applied around stem and roots'] },
];

export function HowToSection() {
  return (
    <section id="howto" className="py-24" style={{ background: '#1a1a1a' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeIn className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary/20 text-primary">Cara Pemakaian</span>
          <h2 className="font-black text-white leading-tight mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>MANDRAGUNA GROW</h2>
          <h3 className="font-bold mb-6 text-primary" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>DOSAGE, TIME &amp; HOW TO USE</h3>
          <div className="flex gap-8 mb-10 p-5 rounded-xl inline-flex bg-primary/10 border border-primary">
            <div>
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Spraying Time</p>
              <p className="text-white font-bold">Morning: 06.00 – 09.00</p>
              <p className="text-white font-bold">Afternoon: 15.00 – 18.00</p>
            </div>
          </div>
        </FadeIn>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
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
            <p>1. Kocok dahulu sebelum digunakan</p>
            <p>2. Lakukan penyemprotan dengan merata</p>
            <p>3. Waktu penyemprotan ideal: pagi 06.00–09.00, sore 15.00–18.00</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
