export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1D1D] mx-auto mb-4"></div>
        <p className="text-[#475569]">Đang tải...</p>
      </div>
    </div>
  );
}