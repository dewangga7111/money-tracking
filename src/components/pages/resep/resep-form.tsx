'use client';

import { useState } from 'react';
import { Button, Card, CardBody, Form } from '@heroui/react';
import { Save } from 'lucide-react';
import { useRouter } from 'waku';

import AppTextInput from '@/components/forms/app-text-input';
import AppTextarea from '@/components/forms/app-textarea';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import {
  actionButtons,
  button,
  form,
  inputContainer,
} from '@/utils/primitives';
import type { ResepData, ResepFormData } from '@/types/resep';
import type { ActionResponse } from '@/types/response';

type ResepFormProps = {
  initialData?: ResepData;
  isEdit?: boolean;
  createAction?: (formData: ResepFormData) => Promise<ActionResponse>;
  updateAction?: (id: string, formData: ResepFormData) => Promise<ActionResponse>;
};

export default function ResepForm({
  initialData,
  isEdit = false,
  createAction,
  updateAction,
}: ResepFormProps) {
  const router = useRouter();
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = Object.fromEntries(new FormData(e.currentTarget));
    confirm({
      message: 'Are you sure you want to save this data?',
      onConfirm: () => {
        doSave(formDataObj);
      },
    });
  };

  const doSave = async (data: any) => {
    setLoading(true);
    try {
      const formData: ResepFormData = {
        name: data.name as string,
        resep: data.resep as string,
        bahan: data.bahan as string,
      };

      let result;
      if (isEdit && initialData && updateAction) {
        result = await updateAction(initialData.resepId, formData);
      } else if (!isEdit && createAction) {
        result = await createAction(formData);
      }
      
      if (result?.success) {
        showSuccessToast(result.message || 'Data saved successfully');
        router.push('/resep');
      } else {
        showErrorToast(result?.error || 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving resep:', error);
      showErrorToast('An error occurred while saving data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="px-1">
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <div className={form()}>
              <div className={inputContainer()}>
                <AppTextInput
                  isRequired
                  key="name"
                  name="name"
                  label="Nama Resep"
                  defaultValue={initialData?.name}
                  placeholder="Contoh: Nasi Goreng"
                />
                <AppTextarea
                  isRequired
                  key="bahan"
                  name="bahan"
                  label="Bahan-bahan"
                  defaultValue={initialData?.bahan}
                  placeholder="Tuliskan bahan-bahan yang diperlukan..."
                  minRows={4}
                />
                <AppTextarea
                  isRequired
                  key="resep"
                  name="resep"
                  label="Cara Membuat"
                  defaultValue={initialData?.resep}
                  placeholder="Tuliskan langkah-langkah pembuatan..."
                  minRows={6}
                />
              </div>

              <div className={actionButtons()}>
                <Button
                  type="button"
                  color="primary"
                  variant="flat"
                  className={button()}
                  onPress={() => router.push('/resep')}
                  isDisabled={loading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className={button()}
                  startContent={<Save size={15} />}
                  isLoading={loading}
                >
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
