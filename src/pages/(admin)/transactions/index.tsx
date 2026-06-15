import TransactionsContent from '@/components/pages/transactions/transactions-content';
import { getAllTransaction, createTransactionAction, updateTransactionAction, createBulkTransactionsAction } from '@/actions/transaction-action';
import { getAllWallet } from '@/actions/wallet-action';
import { getAllCategory } from '@/actions/category-action';
import { APP_NAME } from '@/lib/app-config';

export default async function TransactionsPage() {
  const data = await getData();

  return (
    <div>
      <title>{`${data.title} | ${APP_NAME}`}</title>
      <TransactionsContent
        wallets={data.wallets}
        categories={data.categories}
        initialTransactions={data.initialTransactions}
        createAction={createTransactionAction}
        updateAction={updateTransactionAction}
        createBulkAction={createBulkTransactionsAction}
        getAllAction={getAllTransaction}
      />
    </div>
  );
}

const getData = async () => {
  const [txRes, walletRes, catRes] = await Promise.all([
    getAllTransaction(1, 50, {}), // Fetch initial 50 transactions
    getAllWallet(1, 100),
    getAllCategory(1, 100),
  ]);

  return {
    title: 'Transaksi',
    initialTransactions: txRes.success && txRes.data ? txRes.data : [],
    wallets: walletRes.success && walletRes.data ? walletRes.data : [],
    categories: catRes.success && catRes.data ? catRes.data : [],
  };
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
