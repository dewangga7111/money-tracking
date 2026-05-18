'use client';

import { useState } from 'react';
import { Modal } from '@heroui/react';
import { FadeIn, Stagger, StaggerItem } from '../home-animations';
import type { LegalData, LegalDoc } from '@/types/sections/legal-section';

const VARIANT_CLASSES = {
  primary: { border: 'border-primary', text: 'text-primary', fill: 'fill-primary', btn: 'text-primary border-primary hover:bg-primary hover:text-white' },
  secondary: { border: 'border-primary-700', text: 'text-primary-700', fill: 'fill-primary-700', btn: 'text-primary-700 border-primary-700 hover:bg-primary-700 hover:text-white' },
};

type Props = { data: LegalData | null };

export function LegalSection({ data }: Props) {
  const [selectedDoc, setSelectedDoc] = useState<LegalDoc | null>(null);

  const badge = data?.badge ?? 'Legalitas';
  const headline = data?.headline ?? 'LEGALITAS';
  const headlineHighlight = data?.headlineHighlight ?? 'PERUSAHAAN & PRODUK';
  const description = data?.description ?? '';
  const docs = data?.docs ?? [];

  return (
    <section id="legal" className="py-24" style={{ background: '#fafafa' }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeIn className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 bg-primary-100 text-primary">{badge}</span>
          <h2 className="font-black leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {headline} <span className="text-primary">{headlineHighlight}</span>
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm">{description}</p>
        </FadeIn>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => {
            const cls = VARIANT_CLASSES[doc.variant] ?? VARIANT_CLASSES.primary;
            return (
              <StaggerItem key={doc.title}>
                <div className={`bg-white p-6 rounded-xl border-l-4 shadow-sm h-full flex flex-col ${cls.border}`}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-primary-100">
                    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${cls.fill}`}>
                      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{doc.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{doc.sub}</p>
                  <p className={`text-sm font-bold ${cls.text}`}>{doc.detail}</p>
                  <p className="text-xs text-gray-400 mt-1 mb-4">{doc.issued}</p>
                  {doc.image && (
                    <button
                      type="button"
                      onClick={() => setSelectedDoc(doc)}
                      className={`mt-auto self-start text-xs font-semibold px-3 py-1.5 rounded border transition-colors ${cls.btn}`}
                    >
                      Lihat Dokumen
                    </button>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      <Modal isOpen={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <Modal.Backdrop isDismissable variant="blur">
          <Modal.Container placement="center">
            <Modal.Dialog className="max-w-2xl w-full">
              <Modal.Header className="font-semibold">
                {selectedDoc?.title}
                <p className="text-xs font-normal text-gray-500 mt-0.5">{selectedDoc?.sub}</p>
              </Modal.Header>
              <Modal.Body>
                {selectedDoc?.image && (
                  <img
                    src={selectedDoc.image}
                    alt={selectedDoc.title}
                    className="w-full rounded-lg object-contain max-h-[70vh]"
                  />
                )}
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </section>
  );
}
