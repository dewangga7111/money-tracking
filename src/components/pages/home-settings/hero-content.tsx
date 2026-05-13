'use client';

import { useState } from 'react';
import { Button, Card, Form, Spinner } from '@heroui/react';
import { Save } from 'lucide-react';
import AppTextInput from '@/components/forms/app-text-input';
import AppTextarea from '@/components/forms/app-textarea';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { actionButtons, button, form } from '@/utils/primitives';
import type { HeroData } from '@/types/sections/home-section';
import type { ActionResponse } from '@/types/response';

const FIELDS: { key: keyof HeroData; label: string; type: 'text' | 'textarea' | 'url' }[] = [
  { key: 'headline', label: 'Headline',             type: 'textarea' },
  { key: 'subtitle', label: 'Subtitle',             type: 'text' },
  { key: 'bgImage',  label: 'Background Image URL', type: 'url' },
];

type HeroContentProps = {
  initialData: HeroData | null;
  saveAction: (data: HeroData) => Promise<ActionResponse>;
};

export function HeroContent({ initialData, saveAction }: HeroContentProps) {
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    confirm({
      message: 'Simpan perubahan Hero section?',
      onConfirm: () => doSave(raw),
    });
  };

  const doSave = async (raw: Record<string, FormDataEntryValue>) => {
    setLoading(true);
    try {
      const data: HeroData = {
        headline: raw.headline as string,
        subtitle: raw.subtitle as string,
        bgImage:  raw.bgImage as string,
      };
      const result = await saveAction(data);
      if (result.success) {
        showSuccessToast(result.message || 'Hero section saved');
      } else {
        showErrorToast(result.error || 'Failed to save');
      }
    } catch {
      showErrorToast('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Content>
        <Form onSubmit={handleSubmit}>
          <div className={form()}>
            <div className="grid lg:grid-cols-2 gap-4">
              {FIELDS.map((f) =>
                f.type === 'textarea' ? (
                  <AppTextarea
                    key={f.key}
                    name={f.key}
                    label={f.label}
                    defaultValue={initialData?.[f.key] ?? ''}
                    minRows={3}
                    className="lg:col-span-2"
                  />
                ) : (
                  <AppTextInput
                    key={f.key}
                    name={f.key}
                    label={f.label}
                    defaultValue={initialData?.[f.key] ?? ''}
                  />
                )
              )}
            </div>

            <div className={actionButtons()}>
              <Button
                type="submit"
                variant="primary"
                className={button()}
                isDisabled={loading}
              >
                <span className="flex items-center gap-2">
                  {loading ? <Spinner size="sm" /> : <Save size={15} />}Save
                </span>
              </Button>
            </div>
          </div>
        </Form>
      </Card.Content>
    </Card>
  );
}
