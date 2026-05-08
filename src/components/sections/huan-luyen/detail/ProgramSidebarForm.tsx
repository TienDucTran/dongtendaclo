'use client';

import { useState } from 'react';

interface Program {
  id: number;
  slug: string;
  title: string;
}

interface ProgramSidebarFormProps {
  program: Program;
}

export default function ProgramSidebarForm({ program }: ProgramSidebarFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', notes: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="dang-ky" className="lg:col-span-1">
      <div className="bg-white border border-[#F3F4F6] rounded-2xl shadow-lg p-8 sticky top-24">
        {/* Title */}
        <h3 className="text-2xl font-bold font-serif text-[#1F2937] mb-4">
          Đăng ký khóa này
        </h3>
        
        {/* Description */}
        <p className="text-[#6B7280] font-serif text-sm leading-relaxed mb-6">
          Để lại thông tin, trung tâm sẽ liên hệ tư vấn lộ trình tham gia chương trình {program.title}.
        </p>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm font-serif">
              Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
            </p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-serif">
              Có lỗi xảy ra. Vui lòng thử lại sau.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-bold font-serif text-[#374151]">
              Họ và tên
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nhập họ tên của bạn"
              required
              className="w-full px-3 py-2.5 border border-[#D1D5DB] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1D1D] focus:border-transparent text-sm font-serif text-[#374151] placeholder:text-[#9CA3AF]"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="block text-sm font-bold font-serif text-[#374151]">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="09x xxx xxxx"
              required
              className="w-full px-3 py-2.5 border border-[#D1D5DB] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1D1D] focus:border-transparent text-sm font-serif text-[#374151] placeholder:text-[#9CA3AF]"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-bold font-serif text-[#374151]">
              Email (tùy chọn)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="email@example.com"
              className="w-full px-3 py-2.5 border border-[#D1D5DB] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1D1D] focus:border-transparent text-sm font-serif text-[#374151] placeholder:text-[#9CA3AF]"
            />
          </div>

          {/* Notes Field */}
          <div className="space-y-2">
            <label className="block text-sm font-bold font-serif text-[#374151]">
              Ghi chú thêm
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Bạn có thắc mắc hoặc mong đợi gì khi tham dự?"
              rows={3}
              className="w-full px-3 py-2.5 border border-[#D1D5DB] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1D1D] focus:border-transparent text-sm font-serif text-[#374151] placeholder:text-[#9CA3AF] resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#8B1D1D] text-white py-4 rounded-full font-bold font-serif text-base shadow-lg hover:bg-[#7A1818] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
          </button>
        </form>
      </div>
    </div>
  );
}