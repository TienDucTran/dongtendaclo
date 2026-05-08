'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, UserRound, BookOpen, ArrowLeft } from 'lucide-react';

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  program_id: number | null;
  category_id: number | null;
  course_type: string;
  format: string;
  status: string;
  status_label: string | null;
  format_label: string | null;
  start_date: string | null;
  students_count: number;
  order: number;
  is_featured: boolean;
  is_new: boolean;
  location: string | null;
  audience: string[];
  color_hex: string;
  created_at: string;
  updated_at: string;
  program_name?: string | null;
  category_name?: string | null;
}

interface CourseDetailClientProps {
  course: Course;
}

// Get status display info
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'active':
      return { label: 'Đang mở', color: 'bg-emerald-500/95' };
    case 'upcoming':
      return { label: 'Sắp khai giảng', color: 'bg-amber-500/95' };
    case 'completed':
      return { label: 'Đã kết thúc', color: 'bg-slate-500/95' };
    default:
      return { label: 'Sắp khai giảng', color: 'bg-amber-500/95' };
  }
};

// Get format label
const getFormatLabel = (format: string) => {
  switch (format) {
    case 'in_person':
      return 'Trực tiếp';
    case 'online':
      return 'Online';
    case 'hybrid':
      return 'Kết hợp';
    default:
      return format;
  }
};

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const statusInfo = getStatusInfo(course.status);
  const formatLabel = course.format_label || getFormatLabel(course.format);
  const categoryDisplay = course.category_name || 'Khóa học';
  const bgColor = course.color_hex 
    ? `${course.color_hex}15`
    : 'rgba(126, 63, 160, 0.094)';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Submit registration to API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Cover Image Section */}
      <section className="relative w-full bg-slate-100">
        <div className="container mx-auto px-4 pt-6 max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl aspect-[16/7] shadow-lg bg-primary">
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              <BookOpen className="h-24 w-24 text-white/30" aria-hidden="true" />
            </div>
            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4 md:p-6">
              <span className="inline-flex items-center rounded-full bg-primary/95 px-3 py-1 text-xs md:text-sm font-semibold text-white shadow-sm backdrop-blur">
                {categoryDisplay}
              </span>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs md:text-sm font-semibold shadow-sm backdrop-blur text-white ${statusInfo.color}`}>
                {course.status_label || statusInfo.label}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Title Section */}
      <section className="bg-primary text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          {/* Breadcrumb */}
          <Link 
            href="/huan-luyen" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh sách khóa học
          </Link>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            {course.title}
          </h1>

          {course.description && (
            <p className="text-xl md:text-2xl text-white/80 font-light mb-8 leading-relaxed line-clamp-3">
              {course.description}
            </p>
          )}

          {/* Meta Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/20">
            {course.start_date && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>{course.start_date}</span>
              </div>
            )}
            {course.format && (
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>{formatLabel}</span>
              </div>
            )}
            {course.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>{course.location}</span>
              </div>
            )}
            {course.audience && course.audience.length > 0 && (
              <div className="flex items-center gap-3">
                <UserRound className="w-5 h-5 text-amber-400" />
                <span>{course.audience.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {course.description ? (
              <div className="text-xl text-slate-500 font-medium leading-relaxed mb-8 border-l-4 border-amber-400 pl-6">
                <div className="whitespace-pre-wrap">{course.description}</div>
              </div>
            ) : null}

            {/* Additional content could go here */}
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">Thông tin chi tiết</h2>
              
              <div className="space-y-4 text-slate-600">
                <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Loại hình</p>
                    <p>{course.course_type} • {formatLabel}</p>
                  </div>
                </div>

                {course.audience && course.audience.length > 0 && (
                  <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <UserRound className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Đối tượng</p>
                      <p>{course.audience.join(', ')}</p>
                    </div>
                  </div>
                )}

                {course.location && (
                  <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Địa điểm</p>
                      <p>{course.location}</p>
                    </div>
                  </div>
                )}

                {course.start_date && (
                  <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Thời gian</p>
                      <p>{course.start_date}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Registration Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-lg sticky top-28">
              <h3 className="text-2xl font-serif font-bold mb-6 text-slate-900">Đăng ký tham gia</h3>
              
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Đăng ký thành công!</h4>
                  <p className="text-slate-500 text-sm">Chúng tôi sẽ liên hệ với bạn qua số điện thoại đã cung cấp.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                      Họ và tên
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Nhập họ tên của bạn"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                      className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="09x xxx xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Email <span className="text-slate-400">(Tùy chọn)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium text-slate-700">
                      Ghi chú thêm
                    </label>
                    <textarea
                      id="notes"
                      placeholder="Bạn có thắc mắc gì không?"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center w-full bg-primary text-white border border-primary min-h-10 px-8 py-3 text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
