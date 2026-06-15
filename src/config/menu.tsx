import { Settings, type LucideIcon, LayoutDashboard, WalletCards } from 'lucide-react';

export type MenuItem = {
  key: string;
  label: string;
  path?: string;
  icon?: LucideIcon;
  children?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    key: 'DASHBOARD_PAGE',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    key: 'WALLETS_PAGE',
    label: 'Wallets',
    path: '/wallets',
    icon: WalletCards,
  },
  {
    key: 'master',
    label: 'Master',
    icon: Settings,
    children: [
      {
        key: 'CATEGORIES_PAGE',
        label: 'Categories',
        path: '/categories',
      },
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
