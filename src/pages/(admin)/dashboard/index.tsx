import { DashboardContent } from '@/components/pages/dashboard/dashboard-content';
import { getDashboardSummary, getAllTransaction, createTransactionAction, getChartData } from '@/actions/transaction-action';
import { getAllWallet } from '@/actions/wallet-action';
import { getAllCategory } from '@/actions/category-action';
import { APP_NAME } from '@/lib/app-config';

export default async function DashboardPage() {
  const data = await getData();

  return (
    <div>
      <title>{`Dashboard | ${APP_NAME}`}</title>
      <DashboardContent
        summary={data.summary!}
        wallets={data.wallets}
        categories={data.categories}
        initialTransactions={data.transactions}
        initialPagination={data.pagination}
        chartData={data.chartData}
        createAction={createTransactionAction}
        getAllAction={getAllTransaction}
      />
    </div>
  );
}

const getData = async () => {
  const [summaryRes, walletsRes, categoriesRes, txsRes, chartRes] = await Promise.all([
    getDashboardSummary(),
    getAllWallet(1, 100),
    getAllCategory(1, 100),
    getAllTransaction(1, 10),
    getChartData(),
  ]);

  return {
    summary: summaryRes.success ? summaryRes.data : { totalBalance: 0, monthlyIncome: 0, monthlyExpense: 0 },
    wallets: walletsRes.success ? walletsRes.data : [],
    categories: categoriesRes.success ? categoriesRes.data : [],
    transactions: txsRes.success ? txsRes.data : [],
    pagination: txsRes.pagination,
    chartData: chartRes.success ? chartRes.data : [],
  };
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
