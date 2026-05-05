import { HomeContent } from '@/components/pages/home/home-content';
import { APP_NAME } from '@/lib/app-config';

export default async function HomePage() {
  const data = await getData();

  return (
    <>
      <title>{`${data.title} | ${APP_NAME}`}</title>
      <HomeContent />
    </>
  );
}

const getData = async () => {
  const data = {
    title: 'Admin Dashboard',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
