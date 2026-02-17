# Waku Admin Template

A modern admin template built with Waku framework, Prisma ORM, and PostgreSQL.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)

## Database Setup

### 1. Install PostgreSQL

If you haven't installed PostgreSQL yet:

**macOS (using Homebrew):**

```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

### 2. Create Database

Connect to PostgreSQL and create the database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE *db name*;

# Exit psql
\q
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and update the database connection string:

```env
DATABASE_URL="postgresql://postgres@localhost:5432/resep_db"
```

**Note:** Adjust the connection string based on your PostgreSQL configuration:

- Format: `postgresql://[user]:[password]@[host]:[port]/[database]`
- If you have a password: `postgresql://postgres:yourpassword@localhost:5432/resep_db`

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Run Database Migrations

```bash
npx prisma db push
```

This will create all the necessary tables in your database.

### 4. Seed the Database

```bash
npm run db:seed
```

This will populate the database with:

- System data (measurement units)
- Sample bahan (ingredients)
- 20 sample resep (recipes)

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Main seed file
│   └── seeders/               # Individual seeder files
├── src/
│   ├── actions/               # Server actions
│   ├── components/            # React components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   ├── pages/            # Page-specific components
│   │   ├── sidebar/          # Sidebar components
│   │   └── table/            # Table components
│   ├── config/               # Configuration files
│   ├── contexts/             # React contexts
│   ├── models/               # Data models (Prisma queries)
│   ├── pages/                # Waku pages (file-based routing)
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── .env                      # Environment variables (create this)
└── package.json
```

## Features

- ✅ CRUD operations for Resep (Recipes)
- ✅ Pagination (10 items per page)
- ✅ Soft delete functionality
- ✅ Server-side rendering with Waku
- ✅ Type-safe with TypeScript
- ✅ Database ORM with Prisma
- ✅ Modern UI with HeroUI components
- ✅ Form validation
- ✅ Toast notifications
- ✅ Confirmation dialogs

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:seed` - Seed the database with sample data
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma db push` - Push schema changes to database
- `npx prisma generate` - Generate Prisma Client

## Database Management

### View Data with Prisma Studio

```bash
npx prisma studio
```

This will open a browser-based GUI at `http://localhost:5555` where you can view and edit your data.

### Reset Database

```bash
npx prisma db push --force-reset
npm run db:seed
```

**Warning:** This will delete all data and recreate the database!

## Creating New Tables and Seeders

### Step 1: Define the Model in Prisma Schema

Edit `prisma/schema.prisma` and add your new model:

```prisma
model TbCategory {
  categoryId String   @id @default(uuid()) @map("category_id") @db.Uuid
  name       String   @db.VarChar(100)
  description String? @db.VarChar(255)
  status     Boolean  @default(true)
  createdBy  String?  @map("created_by") @db.VarChar(50)
  createdAt  DateTime @default(now()) @map("created_at") @db.Timestamp(6)
  updatedBy  String?  @map("updated_by") @db.VarChar(50)
  updatedAt  DateTime @default(now()) @updatedAt @map("updated_at") @db.Timestamp(6)

  @@map("tb_category")
}
```

**Key conventions:**

- Model name: PascalCase (e.g., `TbCategory`)
- Table name: snake_case with `@@map` (e.g., `"tb_category"`)
- Column names: snake_case with `@map` (e.g., `"category_id"`)
- Always include: `status`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`

### Step 2: Push Schema to Database

```bash
npx prisma db push
```

This creates the table in your database.

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

This updates the TypeScript types for your new model.

### Step 4: Create a Seeder File

Create `prisma/seeders/category.seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

export async function seedCategory(prisma: PrismaClient) {
  console.log('Seeding tb_category...');

  const data = [
    {
      name: 'Indonesian Food',
      description: 'Traditional Indonesian cuisine',
    },
    {
      name: 'Western Food',
      description: 'Western cuisine',
    },
    {
      name: 'Desserts',
      description: 'Sweet desserts and pastries',
    },
  ];

  for (const row of data) {
    // Check if record exists
    const existing = await prisma.tbCategory.findFirst({
      where: {
        name: row.name,
        status: true,
      },
    });

    if (existing) {
      // Update existing record
      await prisma.tbCategory.update({
        where: {
          categoryId: existing.categoryId,
        },
        data: {
          description: row.description,
          updatedBy: 'SYSTEM',
          updatedAt: new Date(),
        },
      });
      console.log(`  Updated: ${row.name}`);
    } else {
      // Insert new record
      await prisma.tbCategory.create({
        data: {
          ...row,
          createdBy: 'SYSTEM',
          updatedBy: 'SYSTEM',
        },
      });
      console.log(`  Created: ${row.name}`);
    }
  }

  console.log('tb_category seeding completed!');
}

