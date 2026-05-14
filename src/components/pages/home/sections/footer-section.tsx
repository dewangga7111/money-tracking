'use client';

import { NAV_ITEMS } from '../home-constants';
import { FadeIn } from '../home-animations';
import type { FooterData } from '@/types/sections/footer-section';

type Props = { data: FooterData | null };

export function FooterSection({ data }: Props) {
  const contact = data?.contact ?? { headline: 'HUBUNGI KAMI', subheadline: '' };
  const brand = data?.brand ?? { name: 'MANDRAGUNA', sub: 'PUSAKA INDONESIA' };
  const address = data?.address ?? '';
  const phone = data?.phone ?? '';
  const email = data?.email ?? '';
  const socials = data?.socials ?? [];
  const products = data?.products ?? [];
  const copyright = data?.copyright ?? '';
  const youtubeHandle = data?.youtubeHandle ?? '';
  const instagramHandle = data?.instagramHandle ?? '';

  return (
    <>
      {/* Contact band */}
      <section className="py-16 bg-primary">
        <FadeIn className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="font-black text-white mb-3" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>{contact.headline}</h2>
          <p className="text-white/90 text-sm mb-8 max-w-xl mx-auto">{contact.subheadline}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {phone && (
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded text-amber-900 bg-white hover:bg-amber-50 transition-colors">
                📞 {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded border-2 border-white text-white hover:bg-white hover:text-amber-700 transition-colors">
                ✉ {email}
              </a>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1a1a1a' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-14">
          <div className="mb-10">
            <p className="font-black text-2xl mb-1 text-primary">{brand.name}</p>
            <p className="text-gray-400 text-sm">{brand.sub}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Alamat</h4>
              <p className="text-gray-400 text-sm leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{address}</p>
              <div className="mt-4 space-y-1 text-sm text-gray-400">
                {phone && <p>📞 {phone}</p>}
                {email && <p>✉ {email}</p>}
              </div>
              {socials.length > 0 && (
                <div className="mt-4 flex gap-3">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-gray-900 bg-primary">
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {products.length > 0 && (
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Produk</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  {products.map((p) => (
                    <li key={p.label}><a href={p.href} className="hover:text-primary transition-colors">{p.label}</a></li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Navigasi</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {NAV_ITEMS.map(({ label, href }) => (
                  <li key={label}><a href={href} className="hover:text-primary transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">{copyright}</p>
            {(youtubeHandle || instagramHandle) && (
              <p className="text-gray-600 text-xs">
                {youtubeHandle && <><span className="text-primary">YouTube:</span> {youtubeHandle}</>}
                {youtubeHandle && instagramHandle && <>&nbsp;|&nbsp;</>}
                {instagramHandle && <><span className="text-primary">Instagram:</span> {instagramHandle}</>}
              </p>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
