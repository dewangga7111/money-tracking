import { AboutContent } from '../components/pages/about/about-content';

export default async function AboutPage() {
  const data = await getData();

  return (
    <>
      <title>{data.title}</title>
      <AboutContent />
    </>
  );
}

const getData = async () => {
  const data = {
    title: 'About - Admin Template',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
