import { Suspense } from 'react';
import { HomeContent } from '@/components/pages/home/home-content';
import { HomeLoading } from '@/components/pages/home/home-loading';
import { getHeroAction } from '@/actions/home-section-action';

async function HomeData() {
  const heroResult = await getHeroAction();
  const heroData = heroResult.success ? heroResult.data : null;
  return <HomeContent heroData={heroData} />;
}

export default async function HomePage() {
  return (
    <>
      <title>PT. Mandraguna Pusaka Indonesia</title>
      <Suspense fallback={<HomeLoading />}>
        <HomeData />
      </Suspense>
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
