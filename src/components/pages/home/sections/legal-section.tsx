'use client';

import { FadeIn, Stagger, StaggerItem } from '../home-animations';

const DOCS = [
  { title: 'NIB Perusahaan', sub: 'PT Mandraguna Pusaka Indonesia', detail: 'NIB: 1289000121596', issued: '19 Januari 2021 — Rev. 22 Sep 2022', borderCls: 'border-primary', textCls: 'text-primary', fillCls: 'fill-primary' },
  { title: 'NIB Induk', sub: 'CV Bir Ali Jaya', detail: 'NIB: 0220105850731', issued: '3 Agustus 2020 — Rev. 13 Juni 2023', borderCls: 'border-primary-700', textCls: 'text-primary-700', fillCls: 'fill-primary-700' },
  { title: 'NPWP Perusahaan', sub: 'PT Mandraguna Pusaka Indonesia', detail: 'NPWP: 96.868.238.5-443.000', issued: 'KPP Pratama Garut', borderCls: 'border-primary', textCls: 'text-primary', fillCls: 'fill-primary' },
  { title: 'Reg. Mandraguna Grow', sub: 'Pupuk Organik Cair', detail: 'No. Reg: 02.02.2022.897', issued: 'Izin Edar Kementrian Pertanian', borderCls: 'border-primary-700', textCls: 'text-primary-700', fillCls: 'fill-primary-700' },
  { title: 'Reg. Bio-Fat', sub: 'Pupuk Hayati Majemuk Cair', detail: 'No. Reg: 03.02.2023.996', issued: '25 Juli 2023', borderCls: 'border-primary', textCls: 'text-primary', fillCls: 'fill-primary' },
  { title: 'Sertifikat Merek', sub: 'Kementerian Hukum dan HAM', detail: 'IDM000953284', issued: '3 Feb 2021 — berlaku hingga 2031', borderCls: 'border-primary-700', textCls: 'text-primary-700', fillCls: 'fill-primary-700' },
];

export function LegalSection() {
  return (
    <section id="legal" className="py-24" style={{ background: '#fafafa' }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeIn className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary-100 text-primary">Legalitas</span>
          <h2 className="font-black leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>LEGALITAS <span className="text-primary">PERUSAHAAN &amp; PRODUK</span></h2>
          <p className="text-gray-500 max-w-2xl text-sm">PT. Mandraguna Pusaka Indonesia melakukan operasi produksi dengan melalui proses perizinan sesuai perundangan di Indonesia. Kami terus berproses melengkapi dokumen legalitas dari mulai Akta Notariat, pengesahan Kemenkumham, Perizinan Perpajakan hingga legalitas HAKI untuk pengamanan merk nama produk kami semua.</p>
        </FadeIn>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCS.map((doc) => (
            <StaggerItem key={doc.title}>
              <div className={`bg-white p-6 rounded-xl border-l-4 shadow-sm h-full ${doc.borderCls}`}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-primary-100">
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 ${doc.fillCls}`}>
                    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{doc.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{doc.sub}</p>
                <p className={`text-sm font-bold ${doc.textCls}`}>{doc.detail}</p>
                <p className="text-xs text-gray-400 mt-1">{doc.issued}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
