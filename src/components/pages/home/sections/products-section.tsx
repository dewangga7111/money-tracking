'use client';

import { IMG } from '../home-constants';
import { FadeIn, fadeLeft, fadeRight } from '../home-animations';

const PRODUCTS = [
  {
    image: IMG.grow1,
    name: 'MANDRAGUNA GROW',
    subtitle: 'Pupuk Organik Cair • Nutrisi Asam Amino',
    badge: { label: '1 LITER', cls: 'bg-primary text-white' },
    desc: 'Pupuk Asam Amino Yang Di Hasilkan Dari Lemak Hewani. Kaya Akan Protein Sehingga Dapat Menutrisi Tanaman Dengan Maksimal Dan Juga Meningkatkan Imunitas Tanaman Sehingga Rentan Terhadap Hama Dan Penyakit.',
    kandungan: [
      ['C-Organik', '15,58%'],
      ['N+P₂O₅+K₂O', '2,90%'],
      ['N-Organik', '0,54%'],
      ['pH', '4,4'],
      ['Cu-total', '32,7 ppm'],
      ['Zn-total', '27,2 ppm'],
    ] as [string, string][],
    valueCls: 'text-primary',
    reg: 'No. Reg: 02.02.2022.897 — PT. MANDRAGUNA PUSAKA INDONESIA',
  },
  {
    image: IMG.grow2,
    name: 'BIO-FAT',
    subtitle: 'Pupuk Hayati Cair • Majemuk',
    badge: { label: 'HAYATI', cls: 'bg-[#2d5a1b] text-[#7ed952]' },
    desc: 'Pupuk Hayati Cair dari CV. Bir Ali Jaya yang mengandung mikroba bermanfaat untuk meningkatkan kesuburan tanah dan mendukung pertumbuhan tanaman secara alami dan berkelanjutan.',
    kandungan: [
      ['Bacillus sp.', '4,38 × 10⁸ CFU/ml'],
      ['Pseudomonas sp.', '3,88 × 10⁸ CFU/ml'],
      ['Actinomycetes sp.', '5,08 × 10⁶ CFU/ml'],
      ['Trichoderma sp.', '1,20 × 10⁸ CFU/ml'],
    ] as [string, string][],
    valueCls: 'text-[#7ed952]',
    reg: 'No. Reg: 03.02.2023.996 — CV. BIR ALI JAYA',
  },
];

export function ProductsSection() {
  return (
    <section id="products" className="py-24 relative" style={{ background: '#1a1a1a' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeIn className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary/20 text-primary">Produk Kami</span>
          <h2 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>PRODUK UNGGULAN</h2>
          <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">PT Mandraguna Pusaka Indonesia menghadirkan produk unggulan di pasaran dengan berbagai macam varian produk sesuai segmentasi pasar yang dibutuhkan, dari mulai produk tanaman bahan pokok berupa padi, dan juga buah dan sayuran hingga untuk produk tanaman hias.</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCTS.map((product, i) => (
            <FadeIn key={product.name} variants={i === 0 ? fadeLeft : fadeRight}>
              <div className="rounded-xl overflow-hidden h-full flex flex-col" style={{ background: '#111' }}>
                <div className="h-56 shrink-0" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%), url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-black text-2xl text-white mb-1">{product.name}</h3>
                      <p className={`text-sm ${product.valueCls}`}>{product.subtitle}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${product.badge.cls}`}>{product.badge.label}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{product.desc}</p>
                  <div className="space-y-3 mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Kandungan</p>
                    {product.kandungan.map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-gray-400">{k}</span>
                        <span className={`font-bold ${product.valueCls}`}>{v}</span>
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
  );
}
