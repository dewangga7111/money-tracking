import { Home, Settings, Users, ShieldCheck, LogOut, type LucideIcon } from 'lucide-react';

export type MenuItem = {
  key: string;
  label: string;
  path?: string;
  icon?: LucideIcon;
  children?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    key: 'HOME_PAGE',
    label: 'Home',
    path: '/about',
    icon: Home,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: Settings,
    children: [
      {
        key: 'USERS_PAGE',
        label: 'Users',
        path: '/users',
        icon: Users,
      },
      {
        key: 'ROLES_PAGE',
        label: 'Roles',
        path: '/roles',
        icon: ShieldCheck,
      },
    ],
  },
  {
    key: 'logout',
    label: 'Logout',
    path: '/logout',
    icon: LogOut,
  },
];
