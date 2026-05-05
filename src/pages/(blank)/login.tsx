import { LoginContent } from '@/components/pages/login/login-content';
import { APP_NAME } from '@/lib/app-config';

export default function LoginPage() {
  return <div>
    <title>{`Login | ${APP_NAME}`}</title>
    <LoginContent />
  </div>;
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
