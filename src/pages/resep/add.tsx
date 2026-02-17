import ResepForm from '@/components/pages/resep/resep-form';

export default async function AddResepPage() {
  const data = await getData();

  return (
    <div>
      <title>{data.title}</title>
      <ResepForm />
    </div>
  );
}

const getData = async () => {
  const data = {
    title: 'Add Resep',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
