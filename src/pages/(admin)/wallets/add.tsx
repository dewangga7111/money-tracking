import WalletForm from '@/components/pages/wallets/wallet-form';
import { createWalletAction } from '@/actions/wallet-action';
import { APP_NAME } from '@/lib/app-config';

export default async function AddWalletPage() {
  return (
    <div>
      <title>{`Add Wallet | ${APP_NAME}`}</title>
      <WalletForm createAction={createWalletAction} />
    </div>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
