'use client';

import { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  Spinner,
} from '@heroui/react';
import AppTextInput from '@/components/forms/app-text-input';
import AppAutocomplete from '@/components/forms/app-autocomplete';
import AppDatePicker from '@/components/forms/app-date-picker';
import { format } from 'date-fns';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import type { TbWallet, TbCategory } from '@prisma/client';
import type { TransactionFormData } from '@/types/transaction';
import type { ActionResponse } from '@/types/response';

type TransactionModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  wallets: TbWallet[];
  categories: TbCategory[];
  createAction?: (formData: TransactionFormData) => Promise<ActionResponse>;
  updateAction?: (id: string, formData: TransactionFormData) => Promise<ActionResponse>;
  initialData?: any;
  onSuccess: () => void;
};

export default function TransactionModal({
  isOpen,
  onOpenChange,
  wallets,
  categories,
  createAction,
  updateAction,
  initialData,
  onSuccess,
}: TransactionModalProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<any>('');
  const [walletId, setWalletId] = useState<any>('');
  const [toWalletId, setToWalletId] = useState<any>('');
  const [categoryId, setCategoryId] = useState<any>('');
  const [dateStr, setDateStr] = useState<string>(format(new Date(), 'dd-MM-yyyy'));
  const [amount, setAmount] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setType(initialData.type || '');
        setWalletId(initialData.walletId || '');
        setToWalletId(initialData.toWalletId || '');
        setCategoryId(initialData.categoryId || '');
        setAmount(initialData.amount?.toString() || '');
        setNotes(initialData.notes || '');
        setDateStr(initialData.date ? format(new Date(initialData.date), 'dd-MM-yyyy') : format(new Date(), 'dd-MM-yyyy'));
      } else {
        setType('');
        setWalletId('');
        setToWalletId('');
        setCategoryId('');
        setAmount('');
        setNotes('');
        setDateStr(format(new Date(), 'dd-MM-yyyy'));
      }
    }
  }, [isOpen, initialData]);

  const txTypes = [
    { label: 'Income', value: 'INCOME' },
    { label: 'Expense', value: 'EXPENSE' },
    { label: 'Transfer', value: 'TRANSFER' },
  ];

  const walletItems = wallets.map((w) => ({ label: w.name, value: w.walletId }));
  const categoryItems = categories
    .filter((c) => (type ? c.type === type : true))
    .map((c) => ({ label: `${c.icon || ''} ${c.name}`, value: c.categoryId }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setLoading(true);
    try {
      const parseDDMMYYYYtoISO = (dStr: string) => {
        if (!dStr) return new Date().toISOString();
        const [dd, mm, yyyy] = dStr.split('-');
        
        const now = new Date();
        const todayStr = format(now, 'dd-MM-yyyy');
        
        if (dStr === todayStr) {
          return now.toISOString(); // Keep exact current time for today
        }
        
        // For other dates, use 12:00:00 of the user's local timezone
        const dateObj = new Date(Number(yyyy), Number(mm) - 1, Number(dd), 12, 0, 0);
        return dateObj.toISOString();
      };

      const formData: TransactionFormData = {
        amount: Number(data.amount) || 0,
        date: parseDDMMYYYYtoISO(dateStr),
        notes: data.notes as string,
        type: type,
        walletId: walletId,
        toWalletId: type === 'TRANSFER' ? toWalletId : undefined,
        categoryId: type !== 'TRANSFER' ? categoryId : undefined,
      };

      let result;
      if (initialData && updateAction) {
        result = await updateAction(initialData.transactionId, formData);
      } else if (createAction) {
        result = await createAction(formData);
      }

      if (result?.success) {
        showSuccessToast(result.message || 'Transaction saved successfully');
        onSuccess();
        onOpenChange(false);
        // Reset form
        setType('');
        setWalletId('');
        setToWalletId('');
        setCategoryId('');
        setDateStr(format(new Date(), 'dd-MM-yyyy'));
      } else {
        showErrorToast(result?.error || 'Failed to save transaction');
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
      showErrorToast('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog>
            <Form onSubmit={handleSubmit} className="w-full">
              <Modal.Header className="flex flex-col gap-1">{initialData ? 'Edit Transaction' : 'Add Transaction'}</Modal.Header>
              <Modal.Body className="w-full max-h-[60vh] overflow-y-auto overflow-x-hidden p-2">
                <div className="grid gap-4 w-full">
                  <AppAutocomplete
                    isRequired
                    label="Transaction Type"
                    items={txTypes}
                    itemLabel="label"
                    itemValue="value"
                    onSelectionChange={(key: any) => setType(String(key ?? ''))}
                    defaultSelectedKey={type}
                  />
                  <AppTextInput
                    isRequired
                    name="amount"
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(val: any) => setAmount(val)}
                  />
                  <AppDatePicker
                    isRequired
                    label="Date"
                    value={dateStr}
                    onChange={(val) => setDateStr(val)}
                  />
                  <AppAutocomplete
                    isRequired
                    label={type === 'TRANSFER' ? 'From Wallet' : 'Wallet'}
                    items={walletItems}
                    itemLabel="label"
                    itemValue="value"
                    onSelectionChange={(key: any) => setWalletId(String(key ?? ''))}
                    defaultSelectedKey={walletId}
                  />
                  
                  {type === 'TRANSFER' && (
                    <AppAutocomplete
                      isRequired
                      label="To Wallet"
                      items={walletItems.filter(w => w.value !== walletId)}
                      itemLabel="label"
                      itemValue="value"
                      onSelectionChange={(key: any) => setToWalletId(String(key ?? ''))}
                      defaultSelectedKey={toWalletId}
                    />
                  )}

                  {type !== 'TRANSFER' && type !== '' && (
                    <AppAutocomplete
                      isRequired
                      label="Category"
                      items={categoryItems}
                      itemLabel="label"
                      itemValue="value"
                      onSelectionChange={(key: any) => setCategoryId(String(key ?? ''))}
                      defaultSelectedKey={categoryId}
                    />
                  )}

                  <AppTextInput
                    name="notes"
                    label="Notes (Optional)"
                    value={notes}
                    onChange={(val: any) => setNotes(val)}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button color="danger" variant="light" onPress={() => onOpenChange(false)} isDisabled={loading}>
                  Cancel
                </Button>
                <Button color="primary" type="submit" isDisabled={loading}>
                  {loading ? <Spinner size="sm" /> : 'Save'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
