'use client';

import { Button, Card, CardBody, Form } from '@heroui/react';
import { Save } from 'lucide-react';
import { useRouter } from 'waku';

import AppTextInput from '@/components/forms/app-text-input';
import AppTextarea from '@/components/forms/app-textarea';
import { showSuccessToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import {
  actionButtons,
  button,
  form,
  inputContainer,
} from '@/utils/primitives';

type ResepFormProps = {
  initialData?: {
    name: string;
    resep: string;
    bahan: string;
  };
  isEdit?: boolean;
};

export default function ResepForm({
  initialData,
  isEdit = false,
}: ResepFormProps) {
  const router = useRouter();
  const { confirm } = useConfirmation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    confirm({
      message: 'Are you sure you want to save this data?',
      onConfirm: () => {
        doSave(formData);
      },
    });
  };

  const doSave = (_data: any) => {
    showSuccessToast('Data Saved Successfully');
    router.push('/resep');
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
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className={button()}
                  startContent={<Save size={15} />}
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
