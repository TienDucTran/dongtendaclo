# 📋 TEMPLATE - Khởi tạo API và Database (Copy & Apply)

## 🎯 Mục đích
Template này giúp nhanh chóng tạo API endpoints và database tables mới cho admin panel. Chỉ cần copy, thay tên bảng, và áp dụng.

---

## 📁 FILE CHECKLIST - Theo thứ tự

### 1️⃣ Database Types
**File:** `src/lib/db/index.ts`

```typescript
// ===== COPY VÀ THAY TÊN BẢNG =====
// Tìm: TableName → Replace: [TênBảngMới]
// Tìm: table_name → Replace: [tên_bảng_mới]

export interface TableName {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  status: number;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface TableNameInput {
  title: string;
  slug: string;
  description?: string;
  status?: number;
  order?: number;
}
```

### 2️⃣ SQL Schema
**File:** `src/lib/db/schema.sql` (thêm vào cuối file)

```sql
-- ============================================
-- [TÊN BẢNG MỚI] Table
-- ============================================
CREATE TABLE IF NOT EXISTS table_name (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  status INTEGER DEFAULT 1,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_table_name_slug ON table_name(slug);
CREATE INDEX IF NOT EXISTS idx_table_name_order ON table_name("order");
```

### 3️⃣ Query Functions
**File:** `src/lib/db/queries.ts` (thêm vào cuối file)

```typescript
// ============================================
// [TÊN BẢNG MỚI] Queries
// ============================================

export async function getTableName(options?: {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}): Promise<PaginatedResponse<TableName>> {
  const page = options?.page || 1;
  const limit = options?.limit || 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('table_name')
    .select('*', { count: 'exact' });

  if (options?.search) {
    query = query.or(
      `title.ilike.%${options.search}%,description.ilike.%${options.search}%`
    );
  }

  const sortField = options?.sort || 'order';
  query = query.order(sortField as any, { ascending: true });

  const { data, count, error } = await query.range(offset, offset + limit - 1);

  if (error) {
    if (error.message?.includes('does not exist') || error.message?.includes('relation')) {
      return { data: [], total: 0, page: 1, limit: 20, totalPages: 0, _setup: true };
    }
    throw new Error(error.message);
  }

  return {
    data: (data || []) as TableName[],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function getTableNameById(id: number): Promise<TableName | null> {
  const { data, error } = await supabase
    .from('table_name')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as TableName;
}

export async function createTableName(input: TableNameInput): Promise<TableName> {
  const { data, error } = await supabase
    .from('table_name')
    .insert([{ ...input, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as TableName;
}

export async function updateTableName(id: number, input: Partial<TableNameInput>): Promise<TableName> {
  const { data, error } = await supabase
    .from('table_name')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as TableName;
}

export async function deleteTableName(id: number): Promise<void> {
  const { error } = await supabase.from('table_name').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
```

### 4️⃣ API Routes
**File:** `src/app/api/admin/[table-name]/route.ts` (tạo file mới)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getTableName, createTableName } from '@/lib/db/queries';

