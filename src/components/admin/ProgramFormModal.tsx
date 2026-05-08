'use client';

import { useState, useEffect } from 'react';
import { TrainingProgram } from '@/lib/db/index';
import RichTextEditor from '@/components/ui/RichTextEditor';
import LucideIcon from '@/components/ui/LucideIcon';

interface ProgramFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProgramFormData) => Promise<void>;
  initialData?: TrainingProgram | null;
}

export interface ProgramFormData {
  title: string;
  slug: string;
  summary: string;
  description: string;
  duration: string;
  schedule: string;
  current_cohort: string;
  icon: string;
  pdf_link: string;
  color_hex: string;
  order: number;
  is_active: boolean;
}

const defaultFormData: ProgramFormData = {
  title: '',
  slug: '',
  summary: '',
  description: '',
  duration: '',
  schedule: '',
  current_cohort: '',
  icon: 'GraduationCap',
  pdf_link: '',
  color_hex: '#8A1A1A',
  order: 0,
  is_active: true,
};

// Lucide icons list for selection
const lucideIcons = [
  'GraduationCap',
  'BookOpen',
  'HeartHandshake',
  'Users',
  'Calendar',
  'Clock',
  'Star',
  'Award',
  'Certificate',
  'Library',
];

export default function ProgramFormModal({ isOpen, onClose, onSubmit, initialData }: ProgramFormModalProps) {
  const [formData, setFormData] = useState<ProgramFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        summary: initialData.summary || '',
        description: initialData.description || '',
        duration: initialData.duration || '',
        schedule: initialData.schedule || '',
        current_cohort: initialData.current_cohort || '',
        icon: initialData.icon || 'GraduationCap',
        pdf_link: initialData.pdf_link || '',
        color_hex: initialData.color_hex || '#8A1A1A',
        order: initialData.order || 0,
        is_active: initialData.is_active ?? true,
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
            {initialData ? 'Chỉnh sửa chương trình' : 'Thêm mới chương trình'}
          </h2>
          <p className="text-sm text-gray-500">Điền thông tin chi tiết cho chương trình huấn luyện</p>
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
                placeholder="Tên chương trình"
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
                placeholder="vd: nguoi-dong-hanh-gia-dinh"
              />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug}</p>
              )}
            </div>

            {/* Summary */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">
                Tóm tắt (1-2 câu)
              </label>
              <input
                type="text"
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Mô tả ngắn gọn về chương trình..."
              />
            </div>

            {/* Description - Rich Text Editor */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">
                Mô tả chi tiết (HTML)
              </label>
              <RichTextEditor
                value={formData.description}
                onChange={(html) => setFormData(prev => ({ ...prev, description: html }))}
                placeholder="Mục tiêu, đối tượng, nội dung, lộ trình…"
              />
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Thời lượng (vd: 6 tháng)
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="6 tháng"
              />
            </div>

            {/* Schedule */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Nhịp tổ chức (vd: 2 đợt / năm)
              </label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="2 đợt / năm"
              />
            </div>

            {/* Current Cohort */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Khóa hiện tại (vd: Khóa 1 – 2026)
              </label>
              <input
                type="text"
                value={formData.current_cohort}
                onChange={(e) => setFormData(prev => ({ ...prev, current_cohort: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Khóa 1 – 2026"
              />
            </div>

            {/* Icon */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Icon
              </label>
              <div className="flex items-center gap-3">
                {/* Icon Preview */}
                <div 
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-slate-50"
                  style={{ color: formData.color_hex }}
                >
                  <LucideIcon name={formData.icon} className="h-5 w-5" />
                </div>
                {/* Icon Select */}
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="flex h-9 flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {lucideIcons.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-muted-foreground">
                Icon sẽ hiển thị với màu đã chọn
              </p>
            </div>

            {/* PDF Link */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">
                Link PDF chương trình
              </label>
              <input
                type="url"
                value={formData.pdf_link}
                onChange={(e) => setFormData(prev => ({ ...prev, pdf_link: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="https://…/chuong-trinh.pdf"
              />
            </div>

            {/* Color */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Màu nhấn (hex)
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.color_hex}
                  onChange={(e) => setFormData(prev => ({ ...prev, color_hex: e.target.value }))}
                  className="h-9 w-12 rounded cursor-pointer border border-input bg-transparent"
                />
                <input
                  type="text"
                  value={formData.color_hex}
                  onChange={(e) => setFormData(prev => ({ ...prev, color_hex: e.target.value }))}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="#8A1A1A"
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

            {/* Is Active */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">
                Hiển thị công khai
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={formData.is_active}
                onClick={() => setFormData(prev => ({ ...prev, is_active: !prev.is_active }))}
                className={`peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${formData.is_active ? 'bg-primary' : 'bg-input'}`}
              >
                <span className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${formData.is_active ? 'translate-x-4' : 'translate-x-0'}`} />
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
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground border border-primary-border min-h-9 px-4 py-2 hover:bg-primary/90"
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