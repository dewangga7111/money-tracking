'use client';

import { useState } from 'react';
import { Button, Card, Spinner } from '@heroui/react';
import { Save, Plus, Trash2 } from 'lucide-react';
import AppTextInput from '@/components/forms/app-text-input';
import AppTextarea from '@/components/forms/app-textarea';
import AppImageUpload from '@/components/forms/app-image-upload';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { uploadImageAction } from '@/actions/upload-action';
import { actionButtons, button, form } from '@/utils/primitives';
import type { AboutData, WasteCard, AdabValue } from '@/types/sections/about-section';
import type { ActionResponse } from '@/types/response';

type Props = {
  initialData: AboutData | null;
  saveAction: (data: AboutData) => Promise<ActionResponse>;
};

type WasteCardState = WasteCard & { file?: File | null };

async function resolveImage(current: string, file?: File | null): Promise<string> {
  if (file) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await uploadImageAction(fd);
    if (!res.success) throw new Error(res.error || 'Upload failed');
    return res.path!;
  }
  return current;
}

export function AboutContent({ initialData, saveAction }: Props) {
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);

  const [intro, setIntro] = useState({
    headline: initialData?.introduction.headline ?? '',
    headlineHighlight: initialData?.introduction.headlineHighlight ?? '',
    paragraph1: initialData?.introduction.paragraph1 ?? '',
    paragraph2: initialData?.introduction.paragraph2 ?? '',
    callout: initialData?.introduction.callout ?? '',
  });

  const [wasteCards, setWasteCards] = useState<WasteCardState[]>(
    initialData?.introduction.wasteCards.map((c) => ({ ...c, file: null })) ?? []
  );

  const [problemItems, setProblemItems] = useState<string[]>(
    initialData?.problems.items ?? []
  );

  const [company, setCompany] = useState({
    name: initialData?.company.name ?? '',
    nameHighlight: initialData?.company.nameHighlight ?? '',
    paragraph1: initialData?.company.paragraph1 ?? '',
    paragraph2: initialData?.company.paragraph2 ?? '',
    vision: initialData?.company.vision ?? '',
  });

  const [missions, setMissions] = useState<string[]>(initialData?.company.missions ?? []);
  const [values, setValues] = useState<AdabValue[]>(initialData?.company.values ?? []);

  const handleSave = () => {
    confirm({
      message: 'Simpan perubahan About Us section?',
      onConfirm: doSave,
    });
  };

  const doSave = async () => {
    setLoading(true);
    try {
      const resolvedCards = await Promise.all(
        wasteCards.map(async (c) => ({
          label: c.label,
          img: await resolveImage(c.img, c.file),
        }))
      );

      const data: AboutData = {
        introduction: { ...intro, wasteCards: resolvedCards },
        problems: { items: problemItems },
        company: { ...company, missions, values },
      };

      const result = await saveAction(data);
      if (result.success) {
        showSuccessToast(result.message || 'About section saved');
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
      {/* Introduction */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Introduction</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            <AppTextInput
              name="headline"
              label="Headline"
              value={intro.headline}
              onChange={(val) => setIntro((p) => ({ ...p, headline: val }))}
            />
            <AppTextInput
              name="headlineHighlight"
              label="Headline Highlight (warna primary)"
              value={intro.headlineHighlight}
              onChange={(val) => setIntro((p) => ({ ...p, headlineHighlight: val }))}
            />
            <AppTextarea
              name="paragraph1"
              label="Paragraf 1"
              value={intro.paragraph1}
              onChange={(val) => setIntro((p) => ({ ...p, paragraph1: val }))}
              minRows={3}
              className="lg:col-span-2"
            />
            <AppTextarea
              name="paragraph2"
              label="Paragraf 2"
              value={intro.paragraph2}
              onChange={(val) => setIntro((p) => ({ ...p, paragraph2: val }))}
              minRows={3}
              className="lg:col-span-2"
            />
            <AppTextarea
              name="callout"
              label="Callout / Highlight Box"
              value={intro.callout}
              onChange={(val) => setIntro((p) => ({ ...p, callout: val }))}
              minRows={2}
              className="lg:col-span-2"
            />
          </div>

          <h4 className="font-semibold text-sm text-gray-700 mt-6 mb-3">Waste Cards</h4>
          <div className="grid lg:grid-cols-2 gap-4">
            {wasteCards.map((card, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-4 flex flex-col gap-3">
                <AppTextInput
                  name={`wasteCard_${i}_label`}
                  label={`Label Card ${i + 1}`}
                  value={card.label}
                  onChange={(val) =>
                    setWasteCards((prev) =>
                      prev.map((c, idx) => (idx === i ? { ...c, label: val } : c))
                    )
                  }
                />
                <AppImageUpload
                  name={`wasteCard_${i}_img`}
                  label={`Foto Card ${i + 1}`}
                  defaultValue={card.img}
                  onValueChange={(val) =>
                    setWasteCards((prev) =>
                      prev.map((c, idx) =>
                        idx === i
                          ? { ...c, file: val instanceof File ? val : null, img: val === null ? '' : c.img }
                          : c
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* Problems */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Problems Bring Blessings</h3>
          <div className="flex flex-col gap-2">
            {problemItems.map((item, i) => (
              <div key={i} className="flex gap-2 items-end">
                <AppTextInput
                  name={`problem_${i}`}
                  label={`Item ${i + 1}`}
                  value={item}
                  onChange={(val) =>
                    setProblemItems((prev) => prev.map((p, idx) => (idx === i ? val : p)))
                  }
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => setProblemItems((prev) => prev.filter((_, idx) => idx !== i))}
                  className="mb-1 p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setProblemItems((prev) => [...prev, ''])}
              className="flex items-center gap-1 text-xs text-primary hover:underline mt-1 w-fit"
            >
              <Plus size={13} /> Tambah item
            </button>
          </div>
        </Card.Content>
      </Card>

      {/* Company */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">About Us — Perusahaan</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            <AppTextInput
              name="companyName"
              label="Nama Perusahaan"
              value={company.name}
              onChange={(val) => setCompany((p) => ({ ...p, name: val }))}
            />
            <AppTextInput
              name="companyNameHighlight"
              label="Nama Highlight (warna primary)"
              value={company.nameHighlight}
              onChange={(val) => setCompany((p) => ({ ...p, nameHighlight: val }))}
            />
            <AppTextarea
              name="companyParagraph1"
              label="Paragraf 1"
              value={company.paragraph1}
              onChange={(val) => setCompany((p) => ({ ...p, paragraph1: val }))}
              minRows={3}
              className="lg:col-span-2"
            />
            <AppTextarea
              name="companyParagraph2"
              label="Paragraf 2"
              value={company.paragraph2}
              onChange={(val) => setCompany((p) => ({ ...p, paragraph2: val }))}
              minRows={3}
              className="lg:col-span-2"
            />
            <AppTextarea
              name="vision"
              label="Visi"
              value={company.vision}
              onChange={(val) => setCompany((p) => ({ ...p, vision: val }))}
              minRows={3}
              className="lg:col-span-2"
            />
          </div>

          <h4 className="font-semibold text-sm text-gray-700 mt-6 mb-3">Misi</h4>
          <div className="flex flex-col gap-2">
            {missions.map((m, i) => (
              <div key={i} className="flex gap-2 items-end">
                <AppTextInput
                  name={`mission_${i}`}
                  label={`Misi ${i + 1}`}
                  value={m}
                  onChange={(val) =>
                    setMissions((prev) => prev.map((x, idx) => (idx === i ? val : x)))
                  }
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => setMissions((prev) => prev.filter((_, idx) => idx !== i))}
                  className="mb-1 p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setMissions((prev) => [...prev, ''])}
              className="flex items-center gap-1 text-xs text-primary hover:underline mt-1 w-fit"
            >
              <Plus size={13} /> Tambah misi
            </button>
          </div>

          <h4 className="font-semibold text-sm text-gray-700 mt-6 mb-3">Nilai-Nilai ADAB</h4>
          <div className="grid lg:grid-cols-2 gap-3">
            {values.map((v, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-4 flex flex-col gap-3">
                <div className="flex gap-2">
                  <AppTextInput
                    name={`value_${i}_letter`}
                    label="Huruf"
                    value={v.letter}
                    onChange={(val) =>
                      setValues((prev) =>
                        prev.map((x, idx) => (idx === i ? { ...x, letter: val } : x))
                      )
                    }
                    className="w-20"
                  />
                  <AppTextInput
                    name={`value_${i}_name`}
                    label="Nama"
                    value={v.name}
                    onChange={(val) =>
                      setValues((prev) =>
                        prev.map((x, idx) => (idx === i ? { ...x, name: val } : x))
                      )
                    }
                    className="flex-1"
                  />
                </div>
                <AppTextarea
                  name={`value_${i}_desc`}
                  label="Deskripsi"
                  value={v.desc}
                  onChange={(val) =>
                    setValues((prev) =>
                      prev.map((x, idx) => (idx === i ? { ...x, desc: val } : x))
                    )
                  }
                  minRows={2}
                />
              </div>
            ))}
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
