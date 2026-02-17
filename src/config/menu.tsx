import { Home, Settings, CookingPot, Users, LogOut, type LucideIcon } from 'lucide-react';

export type MenuItem = {
  key: string;
  label: string;
  path?: string;
  icon?: LucideIcon;
  children?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    key: 'RESEP_PAGE',
    label: 'Resep',
    path: '/resep',
    icon: CookingPot,
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
      // {
      //   key: 'ROLES_PAGE',
      //   label: 'Roles',
      //   path: '/about',
      //   icon: ShieldCheck,
      // },
    ],
  },
];
