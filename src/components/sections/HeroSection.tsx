'use client';

import Link from 'next/link';

const upcomingCourses = [
  {
    id: 1,
    slug: 'chuyen-de-thai-giao',
    title: 'Chuyên đề "Thai Giáo"',
    date: '9/5/2026 • 18:30 - 20:30',
    description: 'Khóa chuyên đề dành cho các cặp vợ chồng đang chuẩn bị đón con và những gia đình có em bé dưới 1 tuổi. Cùng các chuyên gia tâm lý, dinh dưỡng và linh đạo, chúng ta khám phá nghệ thuật giáo dục con ngay từ những tháng đầu đời.',
  },
  {
    id: 2,
    slug: 'nghe-thuat-lang-nghe',
    title: 'Nghệ thuật lắng nghe & đối thoại yêu thương trong gia đình',
    date: '12/5/2026 • 19:00 - 21:00',
    description: 'Lắng nghe là khởi đầu của tình yêu. Khoá học giúp mỗi người trong gia đình tập kỹ năng lắng nghe sâu — từ cảm xúc đến nhu cầu, và đối thoại trong tinh thần tôn trọng.',
  },
  {
    id: 3,
    slug: 'phong-chong-xam-hai-tre',
    title: 'Vấn đề giới tính & kỹ năng phòng chống xâm hại cho trẻ',
    date: '15/5/2026 • 19:00 - 21:00',
    description: 'Một chuyên đề khẩn thiết cho mọi gia đình. Trang bị cho cha mẹ và thầy cô giáo lý kiến thức và kỹ năng để bảo vệ con trẻ khỏi mọi hình thức xâm hại.',
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gray-900">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Hero Content - 8 columns */}
          <div className="lg:col-span-8">
            <div className="max-w-3xl pt-20 lg:pt-0">
              {/* Badge */}
              <div className="inline-flex items-center rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs uppercase tracking-widest font-medium text-white mb-6">
                Thuộc Hội Dòng Tên • Đắc Lộ
              </div>

              {/* Heading */}
              <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[96px] font-serif font-bold leading-[1.1] text-white lg:mb-8">
                Đồng hành gia đình
                <br />
                trong <span className="text-gold italic">tình yêu</span> và{' '}
                <span className="text-gold italic">đức tin</span>
              </h1>

              {/* Description */}
              <p className="mb-8 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed text-white/80 lg:mb-10">
                Trung tâm cung cấp các khóa học, tư vấn mục vụ và chuyên đề nhằm vun đắp đời
                sống hôn nhân — gia đình theo tinh thần Tin Mừng và linh đạo Dòng Tên.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col items-stretch justify-center gap-3 sm:gap-4 sm:flex-row sm:items-center lg:justify-start">
                <Link
                  href="/huan-luyen?tab=topical"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors border border-primary bg-gold text-white hover:bg-gold-600 w-full sm:w-auto text-sm sm:text-base rounded-full h-12 sm:h-14 px-6 sm:px-8"
                >
                  Xem khóa học mới
                </Link>
                <Link
                  href="/lien-he"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 w-full sm:w-auto text-sm sm:text-base rounded-full h-12 sm:h-14 px-6 sm:px-8"
                >
                  Đăng ký tư vấn
                </Link>
              </div>
            </div>
          </div>

          {/* Course Sidebar - 4 columns */}
          <div className="lg:col-span-4 h-full">
            <div className="bg-primary/95 backdrop-blur-md h-full rounded-3xl p-8 text-white shadow-2xl border border-white/10 flex flex-col">
              <h2 className="text-xl font-serif font-bold mb-8 uppercase tracking-wider text-gold/90">
                Khóa học sắp khai giảng
              </h2>

              <div className="flex flex-col gap-6 flex-1">
                {upcomingCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/khoa-hoc/${course.slug}`}
                    className="group"
                  >
                    <div className="flex gap-4 items-start rounded-2xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10">
                      <div className="w-3 h-3 rounded-full bg-gold mt-2 shrink-0 group-hover:scale-125 transition-transform"></div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-lg leading-snug group-hover:text-gold transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-white/60 text-sm mt-1">{course.date}</p>
                        <p className="text-white/70 text-sm mt-2 line-clamp-2">
                          {course.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Link */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <Link
                  href="/huan-luyen?tab=topical"
                  className="text-sm font-medium flex items-center justify-end gap-2 hover:text-gold transition-colors group"
                >
                  Xem tất cả khóa học
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}