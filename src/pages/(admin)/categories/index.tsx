import { CategoriesContent } from '@/components/pages/categories/categories-content';
import { getAllCategory, deleteCategoryAction } from '@/actions/category-action';
import { APP_NAME } from '@/lib/app-config';

export default async function CategoriesPage() {
  const data = await getData();

  return (
    <div>
      <title>{`${data.title} | ${APP_NAME}`}</title>
      <CategoriesContent
        initialData={data.data}
        initialPagination={data.pagination}
        deleteAction={deleteCategoryAction}
        getAllAction={getAllCategory}
      />
    </div>
  );
}

const getData = async () => {
  const result = await getAllCategory(1, 10);

  return {
    title: 'Categories',
    data: result.success ? result.data : [],
    pagination: result.pagination,
  };
};

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
