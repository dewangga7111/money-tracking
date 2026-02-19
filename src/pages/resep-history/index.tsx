import { ResepHistoryContent } from '@/components/pages/resep-history/resep-history-content';
import { getAllResepHistory } from '@/actions/resep-history-action';

export default async function ResepHistoryPage() {
  const data = await getData();

  return (
    <>
      <title>{data.title}</title>
      <ResepHistoryContent
        initialData={data.data}
        initialPagination={data.pagination}
        getAllAction={getAllResepHistory}
      />
    </>
  );
}

const getData = async () => {
  const result = await getAllResepHistory(1, 10);

  const data = {
    title: 'Recipe Execution History',
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
