import '../styles.css';

import type { ReactNode } from 'react';
import { SidebarWrapper } from '../components/sidebar-wrapper';
import { Navbar } from '../components/navbar';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className="font-sans antialiased">
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <SidebarWrapper />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
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