// Allow running this seeder directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const prisma = new PrismaClient();
  seedCategory(prisma)
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
```

**Seeder best practices:**

- Always check if record exists before creating (upsert pattern)
- Use `status: true` in where clause for soft-delete compatibility
- Set `createdBy` and `updatedBy` to 'SYSTEM' for seeded data
- Add standalone execution code at the bottom for testing

### Step 5: Add Seeder to Main Seed File

Edit `prisma/seed.ts` and add your seeder:

```typescript
import { PrismaClient } from '@prisma/client';
import { seedSystem } from './seeders/system.seed';
import { seedBahan } from './seeders/bahan.seed';
import { seedResep } from './seeders/resep.seed';
import { seedCategory } from './seeders/category.seed'; // Add this

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...\n');

  await seedSystem(prisma);
  await seedBahan(prisma);
  await seedCategory(prisma);  // Add this
  await seedResep(prisma);

  console.log('\nAll seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Step 6: Run the Seeder

Run all seeders:

```bash
npm run db:seed
```

Or run a specific seeder directly:

```bash
npx tsx prisma/seeders/category.seed.ts
```

### Step 7: Create Server Actions

Create `src/actions/category.ts`:

```typescript
'use server';

import { PrismaClient } from '@prisma/client';
import type { ActionResponse } from '@/types/response';

function getPrismaClient() {
  return new PrismaClient();
}

export async function getAllCategory(page: number = 1, pageSize: number = 10) {
  const prisma = getPrismaClient();
  try {
    const skip = (page - 1) * pageSize;

    const totalCount = await prisma.tbCategory.count({
      where: { status: true },
    });

    const data = await prisma.tbCategory.findMany({
      where: { status: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    });

    return {
      success: true,
      data,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    return {
      success: false,
      error: 'Failed to fetch category',
      data: [],
      pagination: { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 },
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createCategoryAction(formData: {
  name: string;
  description?: string;
}): Promise<ActionResponse> {
  const prisma = getPrismaClient();
  try {
    await prisma.tbCategory.create({
      data: {
        ...formData,
        createdBy: 'SYSTEM',
        updatedBy: 'SYSTEM',
      },
    });

    return {
      success: true,
      message: 'Category created successfully',
    };
  } catch (error) {
    console.error('Error creating category:', error);
    return {
      success: false,
      error: 'Failed to create category',
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Add more actions: update, delete, getById as needed
```

### Common Prisma Schema Patterns

**UUID Primary Key:**

```prisma
id String @id @default(uuid()) @map("id") @db.Uuid
```

**Auto-increment Primary Key:**

```prisma
id Int @id @default(autoincrement()) @map("id")
```

**Foreign Key Relationship:**

```prisma
model TbResep {
  resepId    String     @id @default(uuid()) @map("resep_id") @db.Uuid
  categoryId String     @map("category_id") @db.Uuid
  category   TbCategory @relation(fields: [categoryId], references: [categoryId])

  @@map("tb_resep")
}

model TbCategory {
  categoryId String    @id @default(uuid()) @map("category_id") @db.Uuid
  reseps     TbResep[]

  @@map("tb_category")
}
```

**Unique Constraint:**

```prisma
email String @unique @db.VarChar(255)
```

**Composite Primary Key:**

```prisma
@@id([sysCat, sysSubCat, sysCode])
```

**Index:**

```prisma
@@index([name])
```

## Troubleshooting

### Database Connection Error

If you get a connection error:

1. Make sure PostgreSQL is running: `brew services list` (macOS) or `systemctl status postgresql` (Linux)
2. Verify your `.env` DATABASE_URL is correct
3. Test connection: `psql -U postgres -d resep_db`

### Port Already in Use

If port 3000 is already in use:

```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

### Prisma Client Error

If you get "PrismaClient is not configured" error:

```bash
npx prisma generate
```

## Tech Stack

- **Framework:** [Waku](https://waku.gg/) - React framework with RSC support
- **Database:** PostgreSQL
- **ORM:** Prisma
- **UI Library:** HeroUI (React components)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **TypeScript:** Full type safety

## License

MIT
