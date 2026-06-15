'use client';

import { useState, useEffect } from 'react';
import { Button, Card } from '@heroui/react';
import { PlusIcon } from 'lucide-react';
import { getLocalTimeZone, today } from '@internationalized/date';
import Datatable from '@/components/table/datatable';
import { TableColumnType, TableRowType, PaginationInfo } from '@/types/table';
import TransactionModal from './transaction-modal';
import DailyTransactionsModal from './daily-transactions-modal';
import { formatCurrency, formatDateLong } from '@/utils/common';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AppDateRangePicker from '@/components/forms/app-date-range-picker';
import ActivityCalendar from './activity-calendar';

import type { TbWallet, TbCategory } from '@prisma/client';
import type { DashboardSummary, GetAllTransactionResponse, TransactionFormData, ChartDataPoint } from '@/types/transaction';
import type { ActionResponse } from '@/types/response';
import { getTransactionsByDate, getDashboardSummary, getChartData, getExpensesByCategory } from '@/actions/transaction-action';

const columns: TableColumnType[] = [
  { key: 'date', label: 'Date', align: 'start' },
  { key: 'type', label: 'Type', align: 'center' },
  { key: 'category', label: 'Category', align: 'start' },
  { key: 'wallet', label: 'Wallet', align: 'start' },
  { key: 'notes', label: 'Notes', align: 'start' },
  { key: 'amount', label: 'Amount', align: 'end' },
];

type DashboardContentProps = {
  summary: DashboardSummary;
  wallets: TbWallet[];
  categories: TbCategory[];
  initialTransactions: any[];
  initialPagination: PaginationInfo;
  chartData: ChartDataPoint[];
  createAction: (formData: TransactionFormData) => Promise<ActionResponse>;
  getAllAction: (page: number, pageSize: number, params: any) => Promise<GetAllTransactionResponse>;
};

