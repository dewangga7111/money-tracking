import { BahanContent } from '@/components/pages/bahan/bahan-content';
import { getAllBahan, deleteBahanAction } from '@/actions/bahan';

export default async function BahanPage() {
  const data = await getData();

  return (
    <>
      <title>{data.title}</title>
      <BahanContent
        initialData={data.data}
        initialPagination={data.pagination}
        deleteAction={deleteBahanAction}
        getAllAction={getAllBahan}
      />
    </>
  );
}

const getData = async () => {
  const result = await getAllBahan(1, 10);

  const data = {
    title: 'Bahan',
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
