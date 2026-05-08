'use client';

import Link from 'next/link';
import LucideIcon from '@/components/ui/LucideIcon';

interface Program {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  summary: string | null;
  duration: string | null;
  schedule: string | null;
  current_cohort: string | null;
  icon: string | null;
  color_hex: string;
}

interface ProgramDetailHeroProps {
  program: Program;
}


export default function ProgramDetailHero({ program }: ProgramDetailHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#8B1D1D]/90 to-[#8B1D1D]/95 py-8 lg:py-12">
      {/* Background */}
      <div className="absolute inset-0 bg-[#8B1D1D]" />
      
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 flex-wrap">
          <Link href="/" className="text-white/60 text-sm font-serif hover:text-white transition-colors">
            Trang chủ
          </Link>
          <span className="text-white/60 text-sm">›</span>
          <Link href="/huan-luyen" className="text-white/60 text-sm font-serif hover:text-white transition-colors">
            Huấn luyện
          </Link>
          <span className="text-white/60 text-sm">›</span>
          <span className="text-white text-sm font-serif">
            {program.title}
          </span>
        </nav>

        {/* Title & Badges */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 border border-white/20 w-fit">
            <span className="text-base">✨</span>
            <span className="text-white text-xs font-semibold font-serif tracking-widest uppercase">
              CHƯƠNG TRÌNH HUẤN LUYỆN
            </span>
          </div>

          {/* Title & Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              {/* Program Icon */}
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ 
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#ffffff", 
                }}
              >
                <LucideIcon name={program.icon || 'BookOpen'} className="h-6 w-6" />
              </div>
              <h1 className="text-white text-3xl lg:text-5xl font-bold font-serif leading-tight">
                {program.title}
              </h1>
            </div>
            <p className="text-white/90 text-base lg:text-lg font-serif leading-relaxed max-w-3xl">
              {program.summary || program.description?.replace(/<[^>]*>/g, '').substring(0, 200) || 'Chương trình đào tạo chuyên sâu tại Trung tâm Mục vụ Gia đình Đắc Lộ.'}
            </p>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Duration Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-white/60 text-xs font-bold font-serif tracking-widest uppercase">
                THỜI LƯỢNG
              </span>
            </div>
            <p className="text-white text-xl font-bold font-serif">
              {program.duration || '6 tháng'}
            </p>
          </div>

          {/* Schedule Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white/60 text-xs font-bold font-serif tracking-widest uppercase">
                TỔ CHỨC
              </span>
            </div>
            <p className="text-white text-xl font-bold font-serif">
              {program.schedule || '2 đợt / năm'}
            </p>
          </div>

          {/* Current Cohort Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-white/60 text-xs font-bold font-serif tracking-widest uppercase">
                KHÓA HIỆN TẠI
              </span>
            </div>
            <p className="text-white text-xl font-bold font-serif">
              {program.current_cohort || 'Khóa 1 - 2026'}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <a
            href="#dang-ky"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-[#8B1D1D]/30 min-h-10 px-8 rounded-full bg-white text-[#8B1D1D] hover:bg-white/90 font-serif"
          >
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
            Đăng ký khóa này
          </a>
        </div>
      </div>
    </section>
  );
}