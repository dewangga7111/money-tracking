import { FooterContent } from '@/components/pages/home-settings/footer-content';
import { getFooterAction, upsertFooterAction } from '@/actions/footer-section-action';
import { APP_NAME } from '@/lib/app-config';

export default async function HomeFooterPage() {
  const result = await getFooterAction();
  const initialData = result.success ? result.data : null;

  return (
    <>
      <title>{`Footer Section | ${APP_NAME}`}</title>
      <FooterContent initialData={initialData} saveAction={upsertFooterAction} />
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
