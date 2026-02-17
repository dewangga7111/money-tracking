import '../styles.css';

import type { ReactNode } from 'react';
import { LayoutWrapper } from '../components/layout-wrapper';
import { Providers } from '../components/providers';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className="font-sans antialiased">
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.remove('dark');`,
        }}
      />
      <Providers>
        <LayoutWrapper>{children}</LayoutWrapper>
      </Providers>
    </div>
  );
}

const getData = async () => {
  const data = {
    description: 'Admin Template - Waku + Tailwind CSS',
    icon: '/images/favicon.png',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