// GET /api/admin/[table-name]
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getTableName({
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      sort: searchParams.get('sort') || 'order',
    });
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.message?.includes('does not exist') || error.message?.includes('relation')) {
      return NextResponse.json({ data: [], total: 0, page: 1, limit: 20, totalPages: 0, _setup: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/[table-name]
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const record = await createTableName(body);
    return NextResponse.json({ data: record }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

**File:** `src/app/api/admin/[table-name]/[id]/route.ts` (tạo file mới)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getTableNameById, updateTableName, deleteTableName } from '@/lib/db/queries';

// GET /api/admin/[table-name]/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const record = await getTableNameById(id);
    if (!record) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ data: record });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/admin/[table-name]/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const record = await updateTableName(id, body);
    return NextResponse.json({ data: record });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/[table-name]/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await deleteTableName(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 🔧 FIND & REPLACE GUIDE

Khi tạo bảng mới, tìm và thay thế theo bảng sau:

| Tìm | Thay bằng (Ví dụ: courses) |
|-----|----------------------------|
| `TableName` | `Course` (PascalCase, số ít) |
| `TableNameInput` | `CourseInput` |
| `table_name` | `courses` (snake_case, số nhiều) |
| `getTableName` | `getCourses` |
| `getTableNameById` | `getCourseById` |
| `createTableName` | `createCourse` |
| `updateTableName` | `updateCourse` |
| `deleteTableName` | `deleteCourse` |
| `[table-name]` | `courses` (URL path) |

---

## ✅ WORKFLOW - Tạo Bảng Mới

### Bước 1: Tạo Types
```bash
# Mở file: src/lib/db/index.ts
# Thêm interface TableName và TableNameInput
# Export chúng
```

### Bước 2: Tạo SQL
```bash
# Mở file: src/lib/db/schema.sql
# Thêm CREATE TABLE statement
# Thêm CREATE INDEX statements
```

### Bước 3: Chạy SQL trong Supabase
```bash
# 1. Mở Supabase Dashboard
# 2. Vào SQL Editor
# 3. Copy SQL từ schema.sql
# 4. Click Run
```

### Bước 4: Tạo Query Functions
```bash
# Mở file: src/lib/db/queries.ts
# Copy template queries
# Find & Replace tên bảng
```

### Bước 5: Tạo API Routes
```bash
# Tạo thư mục: src/app/api/admin/[table-name]/
# Tạo file: route.ts (GET, POST)
# Tạo thư mục: src/app/api/admin/[table-name]/[id]/
# Tạo file: route.ts (GET, PUT, DELETE)
```

### Bước 6: Test API
```bash
# Test GET: /api/admin/[table-name]
# Test POST: /api/admin/[table-name] (với body JSON)
# Test GET: /api/admin/[table-name]/1
# Test PUT: /api/admin/[table-name]/1
# Test DELETE: /api/admin/[table-name]/1
```

---

## 📊 FIELD TYPES CHEAT SHEET

### Text Fields
```typescript
// TypeScript
title: string;
slug: string;
description: string | null;

// SQL
title TEXT NOT NULL,
slug TEXT NOT NULL UNIQUE,
description TEXT,
```

### Number Fields
```typescript
// TypeScript
order: number;
status: number;

// SQL
"order" INTEGER DEFAULT 0,
status INTEGER DEFAULT 1,
```

### Boolean Fields
```typescript
// TypeScript
is_active: boolean;
is_featured: boolean;

// SQL
is_active BOOLEAN DEFAULT TRUE,
is_featured BOOLEAN DEFAULT FALSE,
```

### Date/Time Fields
```typescript
// TypeScript
created_at: string;
updated_at: string;
start_date: string | null;

// SQL
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
start_date DATE,
```

### Enum Fields
```typescript
// TypeScript
type: 'type1' | 'type2' | 'type3';

// SQL
type TEXT CHECK (type IN ('type1', 'type2', 'type3')) DEFAULT 'type1',
```

### Foreign Keys
```typescript
// TypeScript
program_id: number | null;

// SQL
program_id INTEGER REFERENCES training_programs(id) ON DELETE SET NULL,
```

---

## 🐛 COMMON ERRORS & FIXES

### Error: `relation "table_name" does not exist`
```
❌ Nguyên nhân: Bảng chưa được tạo trong Supabase
✅ Fix: Chạy SQL trong Supabase SQL Editor
```

### Error: `permission denied for table`
```
❌ Nguyên nhân: Thiếu RLS policies
✅ Fix: Thêm policies trong Supabase:
```sql
CREATE POLICY "Public can view" ON table_name FOR SELECT USING (status = 1);
CREATE POLICY "Admins have full access" ON table_name FOR ALL 
  USING (auth.jwt() ->> 'role' = 'admin');
```

### Error: `column "field" of relation "table" does not exist`
```
❌ Nguyên nhân: Field chưa có trong database
✅ Fix: Thêm ALTER TABLE statement:
```sql
ALTER TABLE table_name ADD COLUMN new_field TEXT;
```

### Error: `duplicate key value violates unique constraint`
```
❌ Nguyên nhân: Slug hoặc unique field bị trùng
✅ Fix: Check slug trước khi insert hoặc tạo slug unique
```

---

## 🎨 ADMIN PAGE TEMPLATE

### Admin List Page Structure
```
src/app/admin/[table-name]/page.tsx
├── Header (Title)
├── Toolbar (Search, Sort, View Toggle, Add Button)
├── Content Grid (Cards or Table)
└── Pagination
```

### Key Components
```
1. Fetch data từ API: GET /api/admin/[table-name]
2. State management: useState cho programs, search, sort, viewMode
3. Card/Table view toggle
4. Add Modal: ProgramFormModal
5. Edit: Click card → open modal với initialData
6. Delete: Confirm dialog → DELETE /api/admin/[table-name]/[id]
```

---

## 🚀 QUICK START EXAMPLE

### Tạo bảng `courses`:

**1. Thêm types** (`src/lib/db/index.ts`):
```typescript
export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  program_id: number | null;
  status: 'active' | 'upcoming' | 'completed';
  created_at: string;
  updated_at: string;
}
```

**2. Thêm SQL** (`src/lib/db/schema.sql`):
```sql
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  program_id INTEGER REFERENCES training_programs(id),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**3. Thêm queries** (`src/lib/db/queries.ts`):
```typescript
export async function getCourses(options?: {...}) {...}
export async function getCourseById(id: number) {...}
export async function createCourse(input: CourseInput) {...}
export async function updateCourse(id: number, input: Partial<CourseInput>) {...}
export async function deleteCourse(id: number) {...}
```

**4. Tạo API routes**:
- `src/app/api/admin/courses/route.ts`
- `src/app/api/admin/courses/[id]/route.ts`

**5. Test**: 
```
GET /api/admin/courses
POST /api/admin/courses
GET /api/admin/courses/1
PUT /api/admin/courses/1
DELETE /api/admin/courses/1
```

---

**Last Updated:** 2026-05-08
**Project:** dongtendaclo (Next.js 14 + Supabase)