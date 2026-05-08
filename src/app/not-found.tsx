import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LucideIcon from '@/components/ui/LucideIcon';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-background py-24 px-4">
        <div className="text-center max-w-xl">
          <p className="text-7xl md:text-8xl font-serif font-bold text-primary mb-4">404</p>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Không tìm thấy trang
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. Mời bạn quay lại trang chủ hoặc khám phá các nội dung khác của Trung Tâm Mục Vụ Gia Đình Đắc Lộ.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground border border-primary-border min-h-10 rounded-md px-8 hover:opacity-90"
            >
              <LucideIcon name="House" className="w-4 h-4 mr-2" />
              Về trang chủ
            </Link>
            <Link
              href="/tai-nguyen"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-xs min-h-10 rounded-md px-8 hover:bg-accent hover:text-accent-foreground"
            >
              <LucideIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Khám phá tài nguyên
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}