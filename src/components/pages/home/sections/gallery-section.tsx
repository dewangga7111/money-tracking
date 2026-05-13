'use client';

import { IMG } from '../home-constants';
import { FadeIn, Stagger, StaggerItem } from '../home-animations';

const GALLERY = [
  { img: IMG.gallery1, caption: 'Pelatihan & Sosialisasi Petani Mandraguna' },
  { img: IMG.gallery2, caption: 'Uji Coba di Lahan Padi — Kabupaten Bone' },
  { img: IMG.gallery3, caption: 'Panen Bawang dengan Mandraguna Grow' },
  { img: IMG.field1, caption: 'Mitra Petani Mandraguna — Hasil Panen Padi' },
  { img: IMG.field2, caption: 'Aplikasi Mandraguna Grow pada Tanaman Jagung' },
  { img: IMG.hero, caption: 'Mandraguna Hadir di Seluruh Indonesia' },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeIn className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary-100 text-primary">Dokumentasi</span>
          <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            BEST PARTNERS <span className="text-primary">FRIENDS</span> OF FARMERS INDONESIA
          </h2>
        </FadeIn>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY.map((item, i) => (
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
