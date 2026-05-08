export default function UpcomingScheduleSection() {
  return (
    <section className="py-16 px-4 lg:px-8 bg-slate-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif text-slate-900 mb-4">
            LỊCH HUẤN LUYỆN ĐANG MỞ
          </h2>
          <p className="text-slate-500 font-serif max-w-2xl mx-auto">
            Các đợt thuộc chương trình huấn luyện đang nhận đăng ký hoặc sắp khai giảng.
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-500 font-serif text-base">
              Hiện chưa có khóa sắp khai giảng. Mời bạn liên lạc để được thông báo khi có lịch mới.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}