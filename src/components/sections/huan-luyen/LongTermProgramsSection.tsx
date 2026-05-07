import Link from 'next/link';

// Fallback data if API is unavailable (e.g., database not set up yet)
const fallbackPrograms = [
  {
    id: 'dong-hanh-gia-dinh',
    title: 'Huấn luyện Người Đồng Hành Gia Đình Công Giáo',
    description: 'Chương trình đào tạo chuyên sâu cho những ai mong muốn trở thành người đồng hành các gia đình theo linh đạo Dòng Tên.',
    duration: '6 tháng',
    organization: '2 đợt / năm',
    currentCourse: 'Khóa 1 – 2026',
    href: '/huan-luyen/dong-hanh-gia-dinh',
  },
  {
    id: 'giao-ly-vien-hon-nhan',
    title: 'Huấn luyện Giáo Lý Viên Hôn Nhân',
    description: 'Đào tạo các giáo lý viên đồng hành các đôi chuẩn bị bước vào Bí tích Hôn Phối với chiều sâu tâm lý và linh đạo.',
    duration: '4 tháng',
    organization: '1 đợt / năm',
    currentCourse: 'Khóa 3 – 2026',
    href: '/huan-luyen/giao-ly-vien-hon-nhan',
  },
];

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  organization: string;
  currentCourse: string;
  href: string;
}

export default async function LongTermProgramsSection() {
  let programs: Program[] = fallbackPrograms;

  try {
    // Try fetching from API
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/programs?limit=10`, {
      next: { revalidate: 60 }, // ISR every 60 seconds
    });
    if (res.ok) {
      const data = await res.json();
      if (data.data?.length > 0) {
        programs = data.data.map((p: any) => ({
          id: p.slug,
          title: p.title,
          description: p.description || '',
          duration: '—',
          organization: '—',
          currentCourse: '—',
          href: `/huan-luyen/${p.slug}`,
        }));
      }
    }
  } catch {
    // Fallback to hardcoded data if API fails
    programs = fallbackPrograms;
  }

  return (
    <section className="py-16 px-4 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif text-slate-900 mb-4">
            Các chương trình huấn luyện dài hạn
          </h2>
          <p className="text-slate-500 font-serif max-w-2xl mx-auto">
            Hành trình đào tạo bài bản, kết hợp linh đạo Dòng Tên với chuyên môn tâm lý — gia đình.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-card-bg border border-slate-100 rounded-3xl p-8 pt-16 relative overflow-hidden"
            >
              {/* Background Icon */}
              <div className="absolute top-8 left-8 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold font-serif text-slate-900 mb-4 leading-tight">
                {program.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 font-serif text-sm leading-relaxed mb-6">
                {program.description}
              </p>

              {/* Divider */}
              <div className="border-t border-slate-100 pt-6 mb-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-xs font-bold font-serif text-slate-400 tracking-[0.05em] uppercase mb-1">THỜI LƯỢNG</p>
                      <p className="text-sm font-bold font-serif text-slate-900">{program.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-xs font-bold font-serif text-slate-400 tracking-[0.05em] uppercase mb-1">TỔ CHỨC</p>
                      <p className="text-sm font-bold font-serif text-slate-900">{program.organization}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-xs font-bold font-serif text-slate-400 tracking-[0.05em] uppercase mb-1">KHÓA HIỆN TẠI</p>
                      <p className="text-sm font-bold font-serif text-slate-900">{program.currentCourse}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={program.href}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold font-serif text-sm hover:bg-primary-800 transition-colors"
              >
                Xem chi tiết
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}