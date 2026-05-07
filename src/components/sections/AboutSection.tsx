import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Decorative Circle */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-primary/20 flex items-center justify-center">
              <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full bg-red-50 flex items-center justify-center">
                <div className="w-24 h-24 text-primary">
                  <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="48" cy="48" r="36" />
                    <path d="M48 24v24l16 8" strokeLinecap="round" />
                    <path d="M32 48c0-8.837 7.163-16 16-16" strokeLinecap="round" />
                    <path d="M48 32v16" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block bg-red-100 text-primary text-xs font-bold px-3 py-1 rounded uppercase tracking-wide mb-4">
              Về chúng tôi
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Phương pháp Tâm lý – Linh đạo
              <br />
              <span className="text-primary">(Psycho-Spiritual Approach)</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Trung tâm kết hợp chuyên môn tâm lý với linh đạo Dòng Tên – nhận biết Thiên
              Chúa đang hoạt động trong đời sống mỗi gia đình. Chúng tôi đồng hành với
              tình yêu, sự chữa lành và sự lớn lên trong đức tin.
            </p>
            <Link
              href="/ve-chung-toi"
              className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-md font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              Khám phá hành trình của chúng tôi
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}