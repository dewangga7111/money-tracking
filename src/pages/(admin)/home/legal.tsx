import { LegalContent } from '@/components/pages/home-settings/legal-content';
import { getLegalAction, upsertLegalAction } from '@/actions/legal-section-action';
import { APP_NAME } from '@/lib/app-config';

export default async function HomeLegalPage() {
  const result = await getLegalAction();
  const initialData = result.success ? result.data : null;

  return (
    <>
      <title>{`Legal Section | ${APP_NAME}`}</title>
      <LegalContent initialData={initialData} saveAction={upsertLegalAction} />
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
