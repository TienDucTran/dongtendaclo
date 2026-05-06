import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Mục Vụ Gia Đình Đắc Lộ | Dòng Tên Việt Nam',
  description: 'Đồng hành cùng các gia đình Công giáo theo tinh thần Tin Mừng và linh đạo Thánh I-nhã Loyola. Khóa học, tư vấn mục vụ và chuyên đề về hôn nhân gia đình.',
  keywords: ['mục vụ', 'gia đình', 'đắc lộ', 'dòng tên', 'hôn nhân', 'công giáo', 'việt nam'],
  authors: [{ name: 'Mục Vụ Gia Đình Đắc Lộ' }],
  openGraph: {
    title: 'Mục Vụ Gia Đình Đắc Lộ',
    description: 'Đồng hành cùng các gia đình Công giáo theo tinh thần Tin Mừng và linh đạo Thánh I-nhã Loyola.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}