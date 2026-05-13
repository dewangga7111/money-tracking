import { AboutContent } from '@/components/pages/home-settings/about-content';
import { getAboutAction, upsertAboutAction } from '@/actions/about-section-action';
import { APP_NAME } from '@/lib/app-config';

export default async function HomeAboutPage() {
  const result = await getAboutAction();
  const initialData = result.success ? result.data : null;

  return (
    <>
      <title>{`About Us Section | ${APP_NAME}`}</title>
      <AboutContent initialData={initialData} saveAction={upsertAboutAction} />
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
