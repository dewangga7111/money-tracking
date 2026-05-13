import { HeroContent } from '@/components/pages/home-settings/hero-content';
import { getHeroAction, upsertHeroAction } from '@/actions/home-section-action';
import { APP_NAME } from '@/lib/app-config';

export default async function HomeHeroPage() {
  const result = await getHeroAction();
  const initialData = result.success ? result.data : null;

  return (
    <>
      <title>{`Hero Section | ${APP_NAME}`}</title>
      <HeroContent initialData={initialData} saveAction={upsertHeroAction} />
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
