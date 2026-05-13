import { ProductsContent } from '@/components/pages/home-settings/products-content';
import { getProductsAction, upsertProductsAction } from '@/actions/products-section-action';
import { APP_NAME } from '@/lib/app-config';

export default async function HomeProductsPage() {
  const result = await getProductsAction();
  const initialData = result.success ? result.data : null;

  return (
    <>
      <title>{`Products Section | ${APP_NAME}`}</title>
      <ProductsContent initialData={initialData} saveAction={upsertProductsAction} />
    </>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
