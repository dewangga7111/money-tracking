'use client';

import { useState } from 'react';
import { Button, Card, Form, Spinner } from '@heroui/react';
import { Save } from 'lucide-react';
import AppTextInput from '@/components/forms/app-text-input';
import AppTextarea from '@/components/forms/app-textarea';
import AppImageUpload from '@/components/forms/app-image-upload';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { uploadImageAction } from '@/actions/upload-action';
import { actionButtons, button, form } from '@/utils/primitives';
import type { HeroData } from '@/types/sections/home-section';
import type { ActionResponse } from '@/types/response';

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
      let bgImage = raw.bgImage as string;
      if (raw.bgImage instanceof File && raw.bgImage.size > 0) {
        const fd = new FormData();
        fd.append('file', raw.bgImage);
        const uploadResult = await uploadImageAction(fd);
        if (!uploadResult.success) {
          showErrorToast(uploadResult.error || 'Upload failed');
          setLoading(false);
          return;
        }
        bgImage = uploadResult.path!;
      }
      const data: HeroData = {
        headline: raw.headline as string,
        subtitle: raw.subtitle as string,
        bgImage,
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
              <AppTextarea
                name="headline"
                label="Headline"
                defaultValue={initialData?.headline ?? ''}
                minRows={3}
                className="lg:col-span-2"
              />
              <AppTextInput
                name="subtitle"
                label="Subtitle"
                defaultValue={initialData?.subtitle ?? ''}
              />
              <AppImageUpload
                name="bgImage"
                label="Background Image"
                defaultValue={initialData?.bgImage ?? ''}
              />
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
