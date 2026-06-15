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
