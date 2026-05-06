'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
          Đã có lỗi xảy ra!
        </h2>
        <p className="text-[#475569] mb-6">
          Chúng tôi xin lỗi vì sự bất tiện này. Vui lòng thử lại sau.
        </p>
        <button
          onClick={() => reset()}
          className="bg-[#8B1D1D] text-white px-6 py-3 rounded-full font-medium hover:bg-[#7A1717] transition-colors"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}