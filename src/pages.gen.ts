// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_AdminAbout_getConfig } from './pages/(admin)/about';
// prettier-ignore
import type { getConfig as File_AdminCategoriesAdd_getConfig } from './pages/(admin)/categories/add';
// prettier-ignore
import type { getConfig as File_AdminCategoriesEditId_getConfig } from './pages/(admin)/categories/edit/[id]';
// prettier-ignore
import type { getConfig as File_AdminCategoriesIndex_getConfig } from './pages/(admin)/categories/index';
// prettier-ignore
import type { getConfig as File_AdminDashboardIndex_getConfig } from './pages/(admin)/dashboard/index';
// prettier-ignore
import type { getConfig as File_AdminRoleAdd_getConfig } from './pages/(admin)/role/add';
// prettier-ignore
import type { getConfig as File_AdminRoleEditId_getConfig } from './pages/(admin)/role/edit/[id]';
// prettier-ignore
import type { getConfig as File_AdminRoleIndex_getConfig } from './pages/(admin)/role/index';
// prettier-ignore
import type { getConfig as File_AdminTransactionsIndex_getConfig } from './pages/(admin)/transactions/index';
// prettier-ignore
import type { getConfig as File_AdminUsersAdd_getConfig } from './pages/(admin)/users/add';
// prettier-ignore
import type { getConfig as File_AdminUsersEditId_getConfig } from './pages/(admin)/users/edit/[id]';
// prettier-ignore
import type { getConfig as File_AdminUsersIndex_getConfig } from './pages/(admin)/users/index';
// prettier-ignore
import type { getConfig as File_AdminWalletsAdd_getConfig } from './pages/(admin)/wallets/add';
// prettier-ignore
import type { getConfig as File_AdminWalletsDetailId_getConfig } from './pages/(admin)/wallets/detail/[id]';
// prettier-ignore
import type { getConfig as File_AdminWalletsEditId_getConfig } from './pages/(admin)/wallets/edit/[id]';
// prettier-ignore
import type { getConfig as File_AdminWalletsIndex_getConfig } from './pages/(admin)/wallets/index';
// prettier-ignore
import type { getConfig as File_BlankLogin_getConfig } from './pages/(blank)/login';

// prettier-ignore
type Page =
| ({ path: '/about' } & GetConfigResponse<typeof File_AdminAbout_getConfig>)
| ({ path: '/categories/add' } & GetConfigResponse<typeof File_AdminCategoriesAdd_getConfig>)
| ({ path: '/categories/edit/[id]' } & GetConfigResponse<typeof File_AdminCategoriesEditId_getConfig>)
| ({ path: '/categories' } & GetConfigResponse<typeof File_AdminCategoriesIndex_getConfig>)
| ({ path: '/dashboard' } & GetConfigResponse<typeof File_AdminDashboardIndex_getConfig>)
| ({ path: '/role/add' } & GetConfigResponse<typeof File_AdminRoleAdd_getConfig>)
| ({ path: '/role/edit/[id]' } & GetConfigResponse<typeof File_AdminRoleEditId_getConfig>)
| ({ path: '/role' } & GetConfigResponse<typeof File_AdminRoleIndex_getConfig>)
| ({ path: '/transactions' } & GetConfigResponse<typeof File_AdminTransactionsIndex_getConfig>)
| ({ path: '/users/add' } & GetConfigResponse<typeof File_AdminUsersAdd_getConfig>)
| ({ path: '/users/edit/[id]' } & GetConfigResponse<typeof File_AdminUsersEditId_getConfig>)
| ({ path: '/users' } & GetConfigResponse<typeof File_AdminUsersIndex_getConfig>)
| ({ path: '/wallets/add' } & GetConfigResponse<typeof File_AdminWalletsAdd_getConfig>)
| ({ path: '/wallets/detail/[id]' } & GetConfigResponse<typeof File_AdminWalletsDetailId_getConfig>)
| ({ path: '/wallets/edit/[id]' } & GetConfigResponse<typeof File_AdminWalletsEditId_getConfig>)
| ({ path: '/wallets' } & GetConfigResponse<typeof File_AdminWalletsIndex_getConfig>)
| ({ path: '/login' } & GetConfigResponse<typeof File_BlankLogin_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
