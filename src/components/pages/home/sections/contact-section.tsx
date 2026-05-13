'use client';

import { FadeIn } from '../home-animations';

export function ContactSection() {
  return (
    <section className="py-16 bg-primary">
      <FadeIn className="max-w-[1400px] mx-auto px-6 text-center">
        <h2 className="font-black text-white mb-3" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>HUBUNGI KAMI</h2>
        <p className="text-white/90 text-sm mb-8 max-w-xl mx-auto">Bergabunglah bersama ribuan petani Indonesia yang telah merasakan manfaat Mandraguna Grow.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:02622803406" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded text-amber-900 bg-white hover:bg-amber-50 transition-colors">📞 (0262) 2803406</a>
          <a href="mailto:mandragunapusaka2022@gmail.com" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded border-2 border-white text-white hover:bg-white hover:text-amber-700 transition-colors">✉ mandragunapusaka2022@gmail.com</a>
        </div>
      </FadeIn>
    </section>
  );
}
