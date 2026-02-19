// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as File_BahanIndex_getConfig } from './pages/bahan/index';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_ResepAdd_getConfig } from './pages/resep/add';
// prettier-ignore
import type { getConfig as File_ResepEditId_getConfig } from './pages/resep/edit/[id]';
// prettier-ignore
import type { getConfig as File_ResepIndex_getConfig } from './pages/resep/index';
// prettier-ignore
import type { getConfig as File_ResepHistoryIndex_getConfig } from './pages/resep-history/index';
// prettier-ignore
import type { getConfig as File_Users_getConfig } from './pages/users';

// prettier-ignore
type Page =
| ({ path: '/about' } & GetConfigResponse<typeof File_About_getConfig>)
| ({ path: '/bahan' } & GetConfigResponse<typeof File_BahanIndex_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/resep/add' } & GetConfigResponse<typeof File_ResepAdd_getConfig>)
| ({ path: '/resep/edit/[id]' } & GetConfigResponse<typeof File_ResepEditId_getConfig>)
| ({ path: '/resep' } & GetConfigResponse<typeof File_ResepIndex_getConfig>)
| ({ path: '/resep-history' } & GetConfigResponse<typeof File_ResepHistoryIndex_getConfig>)
| ({ path: '/users' } & GetConfigResponse<typeof File_Users_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
