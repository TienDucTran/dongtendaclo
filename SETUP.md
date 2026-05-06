# Hướng dẫn Setup - Đồng Tên Đắc Lộ

## ✅ Dự án đã được khởi tạo

Dự án Next.js 14 với Tailwind CSS, Supabase và Figma integration đã sẵn sàng.

## 📋 Các bước tiếp theo

### 1. Cấu hình Supabase

Mở file `.env` và thêm Supabase credentials:

```env
# Supabase (cần thêm)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Figma (đã có)
FIGMA_ACCESS_TOKEN=figd_97fwgfMSNWQKi_Anqe2xdpBm7L0lphFaS502xhlc

# Cần thêm Figma File Key
FIGMA_FILE_KEY=your-figma-file-key
```

### 2. Lấy Figma File Key

1. Mở Figma file trong trình duyệt
2. URL có dạng: `https://www.figma.com/file/ABC123/...`
3. Copy phần `ABC123` - đó là File Key
4. Thêm vào `.env`:

```env
FIGMA_FILE_KEY=ABC123
```

### 3. Chạy Development Server

```bash
cd d:\dongtendaclo
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

### 4. Fetch Figma Design

Dự án có sẵn các tools để fetch design từ Figma:

#### Option A: Sử dụng Figma MCP (recommended)

Nếu Figma MCP đã được cấu hình trong Cline, bạn có thể yêu cầu AI:
- "Get all frames from Figma file {FILE_KEY}"
- "Convert Figma frame to React component"
- "Get styles from Figma component"

#### Option B: Sử dụng API trực tiếp

```typescript
import { getFigmaFile, extractFrames } from '@/lib/figma';

const fileKey = 'your-file-key';
const data = await getFigmaFile(fileKey);
const frames = extractFrames(data.document);
```

## 📁 Cấu trúc dự án

```
dongtendaclo/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   └── FigmaDesign.tsx # Figma frame selector
│   └── lib/
│       ├── figma.ts        # Figma API client
│       └── supabase.ts     # Supabase client
├── public/                 # Static files
├── .env                    # Environment variables
├── next.config.js         # Next.js config
├── tailwind.config.ts     # Tailwind config
└── tsconfig.json          # TypeScript config
```

## 🔧 Các tính năng đã sẵn sàng

- ✅ Next.js 14 với App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Supabase client
- ✅ Figma API client
- ✅ Component FigmaDesign để select frame

## 📝 Workflow Figma → Code

1. **Lấy Figma File Key** từ URL
2. **Add vào `.env`**
3. **Fetch design** sử dụng Figma MCP hoặc API
4. **Convert frames** thành React components
5. **Apply Tailwind CSS** styles
6. **Connect Supabase** cho data

## 🚀 Sử dụng Figma MCP

### Cách 1: Yêu cầu AI trực tiếp

Bạn có thể yêu cầu AI sử dụng Figma MCP tools:

```
"Get all frames from Figma file [FILE_KEY]"
"Convert frame [FRAME_ID] to React component"
"Get styles from component [COMPONENT_NAME]"
```

### Cách 2: Tạo trang preview

Tạo trang `src/app/design/page.tsx`:

```tsx
import FigmaDesign from '@/components/FigmaDesign';

export default function DesignPage() {
  const fileKey = process.env.NEXT_PUBLIC_FIGMA_FILE_KEY || '';
  
  const handleSelectFrame = (frame: any) => {
    console.log('Selected frame:', frame);
    // Generate component code here
  };

  return (
    <div className="container mx-auto p-8">
      <FigmaDesign 
        fileKey={fileKey} 
        onSelectFrame={handleSelectFrame}
      />
    </div>
  );
}
```

## 🔐 Environment Variables

File `.env` cần có:

| Variable | Description | Required |
|----------|-------------|----------|
| `FIGMA_ACCESS_TOKEN` | Figma Personal Access Token | ✅ |
| `FIGMA_FILE_KEY` | Figma File Key từ URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | ✅ |

## 📞 Hỗ trợ

Nếu bạn cần:
- **Lấy Figma File Key**: Mở Figma file và copy từ URL
- **Tạo Supabase Project**: [supabase.com](https://supabase.com)
- **Figma API Docs**: [figma.com/developers/api](https://www.figma.com/developers/api)