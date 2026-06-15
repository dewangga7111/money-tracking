'use client';

import { useState } from 'react';
import { Button, Card, Form, Spinner } from '@heroui/react';
import { Save } from 'lucide-react';
import { useRouter } from 'waku';

import AppTextInput from '@/components/forms/app-text-input';
import AppAutocomplete from '@/components/forms/app-autocomplete';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { actionButtons, button, form } from '@/utils/primitives';
import type { CategoryFormData } from '@/types/category';
import type { TbCategory } from '@prisma/client';
import type { ActionResponse } from '@/types/response';

type CategoryFormProps = {
  initialData?: TbCategory;
  isEdit?: boolean;
  createAction?: (formData: CategoryFormData) => Promise<ActionResponse>;
  updateAction?: (id: string, formData: CategoryFormData) => Promise<ActionResponse>;
};

export default function CategoryForm({
  initialData,
  isEdit = false,
  createAction,
  updateAction,
}: CategoryFormProps) {
  const router = useRouter();
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<any>(initialData?.type || '');

  const categoryTypes = [
    { label: 'Income', value: 'INCOME' },
    { label: 'Expense', value: 'EXPENSE' },
  ];

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = Object.fromEntries(new FormData(e.currentTarget));

    confirm({
      message: 'Are you sure you want to save this data?',
      onConfirm: () => doSave(formDataObj),
    });
  };

  const doSave = async (data: any) => {
    setLoading(true);
    try {
      const formData: CategoryFormData = {
        name: data.name as string,
        type: type,
        icon: data.icon as string,
      };

      let result;
      if (isEdit && initialData && updateAction) {
        result = await updateAction(initialData.categoryId, formData);
      } else if (!isEdit && createAction) {
        result = await createAction(formData);
      }

      if (result?.success) {
        showSuccessToast(result.message || 'Data saved successfully');
        router.push('/categories');
      } else {
        showErrorToast(result?.error || 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      showErrorToast('An error occurred while saving data');
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
              <AppTextInput
                isRequired
                name="name"
                label="Category Name"
                defaultValue={initialData?.name ?? ''}
              />
              <AppTextInput
                name="icon"
                label="Icon (Emoji)"
                defaultValue={initialData?.icon ?? ''}
                maxLength={2}
              />
              <AppAutocomplete
                isRequired
                label="Category Type"
                items={categoryTypes}
                itemLabel="label"
                itemValue="value"
                defaultSelectedKey={initialData?.type ?? null}
                onSelectionChange={(key: any) => setType(String(key ?? ''))}
              />
            </div>

            <div className={actionButtons()}>
              <Button
                type="button"
                variant="secondary"
                className={button()}
                onPress={() => router.push('/categories')}
                isDisabled={loading}
              >
                Back
              </Button>
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
