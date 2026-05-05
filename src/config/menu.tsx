import { Settings, type LucideIcon } from 'lucide-react';

export type MenuItem = {
  key: string;
  label: string;
  path?: string;
  icon?: LucideIcon;
  children?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    key: 'settings',
    label: 'Settings',
    icon: Settings,
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
