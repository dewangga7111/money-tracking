import { ResepContent } from '@/components/pages/resep/resep-content';

export default async function AboutPage() {
  const data = await getData();

  return (
    <>
      <title>{data.title}</title>
      <ResepContent />
    </>
  );
}

const getData = async () => {
  const data = {
    title: 'Resep',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
