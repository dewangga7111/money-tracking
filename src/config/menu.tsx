import { Settings, type LucideIcon, Database } from 'lucide-react';

export type MenuItem = {
  key: string;
  label: string;
  path?: string;
  icon?: LucideIcon;
  children?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    key: 'home_settings',
    label: 'Setting Compro',
    icon: Settings,
    children: [
      { key: 'HOME_HERO', label: 'Hero', path: '/home/hero' },
      { key: 'HOME_ABOUT', label: 'About Us', path: '/home/about' },
      { key: 'HOME_PRODUCTS', label: 'Products', path: '/home/products' },
      { key: 'HOME_BENEFIT', label: 'Benefit', path: '/home/benefit' },
      { key: 'HOME_HOWTO', label: 'How To', path: '/home/howto' },
      { key: 'HOME_GALLERY', label: 'Gallery', path: '/home/gallery' },
      { key: 'HOME_LEGAL', label: 'Legal', path: '/home/legal' },
      { key: 'HOME_DOCUMENTATION', label: 'Documentation', path: '/home/documentation' },
      { key: 'HOME_FOOTER', label: 'Footer', path: '/home/footer' },
    ],
  },
  {
    key: 'master',
    label: 'Master',
    icon: Database,
    children: [
      {
        key: 'USERS_PAGE',
        label: 'Users',
        path: '/users',
      },
      {
        key: 'ROLES_PAGE',
        label: 'Roles',
        path: '/role',
      },
    ],
  },
];
