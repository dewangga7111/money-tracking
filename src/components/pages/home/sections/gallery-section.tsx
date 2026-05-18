'use client';

import { FadeIn, Stagger, StaggerItem } from '../home-animations';
import type { GalleryData } from '@/types/sections/gallery-section';

export function GallerySection({ data }: { data: GalleryData | null }) {
  if (!data) return null;

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeIn className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary-100 text-primary">{data.badge}</span>
          <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {data.headline} <span className="text-primary">{data.headlineHighlight}</span>
          </h2>
        </FadeIn>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="group relative rounded-xl overflow-hidden" style={{ height: '260px' }}>
                <div
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%), url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-bold text-sm">{item.caption}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
