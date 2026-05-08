import Link from 'next/link';

interface AdminUnderConstructionPageProps {
  title: string;
  description?: string;
}

export default function AdminUnderConstructionPage({
  title,
  description = 'Trang này đang được phát triển. Vui lòng quay lại sau.',
}: AdminUnderConstructionPageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="text-center max-w-xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#F9ECEC] rounded-lg flex items-center justify-center text-3xl">
            🚧
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-serif font-bold text-gray-800 mb-4">
          {title}
        </h1>

        {/* Description */}
        <p className="text-gray-500 font-serif mb-6">
          {description}
        </p>

        {/* CTA */}
        <Link
          href="/admin"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors bg-primary text-white min-h-10 rounded-lg px-6 hover:bg-primary-800"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay về Dashboard
        </Link>
      </div>
    </div>
  );
}