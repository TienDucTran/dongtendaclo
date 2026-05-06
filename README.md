# Đồng Tên Đắc Lộ - Website Mục Vụ

Dự án Next.js 14 với Tailwind CSS, Supabase và Figma MCP integration.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Database**: Supabase
- **Design**: Figma (via MCP)

## 📋 Prerequisites

- Node.js 18+
- npm hoặc yarn
- Figma account với Personal Access Token
- Supabase project

## 🔧 Setup

### 1. Install Dependencies

```bash
cd d:\dongtendaclo
npm install
```

### 2. Environment Variables

Tạo file `.env.local` (hoặc sử dụng `.env`):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Figma
FIGMA_ACCESS_TOKEN=your_figma_personal_access_token
FIGMA_FILE_KEY=your_figma_file_key
```

### 3. Run Development Server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## 🎨 Figma Integration

### Để lấy Figma File Key:

1. Mở Figma file trong browser
2. URL có dạng: `https://www.figma.com/file/{FILE_KEY}/...`
3. Copy `{FILE_KEY}` vào `.env` file

### Sử dụng Figma MCP:

Figma MCP đã được cấu hình sẵn. Bạn có thể yêu cầu AI:

- "Get all frames from Figma file"
- "Convert Figma frame to React component"
- "Get styles from Figma component"

## 📁 Project Structure

```
dongtendaclo/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── ui/            # UI components từ Figma
│   │   └── layout/        # Layout components
│   └── lib/
│       └── supabase.ts     # Supabase client
├── public/                 # Static files
├── .env                    # Environment variables
├── next.config.js         # Next.js config
├── tailwind.config.ts     # Tailwind config
└── tsconfig.json          # TypeScript config
```

## 🔄 Workflow Figma → Code

1. **Get Design**: Sử dụng Figma MCP để lấy design data
2. **Analyze**: Xác định components, styles, và layout
3. **Generate Code**: Tạo React components với Tailwind CSS
4. **Integrate**: Kết nối với Supabase backend
5. **Test & Deploy**: Preview và deploy

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🛠️ Next Steps

1. ✅ Project structure created
2. ✅ Dependencies configured
3. ⏳ Install dependencies: `npm install`
4. ⏳ Configure Supabase URL và Key
5. ⏳ Get Figma File Key
6. ⏳ Start fetching Figma designs
7. ⏳ Generate React components

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase](https://supabase.com/docs)
- [Figma API](https://www.figma.com/developers/api)

## 📄 License

Private project - Đồng Tên Đắc Lộ