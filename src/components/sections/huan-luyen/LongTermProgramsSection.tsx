import Link from 'next/link';

// Fallback data if API is unavailable (e.g., database not set up yet)
const fallbackPrograms = [
  {
    id: 'nguoi-dong-hanh-gia-dinh-cong-giao',
    title: 'Huấn luyện Người Đồng Hành Gia Đình Công Giáo',
    description: 'Chương trình đào tạo chuyên sâu cho những ai mong muốn trở thành người đồng hành các gia đình theo linh đạo Dòng Tên.',
    duration: '6 tháng',
    organization: '2 đợt / năm',
    currentCourse: 'Khóa 1 – 2026',
    href: '/huan-luyen/nguoi-dong-hanh-gia-dinh-cong-giao',
    color: 'rgb(138, 26, 26)', // Primary red
    icon: 'heart-handshake',
  },
  {
    id: 'giao-ly-vien-hon-nhan',
    title: 'Huấn luyện Giáo Lý Viên Hôn Nhân',
    description: 'Đào tạo các giáo lý viên đồng hành các đôi chuẩn bị bước vào Bí tích Hôn Phối với chiều sâu tâm lý và linh đạo.',
    duration: '4 tháng',
    organization: '1 đợt / năm',
    currentCourse: 'Khóa 3 – 2026',
    href: '/huan-luyen/giao-ly-vien-hon-nhan',
    color: 'rgb(160, 82, 45)', // Brown
    icon: 'book-open',
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
  color: string;
  icon: string;
}

// Icon components
function HeartHandshakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"></path>
    </svg>
  );
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 7v14"></path>
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6v6l4 2"></path>
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4"></path>
      <path d="M16 2v4"></path>
      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
      <path d="M3 10h18"></path>
    </svg>
  );
}

function CircleCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}

function getProgramIcon(icon: string, className: string) {
  switch (icon) {
    case 'heart-handshake':
      return <HeartHandshakeIcon className={className} />;
    case 'book-open':
      return <BookOpenIcon className={className} />;
    default:
      return <BookOpenIcon className={className} />;
  }
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function rgbToRgba(rgb: string, alpha: number): string {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (match) {
    return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})`;
  }
  return rgb;
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
          color: p.color_hex || 'rgb(138, 26, 26)',
          icon: p.icon || 'book-open',
        }));
      }
    }
  } catch {
    // Fallback to hardcoded data if API fails
    programs = fallbackPrograms;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Section Header */}
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-2xl font-bold md:text-3xl">
          Các chương trình huấn luyện dài hạn
        </h2>
        <p className="text-muted-foreground">
          Hành trình đào tạo bài bản, kết hợp linh đạo Dòng Tên với chuyên môn tâm lý — gia đình.
        </p>
      </div>

      {/* Programs Grid */}
      <div className="grid gap-6 md:grid-cols-2">
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
                {/* Icon */}
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: iconBgColor, color: program.color }}
                >
                  {getProgramIcon(program.icon, 'h-6 w-6')}
                </div>

                {/* Title with Link */}
                <h3 className="mb-2 text-xl font-bold leading-snug md:text-2xl">
                  <Link href={program.href} className="hover:underline">
                    {program.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="mb-5 text-sm leading-6 text-muted-foreground">
                  {program.description}
                </p>

                {/* Metadata */}
                <dl className="grid grid-cols-1 gap-3 border-t border-border/60 pt-5 text-sm sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">Thời lượng</dt>
                      <dd className="font-medium">{program.duration}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CalendarIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">Tổ chức</dt>
                      <dd className="font-medium">{program.organization}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <CircleCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">Khóa hiện tại</dt>
                      <dd className="font-medium">{program.currentCourse}</dd>
                    </div>
                  </div>
                </dl>

                {/* CTA Button */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={program.href}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-9 px-4 py-2 rounded-full"
                  >
                    Xem chi tiết
                    <ArrowRightIcon className="ml-1.5 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}