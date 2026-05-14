import { HowToContent } from '@/components/pages/home-settings/howto-content';
import { getHowToAction, upsertHowToAction } from '@/actions/howto-section-action';
import { APP_NAME } from '@/lib/app-config';

export default async function HomeHowToPage() {
  const result = await getHowToAction();
  const initialData = result.success ? result.data : null;

  return (
    <>
      <title>{`How To Section | ${APP_NAME}`}</title>
      <HowToContent initialData={initialData} saveAction={upsertHowToAction} />
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
