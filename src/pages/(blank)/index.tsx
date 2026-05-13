import { Suspense } from 'react';
import { HomeContent } from '@/components/pages/home/home-content';
import { HomeLoading } from '@/components/pages/home/home-loading';
import { getHeroAction } from '@/actions/home-section-action';
import { getAboutAction } from '@/actions/about-section-action';
import { getProductsAction } from '@/actions/products-section-action';

async function HomeData() {
  const [heroResult, aboutResult, productsResult] = await Promise.all([
    getHeroAction(),
    getAboutAction(),
    getProductsAction(),
  ]);
  const heroData = heroResult.success ? heroResult.data : null;
  const aboutData = aboutResult.success ? aboutResult.data : null;
  const productsData = productsResult.success ? productsResult.data : null;
  return <HomeContent heroData={heroData} aboutData={aboutData} productsData={productsData} />;
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
