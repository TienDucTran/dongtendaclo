import Link from 'next/link';

const programs = [
  {
    id: '01',
    title: 'Tư vấn mục vụ & tâm lý',
    description: 'Không gian lắng nghe và đồng hành dành cho cá nhân, cặp đôi và gia đình đang đối diện với những khó khăn trong đời sống tâm lý, tương quan, hôn nhân, gia đình hoặc đức tin.',
    tags: ['Cá nhân', 'Cặp đôi', 'Gia đình', 'Linh hướng'],
    cta: 'Tìm hiểu thêm / Đặt lịch hẹn',
    href: 'tu-van',
    color: 'rgb(138, 26, 26)', // Primary red
  },
  {
    id: '02',
    title: 'Đồng Hành Gia Đình Trẻ',
    description: 'Một cộng đoàn nâng đỡ các gia đình trẻ qua các buổi gặp gỡ, chia sẻ, cầu nguyện, học hỏi và sinh hoạt chung, giúp các gia đình lớn lên trong tình yêu, đức tin và sự hiệp thông.',
    tags: ['Gia đình trẻ', 'Cộng đoàn', 'Sinh hoạt'],
    cta: 'Tìm hiểu thêm',
    href: 'dong-hanh',
    color: 'rgb(160, 82, 45)', // Brown
  },
  {
    id: '03',
    title: 'Tĩnh tâm: Gia đình cùng gặp Chúa',
    description: 'Các khóa tĩnh tâm cuối tuần dành cho đôi bạn, vợ chồng và gia đình, giúp dừng lại, lắng nghe nhau và gặp gỡ Thiên Chúa trong chính thực tại đời thường.',
    tags: ['Tĩnh tâm', 'Cuối tuần', 'Vợ chồng'],
    cta: 'Xem khóa tĩnh tâm đang mở',
    href: 'tinh-tam',
    color: 'rgb(22, 101, 52)', // Green
  },
  {
    id: '04',
    title: 'Linh thao cho các gia đình',
    description: 'Các khóa linh thao dành cho gia đình theo linh đạo I-nhã, thường kéo dài 5-8 ngày, giúp người tham dự đi vào hành trình cầu nguyện, phân định và canh tân đời sống gia đình.',
    tags: ['Linh thao', 'I-nhã', '5-8 ngày'],
    cta: 'Xem lịch linh thao / Đăng ký',
    href: 'linh-thao',
    color: 'rgb(30, 58, 138)', // Blue
  },
];

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}

function rgbToRgba(rgb: string, alpha: number): string {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (match) {
    return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})`;
  }
  return rgb;
}

export default function MainProgramsSection() {
  return (
    <section className="bg-[#FBF8FC] py-20 lg:py-[80px]">
      <div className="container mx-auto px-4 lg:px-8">
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
          {programs.map((program) => {
            const iconBgColor = rgbToRgba(program.color, 0.094);
            
            return (
              <div
                key={program.id}
                className="border bg-card text-card-foreground shadow group relative overflow-hidden rounded-3xl border-border/70 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Top Color Bar */}
                <div
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: program.color }}
                />

                <div className="p-7">
                  {/* Icon + Number */}
                  <div
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: iconBgColor, color: program.color }}
                  >
                    <span className="text-sm font-mono font-bold">
                      {program.id}
                    </span>
                  </div>

                  {/* Title with Link */}
                  <h3 className="mb-2 text-xl font-bold leading-snug md:text-2xl">
                    <Link href={`/muc-vu/${program.href}`} className="hover:underline">
                      {program.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="mb-5 text-sm leading-6 text-muted-foreground">
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

                  {/* Divider */}
                  <div className="border-t border-border/60 pt-5">
                    {/* CTA Button */}
                    <Link
                      href={`/muc-vu/${program.href}`}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-9 px-4 py-2 rounded-full"
                    >
                      {program.cta}
                      <ArrowRightIcon className="ml-1.5 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}