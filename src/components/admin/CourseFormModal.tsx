'use client';

import { useState, useEffect } from 'react';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface Course {
  id: number;
  title: string;
  slug: string;
  subtitle?: string | null;
  description?: string | null;
  short_description?: string | null;
  category_id?: number | null;
  category_name?: string | null;
  program_id?: number | null;
  program_name?: string | null;
  course_type: string;
  format: string;
  status: string;
  status_label?: string | null;
  format_label?: string | null;
  target_audience?: string | null;
  schedule?: string | null;
  time_frame?: string | null;
  start_date?: string | null;
  location?: string | null;
  instructor?: string | null;
  cover_image?: string | null;
  students_count?: number | null;
  order: number;
  color_hex?: string | null;
  is_featured: boolean;
  is_new: boolean;
}

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CourseFormData) => Promise<void>;
  initialData?: Course | null;
  programs?: { id: number; title: string }[];
  categories?: { id: number; name: string }[];
}

export interface CourseFormData {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  short_description: string;
  category_id: number | null;
  program_id: number | null;
  course_type: string;
  format: string;
  status: string;
  target_audience: string;
  schedule: string;
  time_frame: string;
  start_date: string;
  location: string;
  instructor: string;
  cover_image: string;
  students_count: number;
  order: number;
  color_hex: string;
  is_featured: boolean;
  is_new: boolean;
}

const defaultFormData: CourseFormData = {
  title: '',
  slug: '',
  subtitle: '',
  description: '',
  short_description: '',
  category_id: null,
  program_id: null,
  course_type: 'course',
  format: 'in_person',
  status: 'active',
  target_audience: '',
  schedule: '',
  time_frame: '',
  start_date: '',
  location: '',
  instructor: '',
  cover_image: '',
  students_count: 0,
  order: 0,
  color_hex: '#8A1A1A',
  is_featured: false,
  is_new: false,
};

// Course type options
const courseTypeOptions = [
  { value: 'course', label: 'Khóa học' },
  { value: 'workshop', label: 'Chuyên đề' },
  { value: 'retreat', label: 'Tĩnh tâm' },
  { value: 'seminar', label: 'Hội thảo' },
];

// Format options
const formatOptions = [
  { value: 'in_person', label: 'Trực tiếp' },
  { value: 'online', label: 'Online' },
  { value: 'hybrid', label: 'Kết hợp' },
];

// Status options
const statusOptions = [
  { value: 'active', label: 'Đang mở' },
  { value: 'upcoming', label: 'Sắp khai giảng' },
  { value: 'completed', label: 'Đã qua' },
];

