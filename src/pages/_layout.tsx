import '../styles.css';

import type { ReactNode } from 'react';
import { Providers } from '@/components/providers';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans antialiased">
      <meta name="description" content="Admin Template - Waku + Tailwind CSS" />
      <link rel="icon" type="image/png" href="/images/favicon.png" />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.remove('dark');`,
        }}
      />
      <Providers>{children}</Providers>
    </div>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
