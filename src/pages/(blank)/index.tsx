import { HomeContent } from '@/components/pages/home/home-content';

export default async function HomePage() {
  return (
    <>
      <title>PT. Mandraguna Pusaka Indonesia</title>
      <HomeContent />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
