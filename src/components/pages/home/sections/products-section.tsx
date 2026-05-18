'use client';

import { FadeIn, fadeLeft, fadeRight } from '../home-animations';
import type { ProductsData } from '@/types/sections/products-section';

export function ProductsSection({ data }: { data: ProductsData | null }) {
  if (!data) return null;

  return (
    <section id="products" className="py-24 relative" style={{ background: '#1a1a1a' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeIn className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary/20 text-primary">{data.badge}</span>
          <h2 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{data.title}</h2>
          <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">{data.description}</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          {data.products.map((product, i) => (
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
                    {product.kandungan.map((k) => (
                      <div key={k.key} className="flex justify-between text-xs">
                        <span className="text-gray-400">{k.key}</span>
                        <span className={`font-bold ${product.valueCls}`}>{k.value}</span>
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
