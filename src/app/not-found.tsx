import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-[#8B1D1D] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
          Trang không tồn tại
        </h2>
        <p className="text-[#475569] mb-6">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          href="/"
          className="bg-[#8B1D1D] text-white px-6 py-3 rounded-full font-medium hover:bg-[#7A1717] transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}