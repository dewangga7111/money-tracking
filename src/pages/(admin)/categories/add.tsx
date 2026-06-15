import CategoryForm from '@/components/pages/categories/category-form';
import { createCategoryAction } from '@/actions/category-action';
import { APP_NAME } from '@/lib/app-config';

export default async function AddCategoryPage() {
  return (
    <div>
      <title>{`Add Category | ${APP_NAME}`}</title>
      <CategoryForm createAction={createCategoryAction} />
    </div>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
