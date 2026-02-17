import ResepForm from '@/components/pages/resep/resep-form';
import { getResepByIdAction, updateResepAction } from '@/actions/resep-action';

export default async function EditResepPage({ id }: { id: string }) {
  const data = await getData(id);

  if (!data.resep) {
    return (
      <div>
        <title>Resep Not Found</title>
        <div>Resep not found</div>
      </div>
    );
  }

  return (
    <div>
      <title>{data.title}</title>
      <ResepForm
        initialData={data.resep}
        isEdit={true}
        updateAction={updateResepAction}
      />
    </div>
  );
}

const getData = async (id: string) => {
  const result = await getResepByIdAction(id);

  const data = {
    title: 'Edit Resep',
    resep: result.success ? result.data : null,
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
