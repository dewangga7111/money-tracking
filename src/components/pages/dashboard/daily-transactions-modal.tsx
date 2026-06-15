import { useState, useEffect } from 'react';
import { Modal, Spinner, Chip } from '@heroui/react';
import { formatCurrency, formatDate } from '@/utils/common';

type DailyTransactionsModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dateStr: string;
  transactions: any[];
  isLoading: boolean;
};

export default function DailyTransactionsModal({
  isOpen,
  onOpenChange,
  dateStr,
  transactions,
  isLoading,
}: DailyTransactionsModalProps) {
  const displayDate = dateStr ? new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog>
            <Modal.Header className="flex flex-col gap-1 border-b">
              <h3 className="text-xl font-bold">Transaksi Hari Ini</h3>
              <p className="text-sm text-default-500">{displayDate}</p>
            </Modal.Header>
            <Modal.Body className="p-4 overflow-y-auto max-h-[60vh]">
              {isLoading ? (
                <div className="flex justify-center p-8">
                  <Spinner />
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center p-8 text-default-400">
                  <p>Tidak ada transaksi pada hari ini.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {transactions.map((tx) => (
                    <div key={tx.transactionId} className="flex justify-between items-center p-3 border rounded-lg hover:bg-default-50 transition">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl bg-default-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">
                          {tx.category?.icon || (tx.type === 'TRANSFER' ? '🔄' : '💰')}
                        </div>
                        <div>
                          <p className="font-semibold">{tx.category?.name || 'Transfer'}</p>
                          <p className="text-xs text-default-500">
                            {tx.type === 'TRANSFER' ? `${tx.wallet?.name} ➡️ ${tx.toWallet?.name}` : tx.wallet?.name}
                            {tx.notes ? ` • ${tx.notes}` : ''}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${tx.type === 'INCOME' ? 'text-success' : tx.type === 'EXPENSE' ? 'text-danger' : 'text-default-500'}`}>
                          {tx.type === 'EXPENSE' ? '-' : tx.type === 'INCOME' ? '+' : ''}
                          {formatCurrency(Number(tx.amount))}
                        </p>
                        <Chip size="sm" variant="flat" color={tx.type === 'INCOME' ? 'success' : tx.type === 'EXPENSE' ? 'danger' : 'default'}>
                          {tx.type}
                        </Chip>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
