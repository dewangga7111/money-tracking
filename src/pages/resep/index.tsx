import { ResepContent } from '@/components/pages/resep/resep-content';
import { getAllResep, deleteResepAction } from '@/actions/resep-action';

export default async function ResepPage() {
  const data = await getData();

  return (
    <>
      <title>{data.title}</title>
      <ResepContent
        initialData={data.data}
        initialPagination={data.pagination}
        deleteAction={deleteResepAction}
        getAllAction={getAllResep}
      />
    </>
  );
}

const getData = async () => {
  const result = await getAllResep(1, 10);

  const data = {
    title: 'Resep',
    data: result.success ? result.data : [],
    pagination: result.pagination,
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
