import Link from 'next/link';
import LucideIcon from './LucideIcon';

interface UnderConstructionPageProps {
  title: string;
  description?: string;
  showHomeLink?: boolean;
}

export default function UnderConstructionPage({
  title,
  description = 'Thông tin về trang đang được cập nhật. Vui lòng quay lại sau.',
  showHomeLink = true,
}: UnderConstructionPageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <LucideIcon name="Library" className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 mb-4">
          {title}
        </h1>

        {/* Description */}
        <p className="text-slate-600 font-serif leading-relaxed mb-8">
          {description}
        </p>

        {/* CTA */}
        {showHomeLink && (
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-white border border-primary min-h-10 rounded-full px-8 hover:bg-primary-800"
            >
              <LucideIcon name="House" className="w-4 h-4" />
              Về trang chủ
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground min-h-10 rounded-full px-8"
            >
              <LucideIcon name="ArrowLeft" className="w-4 h-4" />
              Liên hệ
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}