'use client';

export function Footer() {
  const year = new Date().getFullYear();
  const appName = import.meta.env.WAKU_PUBLIC_WEB_TITLE || 'Waku Admin';

  return (
    <footer className="text-center py-3 border-t border-default-100 text-sm text-default-500">
      © {year} {appName}. All rights reserved.
    </footer>
  );
}
