import Link from 'next/link';

const programs = [
  {
    id: 1,
    title: 'Tư vấn mục vụ & tâm lý',
    description: 'Không gian lắng nghe và đồng hành dành cho cá nhân, cặp đôi và gia đình đang đối diện với khó khăn...',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    href: '/tu-van',
  },
  {
    id: 2,
    title: 'Đồng Hành Gia Đình Trẻ',
    description: 'Một cộng đoàn năng động để các gia đình trẻ qua các buổi gặp gỡ, chia sẻ, cầu nguyện, học hỏi...',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    href: '/dong-hanh',
  },
  {
    id: 3,
    title: 'Tĩnh tâm: Gia đình cùng gặp Chúa',
    description: 'Các khóa tĩnh tâm cuối tuần dành cho đôi bạn, vợ chồng và gia đình, giúp dừng lại, lắng nghe...',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    href: '/tinh-tam',
  },
  {
    id: 4,
    title: 'Linh thao cho các gia đình',
    description: 'Các khóa linh thao dành cho gia đình theo linh đạo I-nhã, thường kéo dài 5-8 ngày, giúp người...',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.24 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    href: '/linh-thao',
  },
];

export default function ProgramsSection() {
  return (
    <section className="py-20 bg-gray-50/30">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Các Chương Trình Mục Vụ
            </h2>
          </div>
          <Link
            href="/muc-vu"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={program.href}
              className="group bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {program.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {program.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {program.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}