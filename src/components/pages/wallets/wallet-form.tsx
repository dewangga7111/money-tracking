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
import type { WalletFormData } from '@/types/wallet';
import type { TbWallet } from '@prisma/client';
import type { ActionResponse } from '@/types/response';

type WalletFormProps = {
  initialData?: TbWallet;
  isEdit?: boolean;
  createAction?: (formData: WalletFormData) => Promise<ActionResponse>;
  updateAction?: (id: string, formData: WalletFormData) => Promise<ActionResponse>;
};

export default function WalletForm({
  initialData,
  isEdit = false,
  createAction,
  updateAction,
}: WalletFormProps) {
  const router = useRouter();
  const { confirm } = useConfirmation();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<any>(initialData?.type || '');

  const walletTypes = [
    { label: 'Bank', value: 'BANK' },
    { label: 'E-Wallet', value: 'E_WALLET' },
    { label: 'Cash', value: 'CASH' },
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
      // Parse balance: remove non-numeric chars except dot/comma, or just Number
      const formData: WalletFormData = {
        name: data.name as string,
        type: type,
        balance: Number(data.balance) || 0,
      };

      let result;
      if (isEdit && initialData && updateAction) {
        result = await updateAction(initialData.walletId, formData);
      } else if (!isEdit && createAction) {
        result = await createAction(formData);
      }

      if (result?.success) {
        showSuccessToast(result.message || 'Data saved successfully');
        router.push('/wallets');
      } else {
        showErrorToast(result?.error || 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving wallet:', error);
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
                label="Wallet Name"
                defaultValue={initialData?.name ?? ''}
              />
              <AppAutocomplete
                isRequired
                label="Wallet Type"
                items={walletTypes}
                itemLabel="label"
                itemValue="value"
                defaultSelectedKey={initialData?.type ?? null}
                onSelectionChange={(key: any) => setType(String(key ?? ''))}
              />
              <AppTextInput
                name="balance"
                label="Balance (Initial)"
                type="number"
                defaultValue={(initialData as any)?.balance?.toString() ?? '0'}
              />
            </div>

            <div className={actionButtons()}>
              <Button
                type="button"
                variant="secondary"
                className={button()}
                onPress={() => router.push('/wallets')}
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
