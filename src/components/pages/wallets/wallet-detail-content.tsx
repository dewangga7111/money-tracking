'use client';

import { useState, useEffect } from 'react';
import { Card, Button } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'waku';
import Datatable from '@/components/table/datatable';
import { TableColumnType, TableRowType, PaginationInfo } from '@/types/table';
import { formatCurrency, formatDateLong } from '@/utils/common';
import AppDateRangePicker from '@/components/forms/app-date-range-picker';
import { getWalletSummaryAction } from '@/actions/wallet-action';

import type { GetAllTransactionResponse } from '@/types/transaction';

const columns: TableColumnType[] = [
  { key: 'date', label: 'Date', align: 'start' },
  { key: 'type', label: 'Type', align: 'center' },
  { key: 'category', label: 'Category', align: 'start' },
  { key: 'wallet', label: 'Wallet', align: 'start' },
  { key: 'notes', label: 'Notes', align: 'start' },
  { key: 'amount', label: 'Amount', align: 'end' },
];

type WalletDetailContentProps = {
  walletId: string;
  walletName: string;
  walletType: string;
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  initialTransactions: any[];
  initialPagination: PaginationInfo;
  getAllAction: (page: number, pageSize: number, params: any) => Promise<GetAllTransactionResponse>;
};

export function WalletDetailContent({
  walletId,
  walletName,
  walletType,
  totalBalance: initialTotalBalance,
  totalIncome: initialTotalIncome,
  totalExpense: initialTotalExpense,
  initialTransactions,
  initialPagination,
  getAllAction,
}: WalletDetailContentProps) {
  const router = useRouter();

  const [page, setPage] = useState(initialPagination.page);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>(initialPagination);

  const [totalBalance, setTotalBalance] = useState(initialTotalBalance);
  const [totalIncome, setTotalIncome] = useState(initialTotalIncome);
  const [totalExpense, setTotalExpense] = useState(initialTotalExpense);

  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const formatDateToDDMMYYYY = (d: Date) => {
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  const parseDDMMYYYYtoYYYYMMDD = (dStr: string) => {
    if (!dStr) return '';
    return dStr.split('-').reverse().join('-');
  };

  const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({
    start: formatDateToDDMMYYYY(firstDay),
    end: formatDateToDDMMYYYY(lastDay),
  });

  const mapTransactions = (txs: any[]) => {
    return txs.map((v) => ({
      key: v.transactionId,
      date: formatDateLong(v.date),
      type: v.type,
      category: v.category ? `${v.category.icon || ''} ${v.category.name}` : '-',
      wallet: v.type === 'TRANSFER' && v.toWallet 
        ? `${v.wallet.name} ➡️ ${v.toWallet.name}` 
        : v.wallet.name,
      notes: v.notes || '-',
      amount: v.amount,
    }));
  };
  const [data, setData] = useState<TableRowType[]>(mapTransactions(initialTransactions));

  const refreshData = async (newPage: number, currentRange: { start: string | null; end: string | null }) => {
    setLoading(true);
    try {
      const startYMD = parseDDMMYYYYtoYYYYMMDD(currentRange.start || '');
      const endYMD = parseDDMMYYYYtoYYYYMMDD(currentRange.end || '');

      const [txRes, summaryRes] = await Promise.all([
        getAllAction(newPage, pagination.pageSize, { walletId, startDate: startYMD, endDate: endYMD }),
        getWalletSummaryAction(walletId, startYMD, endYMD)
      ]);

      if (txRes.success && txRes.data) {
        setData(mapTransactions(txRes.data));
        setPagination(txRes.pagination!);
        setPage(newPage);
      }

      if (summaryRes.success && summaryRes.data) {
        setTotalIncome(summaryRes.data.totalIncome);
        setTotalExpense(summaryRes.data.totalExpense);
        setTotalBalance(summaryRes.data.wallet.totalBalance);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      refreshData(1, dateRange);
    }
  }, [dateRange]);

  const handlePageChange = (newPage: number) => {
    refreshData(newPage, dateRange);
  };

  const renderCell = (row: TableRowType, columnKey: string | number) => {
    const key = String(columnKey);
    const cellValue = row[key];

    if (key === 'type') {
      const isIncome = cellValue === 'INCOME';
      const isTransfer = cellValue === 'TRANSFER';
      return (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${isIncome ? 'bg-emerald-50 text-emerald-700' : isTransfer ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700'}`}
        >
          {cellValue}
        </span>
      );
    }

    if (key === 'amount') {
      const isIncome = row.type === 'INCOME';
      const isExpense = row.type === 'EXPENSE';
      return (
        <span className={`font-semibold ${isIncome ? 'text-emerald-700' : isExpense ? 'text-rose-700' : 'text-gray-800'}`}>
          {isIncome ? '+' : isExpense ? '-' : ''} {formatCurrency(Number(cellValue))}
        </span>
      );
    }

    return cellValue;
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="light" isIconOnly onPress={() => router.push('/wallets')}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{walletName}</h1>
            <p className="text-default-500 uppercase tracking-wider text-xs font-semibold">{walletType}</p>
          </div>
        </div>

        <div className="w-full md:w-72">
          <AppDateRangePicker
            value={dateRange}
            onChange={(val) => {
              if (val && val.start && val.end) {
                setDateRange(val);
              }
            }}
          />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary-900 to-primary-800 text-white border-none shadow-sm rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
          <Card.Content className="p-6 relative z-10">
            <p className="text-xs text-primary-200 uppercase tracking-widest font-semibold mb-2">Total Saldo</p>
            <p className="text-3xl font-bold text-white">{formatCurrency(totalBalance)}</p>
          </Card.Content>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white border-none shadow-sm rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
          <Card.Content className="p-6 relative z-10">
            <p className="text-xs text-emerald-100 uppercase tracking-widest font-semibold mb-2">Total Pemasukan</p>
            <p className="text-3xl font-bold text-white">{formatCurrency(totalIncome)}</p>
          </Card.Content>
        </Card>

        <Card className="bg-gradient-to-br from-rose-800 to-rose-700 text-white border-none shadow-sm rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
          <Card.Content className="p-6 relative z-10">
            <p className="text-xs text-rose-200 uppercase tracking-widest font-semibold mb-2">Total Pengeluaran</p>
            <p className="text-3xl font-bold text-white">{formatCurrency(totalExpense)}</p>
          </Card.Content>
        </Card>
      </div>

      {/* Datatable Section */}
      <div className="w-full flex flex-col h-full overflow-hidden mt-4">
        <h3 className="font-bold text-lg mb-4 pl-2">Riwayat Transaksi</h3>
        <div className="w-full">
          <Datatable
            columns={columns}
            rows={data}
            loading={loading}
            page={page}
            totalPage={pagination.totalPages}
            totalRows={pagination.totalCount}
            onPageChange={handlePageChange}
            renderCell={renderCell}
            isMobile={false}
            hideEdit
            hideDelete
          />
        </div>
      </div>
    </div>
  );
}
