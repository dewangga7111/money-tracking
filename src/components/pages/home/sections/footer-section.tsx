'use client';

import { NAV_ITEMS } from '../home-constants';

export function FooterSection() {
  return (
    <footer style={{ background: '#1a1a1a' }}>
      <div className="max-w-[1400px] mx-auto px-6 py-14">
        <div className="mb-10">
          <p className="font-black text-2xl mb-1 text-primary">MANDRAGUNA</p>
          <p className="text-gray-400 text-sm">PUSAKA INDONESIA</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Alamat</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Kp. Ciherang RT. 01 RW. 07<br />
              Desa/Kelurahan Suci, Kec. Karangpawitan<br />
              Kab. Garut, Provinsi Jawa Barat<br />
              Kode Pos: 44182
            </p>
            <div className="mt-4 space-y-1 text-sm text-gray-400">
              <p>📞 (0262) 2803406</p>
              <p>✉ mandragunapusaka2022@gmail.com</p>
            </div>
            <div className="mt-4 flex gap-3">
              {[{ label: 'IG', href: '#' }, { label: 'YT', href: '#' }, { label: 'FB', href: '#' }].map((s) => (
                <a key={s.label} href={s.href} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-gray-900 bg-primary">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Produk</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['Mandraguna Grow', 'Bio-Fat', 'Produk Lainnya'].map((l) => (
                <li key={l}><a href="#products" className="hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

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
          <p className="text-gray-500 text-xs">© 2024 PT. Mandraguna Pusaka Indonesia — NIB: 1289000121596</p>
          <p className="text-gray-600 text-xs">
            <span className="text-primary">YouTube:</span> Petani Mandraguna &nbsp;|&nbsp;
            <span className="text-primary">Instagram:</span> @ptmandragunaofficial
          </p>
        </div>
      </div>
    </footer>
  );
}
