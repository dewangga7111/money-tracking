import CategoryForm from '@/components/pages/categories/category-form';
import { getCategoryByIdAction, updateCategoryAction } from '@/actions/category-action';
import { APP_NAME } from '@/lib/app-config';

export default async function EditCategoryPage({ id }: { id: string }) {
  const data = await getData(id);

  if (!data.success || !data.category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <title>{`Edit Category | ${APP_NAME}`}</title>
      <CategoryForm
        initialData={data.category}
        isEdit={true}
        updateAction={updateCategoryAction}
      />
    </div>
  );
}

const getData = async (id: string) => {
  const result = await getCategoryByIdAction(id);
  return {
    success: result.success,
    category: result.data,
  };
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
