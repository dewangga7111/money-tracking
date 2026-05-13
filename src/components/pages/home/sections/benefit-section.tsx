'use client';

import { IMG } from '../home-constants';
import { FadeIn, Stagger, StaggerItem } from '../home-animations';

export function BenefitSection() {
  return (
    <section id="benefit">
      {/* Forest banner */}
      <div className="relative py-16 md:py-24">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${IMG.about})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
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
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary-100 text-primary">Keunggulan Produk</span>
            <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              8 MANDRAGUNA GROW <span className="text-primary">SPECIALTY</span>
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
                <div className="group p-6 rounded-xl border-2 border-primary/40 hover:border-primary transition-colors h-full">
                  <div className="font-black text-4xl mb-3 leading-none text-primary">{sp.num}</div>
                  <h3 className="font-bold text-base mb-3 text-[#1a1a1a] group-hover:text-primary-700 transition-colors">{sp.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{sp.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-16 grid md:grid-cols-2 gap-10 items-center p-8 rounded-2xl bg-primary-100">
            <div>
              <h3 className="font-black text-xl mb-4 text-primary-700">Mengapa Asam Amino?</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">Amino acids are organic compounds containing an amino group (-NH₂) and carboxyl group (-COOH). Amino acids are the basic components of protein and play an important role in various biological processes.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                {['Meningkatkan kandungan klorofil dan laju fotosintesis', 'Meningkatkan aktivitas mikroba tanah yang menguntungkan, sehingga meningkatkan kesuburan tanah', 'Meningkatkan kualitas dan produktivitas tanaman serta metabolisme tanaman'].map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-primary">✦</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Tanaman Padi & Jagung', desc: 'Food Crops' },
                { label: 'Sayuran & Buah', desc: 'Vegetables & Fruits' },
                { label: 'Tanaman Keras', desc: 'Perennials' },
                { label: 'Umbi-umbian', desc: 'Tuber Plants' },
                { label: 'Tanaman Hias', desc: 'Ornamental' },
                { label: 'Perkebunan', desc: 'Plantation' },
              ].map((c) => (
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
