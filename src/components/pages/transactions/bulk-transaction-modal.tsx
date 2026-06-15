'use client';

import { useState } from 'react';
import { Modal, Button, Spinner } from '@heroui/react';
import AppTextInput from '@/components/forms/app-text-input';
import AppAutocomplete from '@/components/forms/app-autocomplete';
import AppDatePicker from '@/components/forms/app-date-picker';
import { format } from 'date-fns';
import { showSuccessToast, showErrorToast } from '@/utils/common';
import { Trash2, Plus } from 'lucide-react';
import type { TbWallet, TbCategory } from '@prisma/client';
import type { TransactionFormData } from '@/types/transaction';
import type { ActionResponse } from '@/types/response';

type BulkTransactionModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  wallets: TbWallet[];
  categories: TbCategory[];
  createBulkAction: (formDataArray: TransactionFormData[]) => Promise<ActionResponse>;
  onSuccess: () => void;
};

type RowData = {
  id: string;
  date: string;
  amount: string;
  type: string;
  walletId: string;
  categoryId: string; // will act as toWalletId if type is TRANSFER
  notes: string;
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export default function BulkTransactionModal({
  isOpen,
  onOpenChange,
  wallets,
  categories,
  createBulkAction,
  onSuccess,
}: BulkTransactionModalProps) {
  const [loading, setLoading] = useState(false);
  
  const defaultRow: RowData = {
    id: generateId(),
    date: format(new Date(), 'dd-MM-yyyy'),
    amount: '0',
    type: 'EXPENSE',
    walletId: '',
    categoryId: '',
    notes: '',
  };

  const [rows, setRows] = useState<RowData[]>([defaultRow]);

  const txTypes = [
    { label: 'Pemasukan', value: 'INCOME' },
    { label: 'Pengeluaran', value: 'EXPENSE' },
    { label: 'Transfer', value: 'TRANSFER' },
  ];

  const walletItems = wallets.map((w) => ({ label: w.name, value: w.walletId }));

  const handleAddRow = () => {
    const lastRow = rows[rows.length - 1] || defaultRow;
    setRows([
      ...rows,
      {
        id: generateId(),
        date: lastRow.date,
        amount: '0',
        type: lastRow.type,
        walletId: lastRow.walletId,
        categoryId: lastRow.categoryId,
        notes: '',
      },
    ]);
  };

  const handleRemoveRow = (id: string) => {
    if (rows.length === 1) return; // Prevent removing the last row
    setRows(rows.filter((r) => r.id !== id));
  };

  const handleChange = (id: string, field: keyof RowData, value: string) => {
    setRows(
      rows.map((r) => {
        if (r.id === id) {
          const updated = { ...r, [field]: value };
          // reset categoryId when type changes to prevent invalid data
          if (field === 'type' && r.type !== value) {
            updated.categoryId = '';
          }
          return updated;
        }
        return r;
      })
    );
  };

  const parseDDMMYYYYtoISO = (dStr: string) => {
    if (!dStr) return new Date().toISOString();
    const [dd, mm, yyyy] = dStr.split('-');
    
    const now = new Date();
    const todayStr = format(now, 'dd-MM-yyyy');
    
    if (dStr === todayStr) {
      return now.toISOString(); // Keep exact current time for today
    }
    
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd), 12, 0, 0).toISOString();
  };

  const handleSubmit = async () => {
    // Validate rows
    const isValid = rows.every((r) => r.amount && r.date && r.type && r.walletId && r.categoryId);
    if (!isValid) {
      showErrorToast('Mohon lengkapi semua kolom yang wajib diisi');
      return;
    }

    setLoading(true);
    try {
      const formDataArray: TransactionFormData[] = rows.map((r) => ({
        amount: Number(r.amount.replace(/\D/g, '')) || 0,
        date: parseDDMMYYYYtoISO(r.date),
        notes: r.notes,
        type: r.type,
        walletId: r.walletId,
        toWalletId: r.type === 'TRANSFER' ? r.categoryId : undefined,
        categoryId: r.type !== 'TRANSFER' ? r.categoryId : undefined,
      }));

      const result = await createBulkAction(formDataArray);

      if (result?.success) {
        showSuccessToast(result.message || 'Transaksi berhasil disimpan');
        onSuccess();
        onOpenChange(false);
        // Reset form
        setRows([defaultRow]);
      } else {
        showErrorToast(result?.error || 'Gagal menyimpan transaksi');
      }
    } catch (error) {
      console.error('Error saving bulk transactions:', error);
      showErrorToast('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-[95vw] max-w-6xl">
            <div className="w-full">
              <Modal.Header className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">Input Transaksi Massal</h2>
                <p className="text-sm font-normal text-gray-500">
                  Tambah banyak transaksi sekaligus. Otomatis ikut baris sebelumnya.
                </p>
              </Modal.Header>
              <Modal.Body className="w-full max-h-[70vh] overflow-y-auto p-4 overflow-x-hidden">
                <div className="w-full border border-gray-100 rounded-xl">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                      <tr>
                        <th className="px-3 py-3 w-10"></th>
                        <th className="px-2 py-3 w-36">TANGGAL</th>
                        <th className="px-2 py-3 w-32">JUMLAH</th>
                        <th className="px-2 py-3 w-40">TIPE</th>
                        <th className="px-2 py-3 w-44">DOMPET</th>
                        <th className="px-2 py-3 w-48">KATEGORI / TO</th>
                        <th className="px-2 py-3">CATATAN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {rows.map((row) => (
                        <tr key={row.id} className="bg-white hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => handleRemoveRow(row.id)}
                              disabled={rows.length === 1}
                              className={`p-1.5 rounded-lg transition-colors ${
                                rows.length === 1
                                  ? 'text-gray-300 cursor-not-allowed'
                                  : 'text-gray-400 hover:text-rose-500 hover:bg-rose-50'
                              }`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                          <td className="px-2 py-2">
                            <AppDatePicker
                              value={row.date}
                              onChange={(val) => handleChange(row.id, 'date', val)}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <AppTextInput
                              name="amount"
                              type="number"
                              value={row.amount}
                              onChange={(val: any) => handleChange(row.id, 'amount', val)}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <AppAutocomplete
                              items={txTypes}
                              itemLabel="label"
                              itemValue="value"
                              defaultSelectedKey={row.type}
                              onSelectionChange={(key: any) => handleChange(row.id, 'type', String(key ?? ''))}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <AppAutocomplete
                              items={walletItems}
                              itemLabel="label"
                              itemValue="value"
                              defaultSelectedKey={row.walletId}
                              onSelectionChange={(key: any) => handleChange(row.id, 'walletId', String(key ?? ''))}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <AppAutocomplete
                              items={
                                row.type === 'TRANSFER'
                                  ? walletItems.filter((w) => w.value !== row.walletId)
                                  : categories
                                      .filter((c) => c.type === row.type)
                                      .map((c) => ({ label: `${c.icon || ''} ${c.name}`, value: c.categoryId }))
                              }
                              itemLabel="label"
                              itemValue="value"
                              defaultSelectedKey={row.categoryId}
                              onSelectionChange={(key: any) => handleChange(row.id, 'categoryId', String(key ?? ''))}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <AppTextInput
                              name="notes"
                              value={row.notes}
                              onChange={(val: any) => handleChange(row.id, 'notes', val)}
                              placeholder="cth. Kopi Kenangan"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Modal.Body>
              <Modal.Footer className="flex justify-between w-full">
                <Button
                  variant="flat"
                  startContent={<Plus size={16} />}
                  onPress={handleAddRow}
                  className="bg-gray-100 text-gray-700 font-medium"
                >
                  Tambah Baris
                </Button>
                <div className="flex gap-2">
                  <Button color="danger" variant="light" onPress={() => onOpenChange(false)} isDisabled={loading}>
                    Batal
                  </Button>
                  <Button color="primary" onPress={handleSubmit} isDisabled={loading} className="font-semibold shadow-sm">
                    {loading ? <Spinner size="sm" color="white" /> : 'Simpan Semua'}
                  </Button>
                </div>
              </Modal.Footer>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
