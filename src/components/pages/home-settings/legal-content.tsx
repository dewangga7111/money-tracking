'use client';

import { useState } from 'react';
import { Button, Card, Spinner } from '@heroui/react';
import { Save, Plus, Trash2 } from 'lucide-react';
import AppTextInput from '@/components/forms/app-text-input';
import AppTextarea from '@/components/forms/app-textarea';
import AppImageUpload from '@/components/forms/app-image-upload';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { uploadImageAction } from '@/actions/upload-action';
import { useConfirmation } from '@/contexts/confirmation-context';
import { actionButtons, button, form } from '@/utils/primitives';
import type { LegalData, LegalDoc } from '@/types/sections/legal-section';
import type { ActionResponse } from '@/types/response';

type DocState = LegalDoc & { file?: File | null };

type Props = {
  initialData: LegalData | null;
  saveAction: (data: LegalData) => Promise<ActionResponse>;
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

export function LegalContent({ initialData, saveAction }: Props) {
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);

  const [header, setHeader] = useState({
    badge: initialData?.badge ?? '',
    headline: initialData?.headline ?? '',
    headlineHighlight: initialData?.headlineHighlight ?? '',
    description: initialData?.description ?? '',
  });

  const [docs, setDocs] = useState<DocState[]>(initialData?.docs.map((d) => ({ ...d, file: null })) ?? []);

  const handleSave = () => {
    confirm({
      message: 'Simpan perubahan Legal section?',
      onConfirm: doSave,
    });
  };

  const doSave = async () => {
    setLoading(true);
    try {
      const resolvedDocs = await Promise.all(
        docs.map(async ({ file, ...rest }) => ({
          ...rest,
          image: await resolveImage(rest.image, file),
        }))
      );
      const result = await saveAction({ ...header, docs: resolvedDocs });
      if (result.success) {
        showSuccessToast(result.message || 'Legal section saved');
      } else {
        showErrorToast(result.error || 'Failed to save');
      }
    } catch (e: any) {
      showErrorToast(e?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateDoc = (i: number, patch: Partial<DocState>) =>
    setDocs((prev) => prev.map((d, idx) => (idx === i ? { ...d, ...patch } : d)));

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
              name="headlineHighlight"
              label="Headline Highlight (warna primary)"
              value={header.headlineHighlight}
              onChange={(val) => setHeader((p) => ({ ...p, headlineHighlight: val }))}
            />
            <AppTextarea
              name="description"
              label="Deskripsi"
              value={header.description}
              onChange={(val) => setHeader((p) => ({ ...p, description: val }))}
              className="lg:col-span-2"
            />
          </div>
        </Card.Content>
      </Card>

      {/* Docs */}
      <div className="grid lg:grid-cols-2 gap-4">
        {docs.map((doc, i) => (
          <Card key={i}>
            <Card.Content>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500">Dokumen {i + 1}</span>
                <button
                  type="button"
                  onClick={() => setDocs((prev) => prev.filter((_, idx) => idx !== i))}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <AppImageUpload
                  name={`doc_${i}_image`}
                  label="Foto Dokumen"
                  defaultValue={doc.image}
                  onValueChange={(val) =>
                    updateDoc(i, { file: val instanceof File ? val : null, image: val === null ? '' : doc.image })
                  }
                />
                <AppTextInput
                  name={`doc_${i}_title`}
                  label="Judul"
                  value={doc.title}
                  onChange={(val) => updateDoc(i, { title: val })}
                />
                <AppTextInput
                  name={`doc_${i}_sub`}
                  label="Sub"
                  value={doc.sub}
                  onChange={(val) => updateDoc(i, { sub: val })}
                />
                <AppTextInput
                  name={`doc_${i}_detail`}
                  label="Detail (nomor/kode)"
                  value={doc.detail}
                  onChange={(val) => updateDoc(i, { detail: val })}
                />
                <AppTextInput
                  name={`doc_${i}_issued`}
                  label="Tanggal / Keterangan"
                  value={doc.issued}
                  onChange={(val) => updateDoc(i, { issued: val })}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Warna</span>
                  <div className="flex gap-3">
                    {(['primary', 'secondary'] as const).map((v) => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name={`doc_${i}_variant`}
                          value={v}
                          checked={doc.variant === v}
                          onChange={() => updateDoc(i, { variant: v })}
                        />
                        <span className={v === 'primary' ? 'text-primary font-semibold' : 'text-primary-700 font-semibold'}>
                          {v === 'primary' ? 'Primary (emas)' : 'Secondary (coklat)'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setDocs((prev) => [...prev, { title: '', sub: '', detail: '', issued: '', variant: 'primary', image: '', file: null }])}
        className="flex items-center gap-2 text-sm text-primary hover:underline w-fit"
      >
        <Plus size={15} /> Tambah dokumen
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
