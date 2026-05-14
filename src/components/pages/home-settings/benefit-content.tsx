'use client';

import { useState } from 'react';
import { Button, Card, Spinner } from '@heroui/react';
import { Save, Plus, Trash2 } from 'lucide-react';
import AppTextInput from '@/components/forms/app-text-input';
import AppTextarea from '@/components/forms/app-textarea';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { actionButtons, button, form } from '@/utils/primitives';
import type { BenefitData, CardInfo } from '@/types/sections/benefit-section';
import type { ActionResponse } from '@/types/response';

type Props = {
  initialData: BenefitData | null;
  saveAction: (data: BenefitData) => Promise<ActionResponse>;
};

export function BenefitContent({ initialData, saveAction }: Props) {
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);

  const [banner, setBanner] = useState({
    quote: initialData?.quote ?? '',
    quoteDesc: initialData?.quoteDesc ?? '',
  });

  const [specialty, setSpecialty] = useState({
    badge: initialData?.badge ?? '',
    headline: initialData?.headline ?? '',
    headlineHighlight: initialData?.headlineHighlight ?? '',
  });

  const [specialtyCards, setSpecialtyCards] = useState<CardInfo[]>(
    initialData?.specialtyCards ?? []
  );

  const [info, setInfo] = useState({
    title: initialData?.info.title ?? '',
    desc: initialData?.info.desc ?? '',
  });

  const [benefits, setBenefits] = useState<string[]>(initialData?.info.benefits ?? []);

  const [typeCards, setTypeCards] = useState<CardInfo[]>(initialData?.info.type ?? []);

  const updateCard = (list: CardInfo[], setList: (v: CardInfo[]) => void, i: number, patch: Partial<CardInfo>) =>
    setList(list.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));

  const handleSave = () => {
    confirm({
      message: 'Simpan perubahan Benefit section?',
      onConfirm: doSave,
    });
  };

  const doSave = async () => {
    setLoading(true);
    try {
      const data: BenefitData = {
        ...banner,
        ...specialty,
        specialtyCards,
        info: { ...info, benefits, type: typeCards },
      };
      const result = await saveAction(data);
      if (result.success) {
        showSuccessToast(result.message || 'Benefit section saved');
      } else {
        showErrorToast(result.error || 'Failed to save');
      }
    } catch (e: any) {
      showErrorToast(e?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={form()}>
      {/* Banner */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Banner</h3>
          <div className="flex flex-col gap-4">
            <AppTextInput
              name="quote"
              label="Quote / Judul Besar"
              value={banner.quote}
              onChange={(val) => setBanner((p) => ({ ...p, quote: val }))}
            />
            <AppTextarea
              name="quoteDesc"
              label="Deskripsi"
              value={banner.quoteDesc}
              onChange={(val) => setBanner((p) => ({ ...p, quoteDesc: val }))}
              minRows={3}
            />
          </div>
        </Card.Content>
      </Card>

      {/* Specialty Header */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Specialty — Header</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            <AppTextInput
              name="badge"
              label="Badge"
              value={specialty.badge}
              onChange={(val) => setSpecialty((p) => ({ ...p, badge: val }))}
              className="lg:col-span-2"
            />
            <AppTextInput
              name="headline"
              label="Headline (putih)"
              value={specialty.headline}
              onChange={(val) => setSpecialty((p) => ({ ...p, headline: val }))}
            />
            <AppTextInput
              name="headlineHighlight"
              label="Headline Highlight (warna primary)"
              value={specialty.headlineHighlight}
              onChange={(val) => setSpecialty((p) => ({ ...p, headlineHighlight: val }))}
            />
          </div>

          <h4 className="font-semibold text-sm text-gray-700 mt-6 mb-3">Specialty Cards</h4>
          <div className="grid lg:grid-cols-2 gap-3">
            {specialtyCards.map((card, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">{String(i + 1).padStart(2, '0')}</span>
                  <button
                    type="button"
                    onClick={() => setSpecialtyCards((prev) => prev.filter((_, idx) => idx !== i))}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <AppTextInput
                  name={`sp_${i}_label`}
                  label="Judul"
                  value={card.label}
                  onChange={(val) => updateCard(specialtyCards, setSpecialtyCards, i, { label: val })}
                />
                <AppTextarea
                  name={`sp_${i}_desc`}
                  label="Deskripsi"
                  value={card.desc}
                  onChange={(val) => updateCard(specialtyCards, setSpecialtyCards, i, { desc: val })}
                  minRows={2}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSpecialtyCards((prev) => [...prev, { label: '', desc: '' }])}
            className="flex items-center gap-1 text-xs text-primary hover:underline mt-3 w-fit"
          >
            <Plus size={13} /> Tambah card
          </button>
        </Card.Content>
      </Card>

      {/* Info Section */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Info Section</h3>
          <div className="flex flex-col gap-4">
            <AppTextInput
              name="infoTitle"
              label="Judul"
              value={info.title}
              onChange={(val) => setInfo((p) => ({ ...p, title: val }))}
            />
            <AppTextarea
              name="infoDesc"
              label="Deskripsi"
              value={info.desc}
              onChange={(val) => setInfo((p) => ({ ...p, desc: val }))}
              minRows={3}
            />
          </div>

          <h4 className="font-semibold text-sm text-gray-700 mt-5 mb-3">Benefits (bullet points)</h4>
          <div className="flex flex-col gap-2">
            {benefits.map((item, i) => (
              <div key={i} className="flex gap-2 items-end">
                <AppTextInput
                  name={`benefit_${i}`}
                  label={`Item ${i + 1}`}
                  value={item}
                  onChange={(val) => setBenefits((prev) => prev.map((b, idx) => (idx === i ? val : b)))}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => setBenefits((prev) => prev.filter((_, idx) => idx !== i))}
                  className="mb-1 p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setBenefits((prev) => [...prev, ''])}
              className="flex items-center gap-1 text-xs text-primary hover:underline mt-1 w-fit"
            >
              <Plus size={13} /> Tambah item
            </button>
          </div>

          <h4 className="font-semibold text-sm text-gray-700 mt-5 mb-3">Tipe Tanaman</h4>
          <div className="grid lg:grid-cols-2 gap-3">
            {typeCards.map((card, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-3 flex gap-2 items-end">
                <AppTextInput
                  name={`type_${i}_label`}
                  label="Nama"
                  value={card.label}
                  onChange={(val) => updateCard(typeCards, setTypeCards, i, { label: val })}
                  className="flex-1"
                />
                <AppTextInput
                  name={`type_${i}_desc`}
                  label="Subtitle"
                  value={card.desc}
                  onChange={(val) => updateCard(typeCards, setTypeCards, i, { desc: val })}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => setTypeCards((prev) => prev.filter((_, idx) => idx !== i))}
                  className="mb-1 p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setTypeCards((prev) => [...prev, { label: '', desc: '' }])}
              className="flex items-center gap-1 text-xs text-primary hover:underline mt-1 w-fit lg:col-span-2"
            >
              <Plus size={13} /> Tambah tipe
            </button>
          </div>
        </Card.Content>
      </Card>

      <div className={actionButtons()}>
        <Button
          type="button"
          variant="primary"
          className={button()}
          isDisabled={loading}
          onClick={handleSave}
        >
          <span className="flex items-center gap-2">
            {loading ? <Spinner size="sm" /> : <Save size={15} />}Save
          </span>
        </Button>
      </div>
    </div>
  );
}
