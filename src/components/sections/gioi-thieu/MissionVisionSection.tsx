'use client';

export default function MissionVisionSection() {
  return (
    <section id="su-mang-tam-nhin" className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-[#FB923C] text-xs font-bold tracking-[0.1em] uppercase">
            Sứ mạng & Tầm nhìn
          </span>
        </div>
        <h2 className="text-[#0F172A] text-3xl font-bold text-center mb-8">
          Vì sao chúng tôi hiện diện?
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 pt-8">
          {/* Mission Card */}
          <div className="bg-[#FBF8FC] border border-[#F1F5F9] rounded-lg p-10 relative">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-[#0F172A] text-2xl font-bold text-center mb-6">Sứ mạng</h3>
            <div className="space-y-4">
              <p className="text-[#475569] text-base leading-relaxed">
                CEFAM Đắc Lộ đồng hành với các gia đình — đặc biệt là các gia
                đình trẻ — qua các chương trình huấn luyện, tham vấn mục vụ,
                đồng hành thiêng liêng và các sinh hoạt mục vụ gia đình.
              </p>
              <p className="text-[#475569] text-base leading-relaxed">
                Các chương trình của chúng tôi kết hợp chiều sâu đức tin, những
                hiểu biết tâm lý phù hợp và linh đạo I-nhã, nhằm giúp các gia đình
                sống kiên vững, yêu thương và triển nở hơn trong ơn gọi hôn nhân
                Công giáo.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-[#FBF8FC] border border-[#F1F5F9] rounded-lg p-10 relative">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-[#0F172A] text-2xl font-bold text-center mb-6">Tầm nhìn</h3>
            <div className="space-y-4">
              <p className="text-[#475569] text-base leading-relaxed">
                Chúng tôi mơ ước mỗi gia đình Công giáo Việt Nam trở thành một
                Giáo Hội tại gia, nơi Thiên Chúa được nhận biết, yêu mến và phục
                vụ qua đời sống hôn nhân, qua việc giáo dục con cái và trở nên
                chứng tá yêu thương giữa đời thường.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}