'use client';

import { useState } from 'react';
import { Button, Card, Spinner } from '@heroui/react';
import { Save, Plus, Trash2 } from 'lucide-react';
import AppTextInput from '@/components/forms/app-text-input';
import AppImageUpload from '@/components/forms/app-image-upload';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { uploadImageAction } from '@/actions/upload-action';
import { actionButtons, button, form } from '@/utils/primitives';
import type { GalleryData, GalleryItem } from '@/types/sections/gallery-section';
import type { ActionResponse } from '@/types/response';

type GalleryItemState = GalleryItem & { file?: File | null };

type Props = {
  initialData: GalleryData | null;
  saveAction: (data: GalleryData) => Promise<ActionResponse>;
};

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

export function GalleryContent({ initialData, saveAction }: Props) {
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);

  const [header, setHeader] = useState({
    badge: initialData?.badge ?? '',
    headline: initialData?.headline ?? '',
    headlineHighlight: initialData?.headlineHighlight ?? '',
  });

  const [items, setItems] = useState<GalleryItemState[]>(
    initialData?.items.map((item) => ({ ...item, file: null })) ?? []
  );

  const handleSave = () => {
    confirm({
      message: 'Simpan perubahan Gallery section?',
      onConfirm: doSave,
    });
  };

  const doSave = async () => {
    setLoading(true);
    try {
      const resolvedItems = await Promise.all(
        items.map(async ({ file, ...rest }) => ({
          ...rest,
          img: await resolveImage(rest.img, file),
        }))
      );

      const data: GalleryData = { ...header, items: resolvedItems };
      const result = await saveAction(data);
      if (result.success) {
        showSuccessToast(result.message || 'Gallery section saved');
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
              label="Headline (putih)"
              value={header.headline}
              onChange={(val) => setHeader((p) => ({ ...p, headline: val }))}
            />
            <AppTextInput
              name="headlineHighlight"
              label="Headline Highlight (warna primary)"
              value={header.headlineHighlight}
              onChange={(val) => setHeader((p) => ({ ...p, headlineHighlight: val }))}
            />
          </div>
        </Card.Content>
      </Card>

      {/* Gallery Items */}
      <div className="grid lg:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <Card key={i}>
            <Card.Content>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500">Foto {i + 1}</span>
                <button
                  type="button"
                  onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <AppImageUpload
                  name={`gallery_${i}_img`}
                  label="Foto"
                  defaultValue={item.img}
                  onValueChange={(val) =>
                    setItems((prev) =>
                      prev.map((it, idx) =>
                        idx === i
                          ? { ...it, file: val instanceof File ? val : null, img: val === null ? '' : it.img }
                          : it
                      )
                    )
                  }
                />
                <AppTextInput
                  name={`gallery_${i}_caption`}
                  label="Caption"
                  value={item.caption}
                  onChange={(val) =>
                    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, caption: val } : it)))
                  }
                />
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, { img: '', caption: '', file: null }])}
        className="flex items-center gap-2 text-sm text-primary hover:underline w-fit"
      >
        <Plus size={15} /> Tambah foto
      </button>

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
