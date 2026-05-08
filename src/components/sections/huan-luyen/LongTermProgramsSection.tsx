'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import LucideIcon from '@/components/ui/LucideIcon';

// Fallback data if API is unavailable
const fallbackPrograms = [
  {
    id: 'nguoi-dong-hanh-gia-dinh-cong-giao',
    title: 'Huấn luyện Người Đồng Hành Gia Đình Công Giáo',
    description: 'Chương trình đào tạo chuyên sâu cho những ai mong muốn trở thành người đồng hành các gia đình theo linh đạo Dòng Tên.',
    duration: '6 tháng',
    organization: '2 đợt / năm',
    currentCourse: 'Khóa 1 – 2026',
    href: '/huan-luyen/nguoi-dong-hanh-gia-dinh-cong-giao',
    color: 'rgb(138, 26, 26)',
    icon: 'HeartHandshake',
  },
  {
    id: 'giao-ly-vien-hon-nhan',
    title: 'Huấn luyện Giáo Lý Viên Hôn Nhân',
    description: 'Đào tạo các giáo lý viên đồng hành các đôi chuẩn bị bước vào Bí tích Hôn Phối với chiều sâu tâm lý và linh đạo.',
    duration: '4 tháng',
    organization: '1 đợt / năm',
    currentCourse: 'Khóa 3 – 2026',
    href: '/huan-luyen/giao-ly-vien-hon-nhan',
    color: 'rgb(160, 82, 45)',
    icon: 'BookOpen',
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

function colorToRgba(color: string, alpha: number): string {
  // Handle hex format: #8A1A1A or #8A1A1A00
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // Handle rgb format: rgb(138, 26, 26)
  const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (match) {
    return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})`;
  }
  
  // Return as-is if format not recognized
  return color;
}

export default function LongTermProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>(fallbackPrograms);
  const [loading, setLoading] = useState(true);
  
  // Use ref to prevent duplicate fetches
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent duplicate fetches in React strict mode
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
        const res = await fetch(`${baseUrl}/api/programs?limit=10`, {
          next: { revalidate: 60 },
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.data?.length > 0) {
            setPrograms(data.data.map((p: any) => ({
              id: p.slug,
              title: p.title,
              description: p.description || '',
              duration: p.duration || '—',
              organization: p.schedule || '—',
              currentCourse: p.current_cohort || '—',
              href: `/huan-luyen/${p.slug}`,
              color: p.color_hex || 'rgb(138, 26, 26)',
              icon: p.icon || 'BookOpen',
            })));
          }
        }
      } catch {
        // Fallback to hardcoded data
        setPrograms(fallbackPrograms);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="container mx-auto px-4 py-10">
        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-2xl font-bold md:text-3xl">Các chương trình huấn luyện dài hạn</h2>
          <p className="text-muted-foreground">
            Hành trình đào tạo bài bản, kết hợp linh đạo Dòng Tên với chuyên môn tâm lý — gia đình.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse border rounded-3xl p-7">
              <div className="h-12 w-12 bg-slate-200 rounded-2xl mb-5"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-5"></div>
              <div className="border-t pt-5 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
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
          const iconBgColor = colorToRgba(program.color, 0.094);
          
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
                  <LucideIcon name={program.icon} className="h-6 w-6" />
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
                    <LucideIcon name="Clock" className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">Thời lượng</dt>
                      <dd className="font-medium">{program.duration}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <LucideIcon name="Calendar" className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">Tổ chức</dt>
                      <dd className="font-medium">{program.organization}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <LucideIcon name="Award" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
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
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-white border border-primary-border min-h-9 px-4 py-2 rounded-full"
                  >
                    Xem chi tiết
                    <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
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