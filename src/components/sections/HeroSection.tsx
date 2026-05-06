'use client';

import Link from 'next/link';

const upcomingCourses = [
  {
    id: 1,
    title: 'Chuyên đề "Thai Giáo"',
    date: '8/5/2024 • 18:30 - 20:30',
    description: 'Khóa chuyên đề dành cho các cặp vợ chồng đang chuẩn bị đón con và...',
    badge: 'MỚI',
    badgeColor: 'bg-orange-500',
  },
  {
    id: 2,
    title: 'Nghệ thuật lắng nghe & đối thoại yêu thương trong gia đình',
    date: '11/5/2024 • 19:00 - 21:00',
    description: 'Lắng nghe là khởi đầu của tình yêu. Khóa học giúp bạn thấu hiểu...',
    badge: 'NỔI BẬT',
    badgeColor: 'bg-primary',
  },
  {
    id: 3,
    title: 'Vấn đề giới tính & kỹ năng phòng chống xâm hại cho trẻ',
    date: '14/5/2024 • 19:00 - 21:00',
    description: 'Một chuyên đề khẩn thiết cho mọi gia đình. Trang bị cho trẻ và cha mẹ kiến thức...',
    badge: 'MỚI',
    badgeColor: 'bg-orange-500',
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[610px] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gray-900" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Hero Content */}
          <div className="flex flex-col justify-center">
            <span className="text-xs font-semibold text-gray-300 tracking-widest uppercase mb-4">
              THUỘC HỘI DÒNG TÊN • ĐẮC LỘ
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Đồng hành gia
              <br />
              đình trong tình
              <br />
              yêu và đức tin
            </h1>
            <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              Trung tâm cung cấp các khóa học, tư vấn mục vụ và
              chuyên đề nhằm vun đắp đời sống hôn nhân – gia đình theo
              tinh thần Tin Mừng và linh đạo Dòng Tên.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/khoa-hoc"
                className="bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Xem khóa học mới
              </Link>
              <Link
                href="/tu-van"
                className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Đăng ký tư vấn
              </Link>
            </div>
          </div>

          {/* Course Sidebar */}
          <div className="bg-primary/90 backdrop-blur-sm rounded-lg p-6 lg:p-8 shadow-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wide mb-6">
              KHÓA HỌC SẮP KHAI GIẢNG
            </h2>
            <div className="space-y-4">
              {upcomingCourses.map((course) => (
                <div
                  key={course.id}
                  className="border-b border-white/20 last:border-b-0 pb-4 last:pb-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-300 mb-2">{course.date}</p>
                      <p className="text-xs text-white/80 line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/khoa-hoc"
              className="block mt-6 text-sm font-medium text-white hover:text-accent transition-colors"
            >
              Xem tất cả khóa học →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}