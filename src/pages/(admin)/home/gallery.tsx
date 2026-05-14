import { GalleryContent } from '@/components/pages/home-settings/gallery-content';
import { getGalleryAction, upsertGalleryAction } from '@/actions/gallery-section-action';
import { APP_NAME } from '@/lib/app-config';

export default async function HomeGalleryPage() {
  const result = await getGalleryAction();
  const initialData = result.success ? result.data : null;

  return (
    <>
      <title>{`Gallery Section | ${APP_NAME}`}</title>
      <GalleryContent initialData={initialData} saveAction={upsertGalleryAction} />
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
