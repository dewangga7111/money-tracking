import WalletForm from '@/components/pages/wallets/wallet-form';
import { getWalletByIdAction, updateWalletAction } from '@/actions/wallet-action';
import { APP_NAME } from '@/lib/app-config';

export default async function EditWalletPage({ id }: { id: string }) {
  const data = await getData(id);

  if (!data.success || !data.wallet) {
    return <div>Wallet not found</div>;
  }

  return (
    <div>
      <title>{`Edit Wallet | ${APP_NAME}`}</title>
      <WalletForm
        initialData={data.wallet}
        isEdit={true}
        updateAction={updateWalletAction}
      />
    </div>
  );
}

const getData = async (id: string) => {
  const result = await getWalletByIdAction(id);
  return {
    success: result.success,
    wallet: result.data,
  };
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
