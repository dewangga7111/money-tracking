'use client';

import { useState } from 'react';
import { Button, Card, Form, Spinner } from '@heroui/react';
import { Save } from 'lucide-react';
import { useRouter } from 'waku';

import AppTextInput from '@/components/forms/app-text-input';
import AppTextarea from '@/components/forms/app-textarea';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { actionButtons, button, form } from '@/utils/primitives';
import type { RoleData, RoleFormData } from '@/types/role';
import type { ActionResponse } from '@/types/response';

type RoleFormProps = {
  initialData?: RoleData;
  isEdit?: boolean;
  createAction?: (formData: RoleFormData) => Promise<ActionResponse>;
  updateAction?: (id: string, formData: RoleFormData) => Promise<ActionResponse>;
};

export default function RoleForm({
  initialData,
  isEdit = false,
  createAction,
  updateAction,
}: RoleFormProps) {
  const router = useRouter();
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      const formData: RoleFormData = {
        name: data.name as string,
        description: data.description as string,
      };

      let result;
      if (isEdit && initialData && updateAction) {
        result = await updateAction(initialData.roleId, formData);
      } else if (!isEdit && createAction) {
        result = await createAction(formData);
      }

      if (result?.success) {
        showSuccessToast(result.message || 'Data saved successfully');
        router.push('/role');
      } else {
        showErrorToast(result?.error || 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving role:', error);
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
                label="Role Name"
                defaultValue={initialData?.name ?? ''}
              />
              <AppTextarea
                name="description"
                label="Description"
                defaultValue={initialData?.description || ''}
                minRows={3}
              />
            </div>

            <div className={actionButtons()}>
              <Button
                type="button"
                variant="secondary"
                className={button()}
                onPress={() => router.push('/role')}
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
