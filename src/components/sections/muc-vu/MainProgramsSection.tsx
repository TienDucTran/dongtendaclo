import Link from 'next/link';

const programs = [
  {
    id: '01',
    title: 'Tư vấn mục vụ & tâm lý',
    description: 'Không gian lắng nghe và đồng hành dành cho cá nhân, cặp đôi và gia đình đang đối diện với những khó khăn trong đời sống tâm lý, tương quan, hôn nhân, gia đình hoặc đức tin.',
    tags: ['Cá nhân', 'Cặp đôi', 'Gia đình', 'Linh hướng'],
    cta: 'Tìm hiểu thêm / Đặt lịch hẹn',
    href: '/tu-van',
  },
  {
    id: '02',
    title: 'Đồng Hành Gia Đình Trẻ',
    description: 'Một cộng đoàn nâng đỡ các gia đình trẻ qua các buổi gặp gỡ, chia sẻ, cầu nguyện, học hỏi và sinh hoạt chung, giúp các gia đình lớn lên trong tình yêu, đức tin và sự hiệp thông.',
    tags: ['Gia đình trẻ', 'Cộng đoàn', 'Sinh hoạt'],
    cta: 'Tìm hiểu thêm',
    href: '/dong-hanh',
  },
  {
    id: '03',
    title: 'Tĩnh tâm: Gia đình cùng gặp Chúa',
    description: 'Các khóa tĩnh tâm cuối tuần dành cho đôi bạn, vợ chồng và gia đình, giúp dừng lại, lắng nghe nhau và gặp gỡ Thiên Chúa trong chính thực tại đời thường.',
    tags: ['Tĩnh tâm', 'Cuối tuần', 'Vợ chồng'],
    cta: 'Xem khóa tĩnh tâm đang mở',
    href: '/tinh-tam',
  },
  {
    id: '04',
    title: 'Linh thao cho các gia đình',
    description: 'Các khóa linh thao dành cho gia đình theo linh đạo I-nhã, thường kéo dài 5-8 ngày, giúp người tham dự đi vào hành trình cầu nguyện, phân định và canh tân đời sống gia đình.',
    tags: ['Linh thao', 'I-nhã', '5-8 ngày'],
    cta: 'Xem lịch linh thao / Đăng ký',
    href: '/linh-thao',
  },
];

export default function MainProgramsSection() {
  return (
    <section className="bg-[#FBF8FC] py-20 lg:py-[80px]">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex flex-col gap-2 mb-4">
            <div className="bg-[#FEF9C3] rounded-[2px] px-2 py-1 inline-block">
              <span className="text-[#854D0E] text-[10px] font-bold font-serif uppercase tracking-wider">
                BỐN CHƯƠNG TRÌNH CHÍNH
              </span>
            </div>
            <h2 className="text-[30px] font-bold font-serif text-slate-800">
              Các chương trình mục vụ chính
            </h2>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl shadow-sm border-l-4 border-primary p-8 flex flex-col justify-between min-h-[306px]"
            >
              <div>
                {/* Icon placeholder + Number */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#FEF2F2] rounded-lg flex items-center justify-center">
                    <span className="text-sm font-mono text-slate-400">
                      {program.id}
                    </span>
                  </div>
                  <h3 className="text-[24px] font-bold font-serif text-slate-800 flex-1">
                    {program.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[16px] font-serif text-slate-600 leading-[1.625] mb-6">
                  {program.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {program.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#F1F5F9] text-slate-500 text-[12px] font-serif px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={program.href}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold font-serif text-[14px] hover:bg-primary-800 transition-colors w-fit"
              >
                {program.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}