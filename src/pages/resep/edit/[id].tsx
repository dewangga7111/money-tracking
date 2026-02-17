import ResepForm from '@/components/pages/resep/resep-form';

export default async function EditResepPage({ id }: { id: string }) {
  const data = await getData(id);

  return (
    <div>
      <title>{data.title}</title>
      <ResepForm initialData={data.resep} isEdit={true} />
    </div>
  );
}

const getData = async (id: string) => {
  // Mock data - in real app, fetch from API/database
  const mockData = {
    name: 'Nasi Goreng',
    bahan:
      '- 2 piring nasi putih\n- 2 butir telur\n- 3 siung bawang putih\n- 2 sdm kecap manis\n- Garam secukupnya',
    resep:
      '1. Tumis bawang putih hingga harum\n2. Masukkan telur, orak-arik\n3. Masukkan nasi, aduk rata\n4. Tambahkan kecap dan garam\n5. Sajikan selagi hangat',
  };

  const data = {
    title: 'Edit Resep',
    resep: mockData,
    id,
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
