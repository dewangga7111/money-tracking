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
import type { DocumentationArticle, DocumentationData } from '@/types/sections/documentation-section';
import type { ActionResponse } from '@/types/response';

type ArticleState = DocumentationArticle & { file?: File | null };

type Props = {
  initialData: DocumentationData | null;
  saveAction: (data: DocumentationData) => Promise<ActionResponse>;
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

export function DocumentationContent({ initialData, saveAction }: Props) {
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);

  const [header, setHeader] = useState({
    badge: initialData?.badge ?? '',
    headline: initialData?.headline ?? '',
    subheadline: initialData?.subheadline ?? '',
  });

  const [articles, setArticles] = useState<ArticleState[]>(
    initialData?.articles.map((a) => ({ ...a, file: null })) ?? []
  );

  const handleSave = () => {
    confirm({
      message: 'Simpan perubahan Documentation section?',
      onConfirm: doSave,
    });
  };

  const doSave = async () => {
    setLoading(true);
    try {
      const resolvedArticles = await Promise.all(
        articles.map(async ({ file, ...rest }) => ({
          ...rest,
          img: await resolveImage(rest.img, file),
        }))
      );

      const data: DocumentationData = { ...header, articles: resolvedArticles };
      const result = await saveAction(data);
      if (result.success) {
        showSuccessToast(result.message || 'Documentation section saved');
      } else {
        showErrorToast(result.error || 'Failed to save');
      }
    } catch (e: any) {
      showErrorToast(e?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = (i: number, patch: Partial<ArticleState>) =>
    setArticles((prev) => prev.map((a, idx) => (idx === i ? { ...a, ...patch } : a)));

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
              label="Subheadline"
              value={header.subheadline}
              onChange={(val) => setHeader((p) => ({ ...p, subheadline: val }))}
            />
          </div>
        </Card.Content>
      </Card>

      {/* Articles */}
      <div className="grid lg:grid-cols-2 gap-4">
        {articles.map((article, i) => (
          <Card key={i}>
            <Card.Content>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500">Artikel {i + 1}</span>
                <button
                  type="button"
                  onClick={() => setArticles((prev) => prev.filter((_, idx) => idx !== i))}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <AppImageUpload
                  name={`article_${i}_img`}
                  label="Foto"
                  defaultValue={article.img}
                  onValueChange={(val) =>
                    updateArticle(i, { file: val instanceof File ? val : null, img: val === null ? '' : article.img })
                  }
                />
                <AppTextInput
                  name={`article_${i}_media`}
                  label="Media"
                  value={article.media}
                  onChange={(val) => updateArticle(i, { media: val })}
                />
                <AppTextInput
                  name={`article_${i}_title`}
                  label="Judul"
                  value={article.title}
                  onChange={(val) => updateArticle(i, { title: val })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <AppTextInput
                    name={`article_${i}_tag`}
                    label="Tag"
                    value={article.tag}
                    onChange={(val) => updateArticle(i, { tag: val })}
                  />
                  <AppTextInput
                    name={`article_${i}_date`}
                    label="Tanggal"
                    value={article.date}
                    onChange={(val) => updateArticle(i, { date: val })}
                  />
                </div>
                <AppTextInput
                  name={`article_${i}_link`}
                  label="Link Artikel"
                  value={article.link}
                  onChange={(val) => updateArticle(i, { link: val })}
                />
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setArticles((prev) => [...prev, { media: '', date: '', title: '', img: '', tag: '', link: '', file: null }])}
        className="flex items-center gap-2 text-sm text-primary hover:underline w-fit"
      >
        <Plus size={15} /> Tambah artikel
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
