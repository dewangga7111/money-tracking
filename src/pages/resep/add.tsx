import ResepForm from '@/components/pages/resep/resep-form';
import { createResepAction } from '@/actions/resep-action';
import { getAllBahan } from '@/actions/bahan-action';

export default async function AddResepPage() {
  const data = await getData();

  return (
    <div>
      <title>{data.title}</title>
      <ResepForm createAction={createResepAction} availableBahan={data.bahan} />
    </div>
  );
}

const getData = async () => {
  const bahanResult = await getAllBahan(1, 1000);

  const data = {
    title: 'Add Resep',
    bahan: bahanResult.success ? bahanResult.data : [],
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
