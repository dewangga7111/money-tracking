import { DocumentationContent } from '@/components/pages/home-settings/documentation-content';
import { getDocumentationAction, upsertDocumentationAction } from '@/actions/documentation-section-action';
import { APP_NAME } from '@/lib/app-config';

export default async function HomeDocumentationPage() {
  const result = await getDocumentationAction();
  const initialData = result.success ? result.data : null;

  return (
    <>
      <title>{`Documentation Section | ${APP_NAME}`}</title>
      <DocumentationContent initialData={initialData} saveAction={upsertDocumentationAction} />
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
