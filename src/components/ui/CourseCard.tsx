import Link from 'next/link';
import { Calendar, Users, MapPin, BookOpen } from 'lucide-react';

interface Course {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  category?: string | null;
  category_name?: string | null;
  type?: string | null;
  format?: string | null;
  format_label?: string | null;
  status?: string;
  status_label?: string | null;
  start_date?: string | null;
  audience?: string[];
  location?: string | null;
  color_hex?: string;
  is_featured?: boolean;
  is_new?: boolean;
}

interface CourseCardProps {
  course: Course;
}

// Get status badge color
const getStatusColor = (status?: string) => {
  switch (status) {
    case 'upcoming':
      return 'bg-amber-500';
    case 'active':
      return 'bg-emerald-600';
    case 'completed':
      return 'bg-slate-500';
    default:
      return 'bg-amber-500';
  }
};

// Get status label
const getStatusLabel = (status?: string, statusLabel?: string | null) => {
  if (statusLabel) return statusLabel;
  switch (status) {
    case 'upcoming':
      return 'Sắp khai giảng';
    case 'active':
      return 'Đang mở đăng ký';
    case 'completed':
      return 'Đã kết thúc';
    default:
      return 'Sắp khai giảng';
  }
};

export default function CourseCard({ course }: CourseCardProps) {
  // Use category_name if available, fallback to category
  const categoryDisplay = course.category_name || course.category || 'Khóa học';
  
  // Generate background color from color_hex
  const bgColor = course.color_hex 
    ? `${course.color_hex}15` // 15 = 8% opacity in hex
    : 'rgba(126, 63, 160, 0.094)';

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md transition-all">
      {/* Cover Image Area */}
      <Link href={`/khoa-hoc/${course.slug}`}>
        <div className="relative aspect-[2/1] cursor-pointer overflow-hidden bg-slate-100">
          <div 
            className="flex h-full w-full items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <BookOpen className="h-14 w-14 opacity-25 text-slate-600" aria-hidden="true" />
          </div>
          {/* Badges */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
            <span className="inline-flex items-center rounded-full bg-primary/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur">
              {categoryDisplay}
            </span>
            <div 
              className="whitespace-nowrap inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm" 
              style={{ backgroundColor: getStatusColor(course.status) }}
            >
              {getStatusLabel(course.status, course.status_label)}
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex min-h-0 flex-1 flex-col p-5">
        {/* Type & Format */}
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <div className="whitespace-nowrap inline-flex items-center rounded-md border border-slate-200 bg-slate-100 px-2.5 py-0.5 font-semibold text-slate-700 text-[11px]">
            {course.format_label || 'Khóa học'}
          </div>
          <span>•</span>
          <span>{course.format_label || course.format || 'Trực tiếp'}</span>
        </div>

        {/* Title */}
        <Link href={`/khoa-hoc/${course.slug}`}>
          <h3 className="mb-2 line-clamp-2 min-h-[3.5rem] text-lg font-bold font-serif text-slate-900 leading-snug group-hover:text-primary transition-colors">
            {course.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mb-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-500">
          {course.description || 'Mô tả khóa học sẽ được cập nhật...'}
        </p>

        {/* Footer Info */}
        <div className="space-y-1.5 border-t border-slate-200 pt-3 text-xs text-slate-500 mt-auto">
          {course.start_date && (
            <p className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              <span>{course.start_date}</span>
            </p>
          )}
          {course.audience && course.audience.length > 0 && (
            <p className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              <span className="line-clamp-1">{course.audience.join(', ')}</span>
            </p>
          )}
          {course.location && (
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              <span className="truncate">{course.location}</span>
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link 
            href={`/khoa-hoc/${course.slug}`}
            className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-white border border-primary min-h-8 px-4 py-2 text-xs font-semibold rounded-full hover:bg-primary/90 transition-colors"
          >
            Chi tiết & Đăng ký
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5" aria-hidden="true">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
          <Link 
            href={`/khoa-hoc/${course.slug}#lich-khai-giang`}
            className="inline-flex items-center justify-center whitespace-nowrap border border-slate-300 bg-white text-slate-700 min-h-8 px-4 py-2 text-xs font-semibold rounded-full hover:bg-slate-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5" aria-hidden="true">
              <path d="M12 6v6l4 2"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            Lịch khai giảng
          </Link>
        </div>
      </div>
    </div>
  );
}