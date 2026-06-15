import { getWalletSummaryAction } from '@/actions/wallet-action';
import { getAllTransaction } from '@/actions/transaction-action';
import { WalletDetailContent } from '@/components/pages/wallets/wallet-detail-content';

export default async function WalletDetailPage({ id }: { id: string }) {
  // Default to current month
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const formatDate = (d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const startYMD = formatDate(firstDay);
  const endYMD = formatDate(lastDay);

  // Fetch summary and transactions for the current month
  const summaryRes = await getWalletSummaryAction(id, startYMD, endYMD);
  const txRes = await getAllTransaction(1, 10, { walletId: id, startDate: startYMD, endDate: endYMD });

  if (!summaryRes.success || !summaryRes.data) {
    return (
      <div className="flex justify-center p-12">
        <p className="text-red-500">Failed to load wallet details: {summaryRes.error}</p>
      </div>
    );
  }

  const { wallet, totalIncome, totalExpense } = summaryRes.data;

  return (
    <WalletDetailContent
      walletId={wallet.walletId}
      walletName={wallet.name}
      walletType={wallet.type}
      totalBalance={wallet.totalBalance}
      totalIncome={totalIncome}
      totalExpense={totalExpense}
      initialTransactions={txRes.data || []}
      initialPagination={txRes.pagination || { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 }}
      getAllAction={getAllTransaction}
    />
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
