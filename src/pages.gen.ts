// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_AdminAbout_getConfig } from './pages/(admin)/about';
// prettier-ignore
import type { getConfig as File_AdminHomeAbout_getConfig } from './pages/(admin)/home/about';
// prettier-ignore
import type { getConfig as File_AdminHomeBenefit_getConfig } from './pages/(admin)/home/benefit';
// prettier-ignore
import type { getConfig as File_AdminHomeDocumentation_getConfig } from './pages/(admin)/home/documentation';
// prettier-ignore
import type { getConfig as File_AdminHomeGallery_getConfig } from './pages/(admin)/home/gallery';
// prettier-ignore
import type { getConfig as File_AdminHomeHero_getConfig } from './pages/(admin)/home/hero';
// prettier-ignore
import type { getConfig as File_AdminHomeHowto_getConfig } from './pages/(admin)/home/howto';
// prettier-ignore
import type { getConfig as File_AdminHomeLegal_getConfig } from './pages/(admin)/home/legal';
// prettier-ignore
import type { getConfig as File_AdminHomeProducts_getConfig } from './pages/(admin)/home/products';
// prettier-ignore
import type { getConfig as File_AdminRoleAdd_getConfig } from './pages/(admin)/role/add';
// prettier-ignore
import type { getConfig as File_AdminRoleEditId_getConfig } from './pages/(admin)/role/edit/[id]';
// prettier-ignore
import type { getConfig as File_AdminRoleIndex_getConfig } from './pages/(admin)/role/index';
// prettier-ignore
import type { getConfig as File_AdminUsersAdd_getConfig } from './pages/(admin)/users/add';
// prettier-ignore
import type { getConfig as File_AdminUsersEditId_getConfig } from './pages/(admin)/users/edit/[id]';
// prettier-ignore
import type { getConfig as File_AdminUsersIndex_getConfig } from './pages/(admin)/users/index';
// prettier-ignore
import type { getConfig as File_BlankIndex_getConfig } from './pages/(blank)/index';
// prettier-ignore
import type { getConfig as File_BlankLogin_getConfig } from './pages/(blank)/login';

// prettier-ignore
type Page =
| ({ path: '/about' } & GetConfigResponse<typeof File_AdminAbout_getConfig>)
| ({ path: '/home/about' } & GetConfigResponse<typeof File_AdminHomeAbout_getConfig>)
| ({ path: '/home/benefit' } & GetConfigResponse<typeof File_AdminHomeBenefit_getConfig>)
| ({ path: '/home/documentation' } & GetConfigResponse<typeof File_AdminHomeDocumentation_getConfig>)
| ({ path: '/home/gallery' } & GetConfigResponse<typeof File_AdminHomeGallery_getConfig>)
| ({ path: '/home/hero' } & GetConfigResponse<typeof File_AdminHomeHero_getConfig>)
| ({ path: '/home/howto' } & GetConfigResponse<typeof File_AdminHomeHowto_getConfig>)
| ({ path: '/home/legal' } & GetConfigResponse<typeof File_AdminHomeLegal_getConfig>)
| ({ path: '/home/products' } & GetConfigResponse<typeof File_AdminHomeProducts_getConfig>)
| ({ path: '/role/add' } & GetConfigResponse<typeof File_AdminRoleAdd_getConfig>)
| ({ path: '/role/edit/[id]' } & GetConfigResponse<typeof File_AdminRoleEditId_getConfig>)
| ({ path: '/role' } & GetConfigResponse<typeof File_AdminRoleIndex_getConfig>)
| ({ path: '/users/add' } & GetConfigResponse<typeof File_AdminUsersAdd_getConfig>)
| ({ path: '/users/edit/[id]' } & GetConfigResponse<typeof File_AdminUsersEditId_getConfig>)
| ({ path: '/users' } & GetConfigResponse<typeof File_AdminUsersIndex_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_BlankIndex_getConfig>)
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
