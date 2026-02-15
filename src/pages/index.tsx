import { HomeContent } from '../components/home/home-content';

export default async function HomePage() {
  const data = await getData();

  return (
    <>
      <title>{data.title}</title>
      <HomeContent />
    </>
  );
}

const getData = async () => {
  const data = {
    title: 'Admin Dashboard',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