export default function CourseFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  programs = [],
  categories = [],
}: CourseFormModalProps) {
  const [formData, setFormData] = useState<CourseFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        subtitle: initialData.subtitle || '',
        description: initialData.description || '',
        short_description: initialData.short_description || '',
        category_id: initialData.category_id || null,
        program_id: initialData.program_id || null,
        course_type: initialData.course_type || 'course',
        format: initialData.format || 'in_person',
        status: initialData.status || 'active',
        target_audience: initialData.target_audience || '',
        schedule: initialData.schedule || '',
        time_frame: initialData.time_frame || '',
        start_date: initialData.start_date ? initialData.start_date.split('T')[0] : '',
        location: initialData.location || '',
        instructor: initialData.instructor || '',
        cover_image: initialData.cover_image || '',
        students_count: initialData.students_count || 0,
        order: initialData.order || 0,
        color_hex: initialData.color_hex || '#8A1A1A',
        is_featured: initialData.is_featured ?? false,
        is_new: initialData.is_new ?? false,
      });
    } else {
      setFormData(defaultFormData);
    }
    setErrors({});
  }, [initialData, isOpen]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug === '' || !initialData ? generateSlug(title) : prev.slug,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error: any) {
      setErrors({ submit: error.message || 'Có lỗi xảy ra' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 shadow-2xl sm:rounded-lg"
        role="dialog"
        aria-describedby="modal-description"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left border-b border-gray-200 pb-4">
          <h2 id="modal-title" className="text-xl font-bold leading-none tracking-tight text-gray-900">
            {initialData ? 'Chỉnh sửa khóa học' : 'Thêm mới'}
          </h2>
          <p className="text-sm text-gray-500">
            {initialData ? 'Cập nhật thông tin khóa học chuyên đề' : 'Điền thông tin chi tiết cho khóa học mới'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Tiêu đề
                <span className="text-destructive ml-0.5">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tên khóa học"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Slug
                <span className="text-destructive ml-0.5">*</span>
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="vi-du-khoa-hoc"
              />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug}</p>
              )}
            </div>

            {/* Subtitle */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">
                Phụ đề
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Phụ đề cho khóa học"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Danh mục
              </label>
              <select
                value={formData.category_id || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value ? parseInt(e.target.value) : null }))}
                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">— Chọn danh mục —</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Format */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Hình thức
              </label>
              <select
                value={formData.format}
                onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value }))}
                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                {formatOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Trạng thái
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Course Type */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Loại sự kiện
              </label>
              <select
                value={formData.course_type}
                onChange={(e) => setFormData(prev => ({ ...prev, course_type: e.target.value }))}
                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                {courseTypeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Target Audience */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Đối tượng (cách nhau dấu phẩy)
              </label>
              <input
                type="text"
                value={formData.target_audience}
                onChange={(e) => setFormData(prev => ({ ...prev, target_audience: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Vợ chồng trẻ, Bạn trẻ"
              />
            </div>

            {/* Schedule */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Lịch học
              </label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Thứ 7 hàng tuần"
              />
            </div>

            {/* Time Frame */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Khung giờ
              </label>
              <input
                type="text"
                value={formData.time_frame}
                onChange={(e) => setFormData(prev => ({ ...prev, time_frame: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="19:30 - 21:00"
              />
            </div>

            {/* Program */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Thuộc chương trình huấn luyện
              </label>
              <select
                value={formData.program_id || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, program_id: e.target.value ? parseInt(e.target.value) : null }))}
                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">— Chuyên đề (không thuộc chương trình)</option>
                {programs.map(prog => (
                  <option key={prog.id} value={prog.id}>{prog.title}</option>
                ))}
              </select>
            </div>

            {/* Students Count */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Số học viên (lịch sử)
              </label>
              <input
                type="number"
                value={formData.students_count}
                onChange={(e) => setFormData(prev => ({ ...prev, students_count: parseInt(e.target.value) || 0 }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="0"
              />
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Địa điểm
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Trung tâm Mục Vụ Gia Đình"
              />
            </div>

            {/* Instructor */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Giảng viên
              </label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tên giảng viên"
              />
            </div>

            {/* Cover Image */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">
                Ảnh cover
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.cover_image}
                    onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="URL ảnh hoặc tải tệp lên"
                  />
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border shadow-sm min-h-8 rounded-md px-3 text-xs hover:bg-gray-50"
                    title="Tải lên (tối đa 10 MB)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M12 3v12" />
                      <path d="m17 8-5-5-5 5" />
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    </svg>
                    <span className="ml-1.5 hidden sm:inline">Tải lên</span>
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Chấp nhận JPG, PNG, WebP, GIF, SVG — tối đa 10 MB.</p>
              </div>
            </div>

            {/* Short Description - Rich Text Editor */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">
                Mô tả ngắn
              </label>
              <div className="border rounded-md bg-background overflow-hidden">
                <RichTextEditor
                  value={formData.short_description}
                  onChange={(html) => setFormData(prev => ({ ...prev, short_description: html }))}
                  placeholder="Mô tả ngắn gọn về khóa học..."
                />
              </div>
            </div>

            {/* Description - Rich Text Editor */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">
                Mô tả chi tiết
              </label>
              <div className="border rounded-md bg-background overflow-hidden">
                <RichTextEditor
                  value={formData.description}
                  onChange={(html) => setFormData(prev => ({ ...prev, description: html }))}
                  placeholder="Nội dung, mục tiêu, lộ trình chi tiết của khóa học..."
                />
              </div>
            </div>

            {/* Order */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Thứ tự
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Color Hex */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Màu nhấn (hex)
              </label>
              <input
                type="text"
                value={formData.color_hex}
                onChange={(e) => setFormData(prev => ({ ...prev, color_hex: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="#8A1A1A"
              />
            </div>

            {/* Is Featured */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Nổi bật
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={formData.is_featured}
                onClick={() => setFormData(prev => ({ ...prev, is_featured: !prev.is_featured }))}
                className={`peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${formData.is_featured ? 'bg-primary' : 'bg-input'}`}
              >
                <span className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${formData.is_featured ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Is New */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Đánh dấu &ldquo;Mới&rdquo;
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={formData.is_new}
                onClick={() => setFormData(prev => ({ ...prev, is_new: !prev.is_new }))}
                className={`peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${formData.is_new ? 'bg-primary' : 'bg-input'}`}
              >
                <span className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${formData.is_new ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Error message */}
          {errors.submit && (
            <p className="text-sm text-destructive">{errors.submit}</p>
          )}

          {/* Footer */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-300 shadow-sm min-h-9 px-4 py-2 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Huỷ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-white border border-primary-border min-h-9 px-4 py-2 hover:bg-primary/90"
            >
              {isSubmitting ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}