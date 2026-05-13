import { Suspense } from 'react';
import { HomeContent } from '@/components/pages/home/home-content';
import { HomeLoading } from '@/components/pages/home/home-loading';
import { getHeroAction } from '@/actions/home-section-action';
import { getAboutAction } from '@/actions/about-section-action';

async function HomeData() {
  const [heroResult, aboutResult] = await Promise.all([getHeroAction(), getAboutAction()]);
  const heroData = heroResult.success ? heroResult.data : null;
  const aboutData = aboutResult.success ? aboutResult.data : null;
  return <HomeContent heroData={heroData} aboutData={aboutData} />;
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
