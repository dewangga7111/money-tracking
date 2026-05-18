'use client';

import { useState } from 'react';
import { Button, Card, Spinner } from '@heroui/react';
import { Save, Plus, Trash2 } from 'lucide-react';
import AppTextInput from '@/components/forms/app-text-input';
import AppTextarea from '@/components/forms/app-textarea';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { actionButtons, button, form } from '@/utils/primitives';
import type { HowToData, HowToCategory } from '@/types/sections/howto-section';
import type { ActionResponse } from '@/types/response';

type Props = {
  initialData: HowToData | null;
  saveAction: (data: HowToData) => Promise<ActionResponse>;
};

export function HowToContent({ initialData, saveAction }: Props) {
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);

  const [header, setHeader] = useState({
    badge: initialData?.badge ?? '',
    headline: initialData?.headline ?? '',
    subheadline: initialData?.subheadline ?? '',
  });

  const [sprayingTimes, setSprayingTimes] = useState<string[]>(initialData?.sprayingTimes ?? []);

  const [categories, setCategories] = useState<HowToCategory[]>(initialData?.categories ?? []);

  const [generalNotes, setGeneralNotes] = useState<string[]>(initialData?.generalNotes ?? []);

  const updateCategory = (i: number, patch: Partial<HowToCategory>) =>
    setCategories((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));

  const updateCategoryItem = (ci: number, ii: number, val: string) =>
    setCategories((prev) =>
      prev.map((c, idx) =>
        idx === ci ? { ...c, items: c.items.map((item, iii) => (iii === ii ? val : item)) } : c
      )
    );

  const handleSave = () => {
    confirm({
      message: 'Simpan perubahan How To section?',
      onConfirm: doSave,
    });
  };

  const doSave = async () => {
    setLoading(true);
    try {
      const data: HowToData = { ...header, sprayingTimes, categories, generalNotes };
      const result = await saveAction(data);
      if (result.success) {
        showSuccessToast(result.message || 'How To section saved');
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
      {/* Header */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-4">Header</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            <AppTextInput
              name="badge"
              label="Badge"
              value={header.badge}
              onChange={(val) => setHeader((p) => ({ ...p, badge: val }))}
              className="lg:col-span-2"
            />
            <AppTextInput
              name="headline"
              label="Headline"
              value={header.headline}
              onChange={(val) => setHeader((p) => ({ ...p, headline: val }))}
            />
            <AppTextInput
              name="subheadline"
              label="Subheadline (warna primary)"
              value={header.subheadline}
              onChange={(val) => setHeader((p) => ({ ...p, subheadline: val }))}
            />
          </div>

          <h4 className="font-semibold text-sm text-gray-700 mt-5 mb-3">Spraying Time</h4>
          <div className="flex flex-col gap-2">
            {sprayingTimes.map((t, i) => (
              <div key={i} className="flex gap-2 items-end">
                <AppTextInput
                  name={`spray_${i}`}
                  label={`Waktu ${i + 1}`}
                  value={t}
                  onChange={(val) => setSprayingTimes((prev) => prev.map((x, idx) => (idx === i ? val : x)))}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => setSprayingTimes((prev) => prev.filter((_, idx) => idx !== i))}
                  className="mb-1 p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSprayingTimes((prev) => [...prev, ''])}
              className="flex items-center gap-1 text-xs text-primary hover:underline mt-1 w-fit"
            >
              <Plus size={13} /> Tambah waktu
            </button>
          </div>
        </Card.Content>
      </Card>

      {/* Categories */}
      {categories.map((cat, ci) => (
        <Card key={ci}>
          <Card.Content>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-gray-700">Kategori {ci + 1}</h3>
              <button
                type="button"
                onClick={() => setCategories((prev) => prev.filter((_, idx) => idx !== ci))}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 mb-4">
              <AppTextInput
                name={`cat_${ci}_title`}
                label="Judul"
                value={cat.title}
                onChange={(val) => updateCategory(ci, { title: val })}
              />
              <AppTextInput
                name={`cat_${ci}_sub`}
                label="Subtitle"
                value={cat.sub}
                onChange={(val) => updateCategory(ci, { sub: val })}
              />
              <AppTextInput
                name={`cat_${ci}_cls`}
                label="Header Color Class (Tailwind)"
                value={cat.cls}
                onChange={(val) => updateCategory(ci, { cls: val })}
                className="lg:col-span-2"
              />
            </div>
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Items</h4>
            <div className="flex flex-col gap-2">
              {cat.items.map((item, ii) => (
                <div key={ii} className="flex gap-2 items-end">
                  <AppTextarea
                    name={`cat_${ci}_item_${ii}`}
                    label={`Item ${ii + 1}`}
                    value={item}
                    onChange={(val) => updateCategoryItem(ci, ii, val)}
                    minRows={1}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setCategories((prev) =>
                        prev.map((c, idx) =>
                          idx === ci ? { ...c, items: c.items.filter((_, iii) => iii !== ii) } : c
                        )
                      )
                    }
                    className="mb-1 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setCategories((prev) =>
                    prev.map((c, idx) => (idx === ci ? { ...c, items: [...c.items, ''] } : c))
                  )
                }
                className="flex items-center gap-1 text-xs text-primary hover:underline mt-1 w-fit"
              >
                <Plus size={13} /> Tambah item
              </button>
            </div>
          </Card.Content>
        </Card>
      ))}

      <button
        type="button"
        onClick={() => setCategories((prev) => [...prev, { title: '', sub: '', cls: 'bg-primary', items: [] }])}
        className="flex items-center gap-2 text-sm text-primary hover:underline w-fit"
      >
        <Plus size={15} /> Tambah kategori
      </button>

      {/* General Notes */}
      <Card>
        <Card.Content>
          <h3 className="font-semibold text-sm text-gray-700 mb-3">Petunjuk Umum</h3>
          <div className="flex flex-col gap-2">
            {generalNotes.map((note, i) => (
              <div key={i} className="flex gap-2 items-end">
                <AppTextInput
                  name={`note_${i}`}
                  label={`Petunjuk ${i + 1}`}
                  value={note}
                  onChange={(val) => setGeneralNotes((prev) => prev.map((n, idx) => (idx === i ? val : n)))}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => setGeneralNotes((prev) => prev.filter((_, idx) => idx !== i))}
                  className="mb-1 p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setGeneralNotes((prev) => [...prev, ''])}
              className="flex items-center gap-1 text-xs text-primary hover:underline mt-1 w-fit"
            >
              <Plus size={13} /> Tambah petunjuk
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
