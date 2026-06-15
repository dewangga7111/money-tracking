import { WalletsContent } from '@/components/pages/wallets/wallets-content';
import { getAllWallet, deleteWalletAction } from '@/actions/wallet-action';
import { APP_NAME } from '@/lib/app-config';

export default async function WalletsPage() {
  const data = await getData();

  return (
    <div>
      <title>{`${data.title} | ${APP_NAME}`}</title>
      <WalletsContent
        initialData={data.data}
        initialPagination={data.pagination}
        deleteAction={deleteWalletAction}
        getAllAction={getAllWallet}
      />
    </div>
  );
}

const getData = async () => {
  const result = await getAllWallet(1, 10);

  return {
    title: 'Wallets',
    data: result.success ? result.data : [],
    pagination: result.pagination,
  };
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
