# Waku Admin Template

A modern admin template built with Waku framework, Prisma ORM, and PostgreSQL.

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)

## Getting Started

### 1. Install PostgreSQL

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:** Download from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
psql -U postgres
CREATE DATABASE your_db;
\q
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Update `.env`:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/your_db"
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Migrations

```bash
npx prisma migrate deploy
npx prisma generate
```

### 6. Seed the Database

```bash
npm run db:seed
```

Seeds the following default data:
- **Role:** Admin
- **User:** `admin@mail.com` / `admin1234`

## Running the Application

```bash
npm run dev       # Development server at http://localhost:3000
npm run build     # Production build
npm run start     # Start production server
```

## Running in Production (Docker)

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) + [Docker Compose](https://docs.docker.com/compose/)

### 1. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set the required values:

```env
POSTGRES_PASSWORD=your_secure_password
SESSION_SECRET=your_long_random_secret   # openssl rand -hex 32
```

### 2. Build and start

```bash
docker compose up -d --build
```

The app will be available at `http://localhost:8080`.

> On first start, database migrations run automatically before the app starts.

### 3. Seed initial data (first time only)

```bash
docker compose exec app npm run db:seed
```

This creates the default admin user: `admin@mail.com` / `admin1234`.

### 4. Common commands

```bash
docker compose up -d --build    # Build and start (or rebuild after code changes)
docker compose down             # Stop and remove containers
docker compose logs -f app      # Stream app logs
docker compose exec app npx prisma studio   # Open Prisma Studio
```

### Notes

- Uploaded images are stored in a named Docker volume (`uploads`) and persist across restarts/rebuilds.
- The PostgreSQL data is stored in the `postgres_data` volume.
- To change the exposed port, set `APP_PORT` in `.env` (default: `8080`).

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Main seed entry point
│   ├── migrations/            # Migration history
│   └── seeders/               # Individual seeder files
├── src/
│   ├── actions/               # Server actions ('use server')
│   ├── components/
│   │   ├── forms/             # Reusable form inputs
│   │   ├── layout/            # Layout wrappers
│   │   ├── navbar/            # Top navigation bar
│   │   ├── pages/             # Page-specific components
│   │   ├── popover/           # Managed popover
│   │   ├── sidebar/           # Sidebar navigation
│   │   └── table/             # Datatable + filters
│   ├── config/                # Menu config
│   ├── contexts/              # React contexts
│   ├── pages/                 # Waku file-based routing
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions
└── package.json
```

## Features

- User & Role CRUD with soft delete
- Paginated data tables (server actions)
- Dynamic filters
- Server-side rendering with Waku RSC
- Type-safe with TypeScript + Prisma
- HeroUI component library
- Tailwind CSS v4
- Toast notifications & confirmation dialogs
- Responsive layout (mobile card view / desktop table)

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:seed` | Seed the database |
| `npx prisma studio` | Open Prisma Studio GUI |
| `npx prisma migrate dev` | Create & apply a new migration |
| `npx prisma generate` | Regenerate Prisma Client |

## Adding a New CRUD Module

### 1. Define the model in `prisma/schema.prisma`

```prisma
model TbCategory {
  categoryId  String   @id @default(uuid()) @map("category_id") @db.Uuid
  name        String   @db.VarChar(100)
  description String?  @db.VarChar(255)
  status      Boolean  @default(true)
  createdBy   String?  @map("created_by") @db.VarChar(50)
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamp(6)
  updatedBy   String?  @map("updated_by") @db.VarChar(50)
  updatedAt   DateTime @default(now()) @updatedAt @map("updated_at") @db.Timestamp(6)

  @@map("tb_category")
}
```

Conventions: `Tb` prefix, UUID PK, always include `status` + audit fields.

### 2. Migrate & generate

```bash
npx prisma migrate dev --name add_category_table
npx prisma generate
```

### 3. Add types in `src/types/category.ts`

```typescript
import type { TbCategory } from '@prisma/client';
import type { PaginatedResponse, DataResponse } from './response';

export type CategoryData = TbCategory;
export type CategoryFormData = { name: string; description?: string };
export type GetAllCategoryResponse = PaginatedResponse<CategoryData>;
export type GetCategoryByIdResponse = DataResponse<CategoryData>;
```

### 4. Add server actions in `src/actions/category-action.ts`

Follow the pattern in `src/actions/role-action.ts` — `'use server'` at top, one `getPrismaClient()` helper, functions for `getAll`, `getById`, `create`, `update`, `delete`.

### 5. Add components in `src/components/pages/category/`

- `category-content.tsx` — table with filter, pagination, delete
- `category-render-cell.tsx` — per-column rendering + action popover
- `category-form.tsx` — create/edit form

Follow the pattern in `src/components/pages/role/`.

### 6. Add pages in `src/pages/category/`

- `index.tsx` — list page (`render: 'dynamic'`)
- `add.tsx` — create page
- `edit/[id].tsx` — edit page (`render: 'dynamic'`)

### 7. Add to menu in `src/config/menu.tsx`

```typescript
{ key: 'CATEGORY_PAGE', label: 'Category', path: '/category', icon: Tag }
```

## Prisma Schema Patterns

**Foreign key:**
```prisma
model TbUser {
  roleId String  @map("role_id") @db.Uuid
  role   TbRole  @relation(fields: [roleId], references: [roleId])
}
```

**Unique constraint:**
```prisma
email String @unique @db.VarChar(255)
```

**Composite PK:**
```prisma
@@id([sysCat, sysSubCat, sysCode])
```

## Troubleshooting

**Database connection error**
1. Check PostgreSQL is running: `brew services list` / `systemctl status postgresql`
2. Verify `DATABASE_URL` in `.env`
3. Test: `psql -U postgres -d your_db`

**Port 3000 already in use**
```bash
lsof -ti:3000 | xargs kill -9
```

**Prisma Client out of sync**
```bash
npx prisma generate
```

## Tech Stack

| | |
|---|---|
| Framework | [Waku](https://waku.gg/) |
| Database | PostgreSQL |
| ORM | Prisma |
| UI | HeroUI |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Language | TypeScript |

## License

MIT
