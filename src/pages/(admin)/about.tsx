import { AboutContent } from '@/components/pages/about/about-content';
import { APP_NAME } from '@/lib/app-config';

export default async function AboutPage() {
  const data = await getData();

  return (
    <>
      <title>{`${data.title} | ${APP_NAME}`}</title>
      <AboutContent />
    </>
  );
}

const getData = async () => {
  const data = {
    title: 'About',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
