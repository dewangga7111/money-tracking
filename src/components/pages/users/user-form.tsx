'use client';

import { useState } from 'react';
import { Button, Card, CardBody, Form } from '@heroui/react';
import { Save } from 'lucide-react';
import { useRouter } from 'waku';

import AppTextInput from '@/components/forms/app-text-input';
import AppTextInputPassword from '@/components/forms/app-text-input-password';
import AppAutocomplete from '@/components/forms/app-autocomplete';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { actionButtons, button, form } from '@/utils/primitives';
import type { UserData, UserFormData } from '@/types/user';
import type { RoleData } from '@/types/role';
import type { ActionResponse } from '@/types/response';

type UserFormProps = {
  initialData?: UserData;
  isEdit?: boolean;
  availableRoles: RoleData[];
  createAction?: (formData: UserFormData) => Promise<ActionResponse>;
  updateAction?: (id: string, formData: UserFormData) => Promise<ActionResponse>;
};

export default function UserForm({
  initialData,
  isEdit = false,
  availableRoles,
  createAction,
  updateAction,
}: UserFormProps) {
  const router = useRouter();
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);
  const [roleId, setRoleId] = useState(initialData?.roleId || '');
  const [passwordError, setPasswordError] = useState('');

  const roleItems = availableRoles.map((r) => ({ label: r.name, value: r.roleId }));

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = Object.fromEntries(new FormData(e.currentTarget));

    if (formDataObj.password || !isEdit) {
      if (formDataObj.password !== formDataObj.confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
    }
    setPasswordError('');

    confirm({
      message: 'Are you sure you want to save this data?',
      onConfirm: () => doSave(formDataObj),
    });
  };

  const doSave = async (data: any) => {
    setLoading(true);
    try {
      const formData: UserFormData = {
        name: data.name as string,
        email: data.email as string,
        roleId,
        ...(data.password ? { password: data.password as string } : {}),
      };

      let result;
      if (isEdit && initialData && updateAction) {
        result = await updateAction(initialData.userId, formData);
      } else if (!isEdit && createAction) {
        result = await createAction(formData);
      }

      if (result?.success) {
        showSuccessToast(result.message || 'Data saved successfully');
        router.push('/users');
      } else {
        showErrorToast(result?.error || 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      showErrorToast('An error occurred while saving data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="px-1">
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <div className={form()}>
            <div className="grid lg:grid-cols-2 gap-4">
              <AppTextInput
                isRequired
                name="name"
                label="Full Name"
                defaultValue={initialData?.name}
              />
              <AppTextInput
                isRequired
                name="email"
                label="Email"
                type="email"
                defaultValue={initialData?.email}
              />
              <AppTextInputPassword
                name="password"
                label={isEdit ? 'New Password (leave blank to keep current)' : 'Password'}
                isRequired={!isEdit}
                onChange={() => setPasswordError('')}
              />
              <AppTextInputPassword
                name="confirmPassword"
                label="Confirm Password"
                isRequired={!isEdit}
                isInvalid={!!passwordError}
                errorMessage={passwordError}
                onChange={() => setPasswordError('')}
              />
              <AppAutocomplete
                isRequired
                label="Role"
                items={roleItems}
                itemLabel="label"
                itemValue="value"
                defaultSelectedKey={initialData?.roleId}
                onSelectionChange={(key) => setRoleId(String(key ?? ''))}
              />
            </div>

            <div className={actionButtons()}>
              <Button
                type="button"
                color="primary"
                variant="flat"
                className={button()}
                onPress={() => router.push('/users')}
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
  );
}
