'use client';

import { useState, useMemo } from 'react';
import { Button, Dropdown } from '@heroui/react';
import { Plus, Layers, Search, Calendar, Wallet as WalletIcon, ListFilter, ArrowRightLeft, Pen, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/common';
import TransactionModal from './transaction-modal';
import BulkTransactionModal from './bulk-transaction-modal';
import { useConfirmation } from '@/contexts/confirmation-context';
import type { TbWallet, TbCategory } from '@prisma/client';
import type { TransactionFormData, GetAllTransactionResponse } from '@/types/transaction';
import type { ActionResponse } from '@/types/response';
import { deleteTransactionAction } from '@/actions/transaction-action';
import { showSuccessToast, showErrorToast } from '@/utils/common';

type TransactionsContentProps = {
  wallets: TbWallet[];
  categories: TbCategory[];
  initialTransactions: any[];
  createAction: (formData: TransactionFormData) => Promise<ActionResponse>;
  updateAction?: (id: string, formData: TransactionFormData) => Promise<ActionResponse>;
  createBulkAction: (formDataArray: TransactionFormData[]) => Promise<ActionResponse>;
  getAllAction: (page: number, pageSize: number, params: any) => Promise<GetAllTransactionResponse>;
};

export default function TransactionsContent({
  wallets,
  categories,
  initialTransactions,
  createAction,
  updateAction,
  createBulkAction,
  getAllAction,
}: TransactionsContentProps) {
  const { confirm } = useConfirmation();
  const [transactions, setTransactions] = useState<any[]>(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTime, setFilterTime] = useState('ALL');
  const [filterWallet, setFilterWallet] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const refreshData = async () => {
    // Basic fetch logic to refresh top 50 transactions
    const res = await getAllAction(1, 50, {});
    if (res.success && res.data) {
      setTransactions(res.data);
    }
  };

  const handleSuccess = () => {
    setSelectedTx(null);
    refreshData();
  };

  const handleDelete = async (id: string) => {
    confirm({
      message: 'Apakah Anda yakin ingin menghapus transaksi ini?',
      onConfirm: async () => {
        const res = await deleteTransactionAction(id);
        if (res.success) {
          showSuccessToast('Transaksi berhasil dihapus');
          refreshData();
        } else {
          showErrorToast('Gagal menghapus transaksi');
        }
      },
    });
  };

  const formatToRelativeOrLong = (timestamp: number) => {
    const d = new Date(timestamp);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 86400000;

    if (timestamp === today) return 'HARI INI';
    if (timestamp === yesterday) return 'KEMARIN';

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const filteredTransactions = useMemo(() => {
    let result = transactions;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (tx) =>
          (tx.notes && tx.notes.toLowerCase().includes(q)) ||
          (tx.category?.name && tx.category.name.toLowerCase().includes(q)) ||
          (tx.wallet?.name && tx.wallet.name.toLowerCase().includes(q))
      );
    }

    if (filterWallet !== 'ALL') {
      result = result.filter(tx => String(tx.walletId) === filterWallet || String(tx.toWalletId) === filterWallet);
    }

    if (filterType !== 'ALL') {
      result = result.filter(tx => tx.type === filterType);
    }

    if (filterCategory !== 'ALL') {
      result = result.filter(tx => String(tx.categoryId) === filterCategory);
    }

    if (filterTime !== 'ALL') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      result = result.filter(tx => {
        const txTime = new Date(tx.date).getTime();
        if (filterTime === 'TODAY') return txTime >= today;
        if (filterTime === 'MONTH') {
          const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
          return txTime >= firstDayOfMonth;
        }
        return true;
      });
    }

    return result;
  }, [transactions, searchQuery, filterWallet, filterType, filterCategory, filterTime]);

  const groupedTransactions = useMemo(() => {
    const groups: Record<string, any[]> = {};
    filteredTransactions.forEach((tx) => {
      const d = new Date(tx.date);
      d.setHours(0, 0, 0, 0);
      const key = d.getTime().toString();
      if (!groups[key]) groups[key] = [];
      groups[key].push(tx);
    });

    return Object.keys(groups)
      .sort((a, b) => Number(b) - Number(a))
      .map((key) => ({
        timestamp: Number(key),
        dateLabel: formatToRelativeOrLong(Number(key)),
        items: groups[key],
      }));
  }, [filteredTransactions]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getAmountColor = (type: string) => {
    if (type === 'INCOME') return 'text-emerald-600';
    if (type === 'EXPENSE') return 'text-rose-600';
    return 'text-gray-800';
  };

  const getAmountPrefix = (type: string) => {
    if (type === 'INCOME') return '+';
    if (type === 'EXPENSE') return '-';
    return '';
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Transaksi</h1>
          <p className="text-gray-500 mt-1">Uangmu lari ke mana aja?</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="bordered"
            className="border-gray-200 text-gray-700 bg-white shadow-sm rounded-xl"
            startContent={<Layers size={16} />}
            onPress={() => setIsBulkModalOpen(true)}
          >
            Tambah Banyak
          </Button>
          <Button
            color="primary"
            className="font-semibold shadow-sm rounded-xl"
            startContent={<Plus size={18} />}
            onPress={() => {
              setSelectedTx(null);
              setIsModalOpen(true);
            }}
          >
            Transaksi Baru
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Cari catatan..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* WAKTU FILTER */}
          <Dropdown>
            <Dropdown.Trigger>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
                <Calendar size={14} className="text-gray-400" />
                {filterTime === 'ALL' ? 'Semua Waktu' : `Waktu: ${filterTime === 'TODAY' ? 'Hari Ini' : 'Bulan Ini'}`}
              </button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu aria-label="Pilih Waktu">
                <Dropdown.Item key="ALL" onPress={() => setFilterTime('ALL')}>Semua Waktu</Dropdown.Item>
                <Dropdown.Item key="TODAY" onPress={() => setFilterTime('TODAY')}>Hari Ini</Dropdown.Item>
                <Dropdown.Item key="MONTH" onPress={() => setFilterTime('MONTH')}>Bulan Ini</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {/* DOMPET FILTER */}
          <Dropdown>
            <Dropdown.Trigger>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-colors max-w-[150px] truncate">
                <WalletIcon size={14} className="text-gray-400 shrink-0" />
                <span className="truncate">{filterWallet === 'ALL' ? 'Semua Dompet' : `Dompet: ${wallets.find(w => String(w.walletId) === filterWallet)?.name || ''}`}</span>
              </button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu aria-label="Pilih Dompet" className="max-h-60 overflow-y-auto">
                <Dropdown.Item key="ALL" onPress={() => setFilterWallet('ALL')}>Semua Dompet</Dropdown.Item>
                {wallets.map(w => (
                  <Dropdown.Item key={w.walletId} onPress={() => setFilterWallet(String(w.walletId))}>{w.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {/* TIPE FILTER */}
          <Dropdown>
            <Dropdown.Trigger>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
                <ArrowRightLeft size={14} className="text-gray-400" />
                {filterType === 'ALL' ? 'Semua Tipe' : `Tipe: ${filterType === 'INCOME' ? 'Pemasukan' : filterType === 'EXPENSE' ? 'Pengeluaran' : 'Transfer'}`}
              </button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu aria-label="Pilih Tipe">
                <Dropdown.Item key="ALL" onPress={() => setFilterType('ALL')}>Semua Tipe</Dropdown.Item>
                <Dropdown.Item key="INCOME" onPress={() => setFilterType('INCOME')}>Pemasukan</Dropdown.Item>
                <Dropdown.Item key="EXPENSE" onPress={() => setFilterType('EXPENSE')}>Pengeluaran</Dropdown.Item>
                <Dropdown.Item key="TRANSFER" onPress={() => setFilterType('TRANSFER')}>Transfer</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {/* KATEGORI FILTER */}
          <Dropdown>
            <Dropdown.Trigger>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-colors max-w-[160px] truncate">
                <ListFilter size={14} className="text-gray-400 shrink-0" />
                <span className="truncate">{filterCategory === 'ALL' ? 'Semua Kategori' : `Kategori: ${categories.find(c => String(c.categoryId) === filterCategory)?.name || ''}`}</span>
              </button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu aria-label="Pilih Kategori" className="max-h-60 overflow-y-auto">
                <Dropdown.Item key="ALL" onPress={() => setFilterCategory('ALL')}>Semua Kategori</Dropdown.Item>
                {categories.map(c => (
                  <Dropdown.Item key={c.categoryId} onPress={() => setFilterCategory(String(c.categoryId))}>{c.icon} {c.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </div>

      {/* Transactions List */}
      <div className="flex flex-col gap-8 mt-2">
        {groupedTransactions.length === 0 ? (
          <div className="py-20 text-center text-gray-400 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
              <Search size={24} className="text-gray-300" />
            </div>
            <p className="font-semibold text-gray-600">Tidak ada transaksi</p>
            <p className="text-sm">Belum ada catatan transaksi untuk pencarian ini.</p>
          </div>
        ) : (
          groupedTransactions.map((group) => (
            <div key={group.timestamp} className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase ml-1">
                {group.dateLabel}
              </h3>
              <div className="flex flex-col gap-2">
                {group.items.map((tx) => {
                  const isExpanded = expandedId === tx.transactionId;
                  const catName = tx.category?.name || 'Lainnya';
                  const catIcon = tx.category?.icon || (tx.type === 'TRANSFER' ? '🔄' : '📦');

                  return (
                    <div
                      key={tx.transactionId}
                      className={`flex flex-col bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${isExpanded
                          ? 'border-primary/30 shadow-md ring-1 ring-primary/10'
                          : 'border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md cursor-pointer'
                        }`}
                    >
                      {/* Compact View */}
                      <div
                        className="flex items-center justify-between p-4"
                        onClick={() => toggleExpand(tx.transactionId)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gray-50 border border-gray-100`}>
                            {catIcon}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900">
                              {tx.notes || catName}
                            </span>
                            <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                              {tx.type === 'TRANSFER' ? (
                                <ArrowRightLeft size={12} className="text-blue-400" />
                              ) : (
                                <ListFilter size={12} className="text-gray-400" />
                              )}
                              {catName}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`font-bold font-mono tracking-tight text-lg ${getAmountColor(tx.type)}`}>
                            {getAmountPrefix(tx.type)} {formatCurrency(Number(tx.amount))}
                          </span>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dari Dompet</span>
                              <span className="font-semibold text-gray-800">{tx.wallet?.name || '-'}</span>
                            </div>
                            {tx.type === 'TRANSFER' && (
                              <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ke Dompet</span>
                                <span className="font-semibold text-gray-800">{tx.toWallet?.name || '-'}</span>
                              </div>
                            )}
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori</span>
                              <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                                {catIcon} {catName}
                              </span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Waktu</span>
                              <span className="font-semibold text-gray-800">
                                {new Date(tx.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mt-4 border-t border-gray-200/60 pt-4">
                            <Button
                              size="sm"
                              variant="flat"
                              className="bg-white border border-gray-200 text-gray-700 font-medium flex-1 md:flex-none hover:bg-gray-50 rounded-lg"
                              startContent={<Pen size={14} />}
                              onPress={() => {
                                setSelectedTx(tx);
                                setIsModalOpen(true);
                              }}
                            >
                              Ubah
                            </Button>
                            <Button
                              size="sm"
                              color="danger"
                              variant="flat"
                              className="bg-rose-50 text-rose-600 font-medium flex-1 md:flex-none hover:bg-rose-100 rounded-lg"
                              startContent={<Trash2 size={14} />}
                              onPress={() => handleDelete(tx.transactionId)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedTx(null);
        }}
        wallets={wallets}
        categories={categories}
        initialData={selectedTx}
        createAction={createAction}
        updateAction={updateAction}
        onSuccess={handleSuccess}
      />

      <BulkTransactionModal
        isOpen={isBulkModalOpen}
        onOpenChange={setIsBulkModalOpen}
        wallets={wallets}
        categories={categories}
        createBulkAction={createBulkAction}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