export function DashboardContent({
  summary: initialSummary,
  wallets,
  categories,
  initialTransactions,
  initialPagination,
  chartData: initialChartData,
  createAction,
  getAllAction,
}: DashboardContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onOpenChange = (open: boolean) => setIsOpen(open);

  const [page, setPage] = useState(initialPagination.page);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>(initialPagination);

  // Data states
  const [summary, setSummary] = useState(initialSummary);
  const [chartData, setChartData] = useState(initialChartData);
  const [expensesByCategory, setExpensesByCategory] = useState<any[]>([]);

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

  // Date Range State
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

  // Calendar State
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
  const [dailyTransactions, setDailyTransactions] = useState<any[]>([]);
  const [dailyLoading, setDailyLoading] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');

  const refreshData = async (newPage: number, currentRange: { start: string | null; end: string | null }) => {
    setLoading(true);
    try {
      const startYMD = parseDDMMYYYYtoYYYYMMDD(currentRange.start || '');
      const endYMD = parseDDMMYYYYtoYYYYMMDD(currentRange.end || '');

      const [txRes, sumRes, chartRes, expensesRes] = await Promise.all([
        getAllAction(newPage, pagination.pageSize, { startDate: startYMD, endDate: endYMD }),
        getDashboardSummary(startYMD, endYMD),
        getChartData(startYMD, endYMD),
        getExpensesByCategory(startYMD, endYMD)
      ]);

      if (txRes.success && txRes.data) {
        setData(mapTransactions(txRes.data));
        setPagination(txRes.pagination!);
        setPage(newPage);
      }
      if (sumRes.success && sumRes.data) {
        setSummary(sumRes.data);
      }
      if (chartRes.success && chartRes.data) {
        setChartData(chartRes.data);
      }
      if (expensesRes.success && expensesRes.data) {
        setExpensesByCategory(expensesRes.data);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Whenever dateRange changes, refresh data (starting from page 1)
    if (dateRange.start && dateRange.end) {
      refreshData(1, dateRange);
    }
  }, [dateRange]);

  const handlePageChange = (newPage: number) => {
    refreshData(newPage, dateRange);
  };

  const handleSuccess = () => {
    refreshData(1, dateRange);
  };

  const handleCalendarClick = async (dateStr: string) => {
    setSelectedDateStr(dateStr);
    setIsDailyModalOpen(true);
    setDailyLoading(true);
    
    const res = await getTransactionsByDate(dateStr);
    if (res.success && res.data) {
      setDailyTransactions(res.data);
    } else {
      setDailyTransactions([]);
    }
    setDailyLoading(false);
  };

  const renderCell = (row: TableRowType, columnKey: string | number) => {
    const key = String(columnKey);
    const cellValue = row[key];

    if (key === 'type') {
      const isIncome = cellValue === 'INCOME';
      const isTransfer = cellValue === 'TRANSFER';
      return (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${isIncome ? 'bg-emerald-50 text-emerald-700' : isTransfer ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700'
            }`}
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          <div className="w-full md:w-64">
            <AppDateRangePicker
              value={dateRange}
              onChange={(val) => {
                if (val && val.start && val.end) {
                  setDateRange(val);
                }
              }}
            />
          </div>
          <Button color="primary" onPress={onOpen} startContent={<PlusIcon size={18} />} className="w-full md:w-auto">
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Main Top Card: Sekilas Hari Ini */}
      <Card className="bg-gradient-to-br from-primary-900 to-primary-800 text-white border-none shadow-xl w-full rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <Card.Content className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-primary-200">
              <span className="text-xl">⚡</span>
              <h3 className="font-semibold text-sm tracking-wider uppercase">Sekilas Bulan Ini</h3>
            </div>
            <p className="text-5xl font-bold mb-2 tracking-tight">{formatCurrency(summary.totalBalance)}</p>
            <p className="text-sm text-primary-200">💸 Total Saldo Keseluruhan</p>
          </div>

          <div className="flex flex-col md:flex-row md:justify-end gap-6 md:gap-12 text-left md:text-right">
            <div className="text-left md:text-right">
              <p className="text-xs text-primary-300 uppercase tracking-widest font-semibold mb-1">Pemasukan</p>
              <p className="text-2xl font-bold text-emerald-400">{formatCurrency(summary.monthlyIncome)}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs text-primary-300 uppercase tracking-widest font-semibold mb-1">Pengeluaran</p>
              <p className="text-2xl font-bold text-rose-400">{formatCurrency(summary.monthlyExpense)}</p>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Calendar Section */}
      <div className="w-full">
        <h3 className="font-bold text-lg mb-4 w-full text-left">Aktivitas Bulan Ini</h3>
        <ActivityCalendar
          currentMonthDate={parseDDMMYYYYtoYYYYMMDD(dateRange.start || '')}
          data={chartData}
          onDateClick={handleCalendarClick}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart Section */}
        <Card className="shadow-sm border-none">
          <Card.Content className="p-6">
            <h3 className="font-bold text-lg mb-6">Grafik Keuangan</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" tickFormatter={(val) => val.substring(8, 10)} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Tanggal: ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="income" name="Pemasukan" stroke="#059669" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="expense" name="Pengeluaran" stroke="#e11d48" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card.Content>
        </Card>

        {/* Expenses by Category Section */}
        <Card className="shadow-sm border-none">
          <Card.Content className="p-6">
            <h3 className="font-bold text-lg mb-6">Pengeluaran Terbesar</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={expensesByCategory} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={80} style={{ fontSize: '12px' }} />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    cursor={{fill: 'transparent'}}
                  />
                  <Bar dataKey="amount" fill="#e11d48" radius={[0, 4, 4, 0]} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Datatable Section */}
      <div className="w-full flex flex-col h-full overflow-hidden">
          <h3 className="font-bold text-lg mb-4 pl-2">Transaksi Terbaru</h3>
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

      <TransactionModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        wallets={wallets}
        categories={categories}
        createAction={createAction}
        onSuccess={handleSuccess}
      />

      <DailyTransactionsModal
        isOpen={isDailyModalOpen}
        onOpenChange={(open) => setIsDailyModalOpen(open)}
        dateStr={selectedDateStr}
        transactions={dailyTransactions}
        isLoading={dailyLoading}
      />
    </div>
  );
}
