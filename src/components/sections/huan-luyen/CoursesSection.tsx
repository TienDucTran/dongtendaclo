'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Filter data
const formats = [
  { id: 'in_person', label: 'Trực tiếp', count: 112 },
  { id: 'hybrid', label: 'Kết hợp', count: 3 },
  { id: 'online', label: 'Online', count: 1 },
];

const categories = [
  { id: 'linh-dao-giao-huan', label: 'Linh đạo & Giáo huấn', count: 50 },
  { id: 'tinh-yeu-hon-nhan', label: 'Tình yêu & Hôn nhân', count: 19 },
  { id: 'tam-ly-ky-nang-song', label: 'Tâm lý & Kỹ năng sống', count: 14 },
  { id: 'cha-me-con-cai', label: 'Cha mẹ — Con cái', count: 13 },
  { id: 'chua-lanh-dong-hanh', label: 'Chữa lành & Đồng hành', count: 11 },
  { id: 'nuoi-day-con', label: 'Nuôi dạy con', count: 3 },
  { id: 'tam-ly-linh-dao', label: 'Tâm lý — Linh đạo', count: 3 },
  { id: 'hon-nhan-cap-doi', label: 'Hôn nhân & Cập đôi', count: 2 },
  { id: 'lich-su-giao-ly', label: 'Lịch sử & Giáo lý', count: 1 },
];

const audiences = [
  { id: 'couple', label: 'Cặp đôi', count: 6 },
  { id: 'parent', label: 'Cha mẹ', count: 6 },
  { id: 'member', label: 'Cá nhân', count: 5 },
  { id: 'premarital', label: 'Tiền hôn nhân', count: 1 },
];

// Sample courses data
const allCourses = [
  {
    id: 'linh-thao-doi-thuong',
    title: 'Linh thao đời thường — 19th Annotation',
    description: 'Một hành trình 34 tuần cầu nguyện và phân định cá nhân, được đồng hành bởi một linh hướng. Hoàn toàn miễn phí.',
    category: 'Tâm lý — Linh đạo',
    categoryId: 'tam-ly-linh-dao',
    format: 'Kết hợp',
    formatId: 'hybrid',
    date: '08/09/2026',
    audience: ['Cá nhân', 'Cặp đôi'],
    audienceIds: ['member', 'couple'],
    location: 'Trung tâm Mục vụ Đắc Lộ — 171 Lý Chính Thắng, Q.3 / Online',
    status: 'Sắp khai giảng',
    statusColor: 'bg-amber-500',
    color: 'rgba(126, 63, 160, 0.094)',
  },
  {
    id: 'khoa-tien-hon-nhan-mua-he',
    title: 'Khóa Chuẩn bị Hôn nhân Công giáo — Mùa Hè 2026',
    description: 'Khóa chuẩn bị hôn nhân Công giáo dành cho các đôi bạn dự định kết hôn trong vòng 6-12 tháng tới. Đầy đủ chứng nhận cho hồ sơ hôn phối.',
    category: 'Hôn nhân & Cập đôi',
    categoryId: 'hon-nhan-cap-doi',
    format: 'Trực tiếp',
    formatId: 'in_person',
    date: '07/06/2026 • 18:30 - 21:00',
    audience: ['Tiền hôn nhân', 'Cặp đôi'],
    audienceIds: ['premarital', 'couple'],
    location: 'Trung tâm Mục vụ Đắc Lộ — 171 Lý Chính Thắng, Q.3',
    status: 'Sắp khai giảng',
    statusColor: 'bg-amber-500',
    color: 'rgba(198, 138, 46, 0.094)',
  },
  {
    id: 'viet-nam-buoi-dau-tin-mung',
    title: 'Gia đình Việt Nam trong buổi đầu Tin Mừng đến Đất Việt',
    description: 'Một hành trình lịch sử đầy cảm hứng — gia đình Việt Nam đã đón nhận và sống Tin Mừng như thế nào trong những thế kỷ đầu? Bài học cho mục vụ gia đình hôm nay.',
    category: 'Lịch sử & Giáo lý',
    categoryId: 'lich-su-giao-ly',
    format: 'Trực tiếp',
    formatId: 'in_person',
    date: '31/05/2026 • 15:00 - 17:00',
    audience: ['Cá nhân'],
    audienceIds: ['member'],
    location: 'Trung tâm Mục vụ Đắc Lộ — 171 Lý Chính Thắng, Q.3',
    status: 'Đang mở đăng ký',
    statusColor: 'bg-emerald-600',
    color: 'rgba(139, 26, 26, 0.094)',
  },
  {
    id: 'gia-dinh-cong-nghe',
    title: 'Gia đình giữa làn sóng công nghệ & trí tuệ nhân tạo',
    description: 'Trí tuệ nhân tạo, mạng xã hội, smartphone… đang định hình lại đời sống gia đình. Chuyên đề mời gọi suy tư và đề xuất những lối sống đức tin trưởng thành giữa thời đại số.',
    category: 'Tâm lý — Linh đạo',
    categoryId: 'tam-ly-linh-dao',
    format: 'Kết hợp',
    formatId: 'hybrid',
    date: '25/05/2026 • 15:00 - 17:30',
    audience: ['Cặp đôi', 'Cha mẹ', 'Cá nhân'],
    audienceIds: ['couple', 'parent', 'member'],
    location: 'Trung tâm Mục vụ Đắc Lộ — 171 Lý Chính Thắng, Q.3 / Online',
    status: 'Đang mở đăng ký',
    statusColor: 'bg-emerald-600',
    color: 'rgba(126, 63, 160, 0.094)',
  },
  {
    id: 'phong-chong-xam-hai-tre',
    title: 'Vấn đề giới tính & kỹ năng phòng chống xâm hại cho trẻ',
    description: 'Một chuyên đề khẩn thiết cho mọi gia đình. Trang bị cho cha mẹ và thầy cô giáo lý kiến thức và kỹ năng để bảo vệ con trẻ khỏi mọi hình thức xâm hại.',
    category: 'Nuôi dạy con',
    categoryId: 'nuoi-day-con',
    format: 'Trực tiếp',
    formatId: 'in_person',
    date: '15/05/2026 • 19:00 - 21:00',
    audience: ['Cha mẹ', 'Cá nhân'],
    audienceIds: ['parent', 'member'],
    location: 'Trung tâm Mục vụ Đắc Lộ — 171 Lý Chính Thắng, Q.3',
    status: 'Đang mở đăng ký',
    statusColor: 'bg-emerald-600',
    color: 'rgba(59, 91, 165, 0.094)',
  },
  {
    id: 'nuoi-day-con-tuoi-teen',
    title: 'Nuôi dạy con tuổi teen — Parenting',
    description: 'Khoá học hoàn toàn online dành cho cha mẹ có con từ 12-18 tuổi. Hiểu con, đối thoại với con, và đồng hành con trong giai đoạn nhiều biến động.',
    category: 'Nuôi dạy con',
    categoryId: 'nuoi-day-con',
    format: 'Online',
    formatId: 'online',
    date: '13/05/2026 • 20:00 - 21:30',
    audience: ['Cha mẹ'],
    audienceIds: ['parent'],
    location: 'Online qua Zoom',
    status: 'Đang mở đăng ký',
    statusColor: 'bg-emerald-600',
    color: 'rgba(47, 110, 84, 0.094)',
  },
  {
    id: 'nghe-thuat-lang-nghe',
    title: 'Nghệ thuật lắng nghe & đối thoại yêu thương trong gia đình',
    description: 'Lắng nghe là khởi đầu của tình yêu. Khoá học giúp mỗi người trong gia đình tập kỹ năng lắng nghe sâu — từ cảm xúc đến nhu cầu, và đối thoại trong tinh thần tôn trọng.',
    category: 'Hôn nhân & Cập đôi',
    categoryId: 'hon-nhan-cap-doi',
    format: 'Trực tiếp',
    formatId: 'in_person',
    date: '12/05/2026 • 19:00 - 21:00',
    audience: ['Cặp đôi', 'Cha mẹ'],
    audienceIds: ['couple', 'parent'],
    location: 'Trung tâm Mục vụ Đắc Lộ — 171 Lý Chính Thắng, Q.3',
    status: 'Đang mở đăng ký',
    statusColor: 'bg-emerald-600',
    color: 'rgba(47, 110, 84, 0.094)',
  },
  {
    id: 'chuyen-de-thai-giao',
    title: 'Chuyên đề "Thai Giáo"',
    description: 'Khóa chuyên đề dành cho các cặp vợ chồng đang chuẩn bị đón con và những gia đình có em bé dưới 1 tuổi. Cùng các chuyên gia tâm lý, dinh dưỡng và linh đạo, chúng ta khám phá nghệ thuật giáo dục con ngay từ những tháng đầu đời.',
    category: 'Nuôi dạy con',
    categoryId: 'nuoi-day-con',
    format: 'Kết hợp',
    formatId: 'hybrid',
    date: '09/05/2026 • 18:30 - 20:30',
    audience: ['Cha mẹ', 'Cặp đôi'],
    audienceIds: ['parent', 'couple'],
    location: 'Trung tâm Mục vụ Đắc Lộ — 171 Lý Chính Thắng, Q.3 / Online',
    status: 'Đang mở đăng ký',
    statusColor: 'bg-emerald-600',
    color: 'rgba(198, 138, 46, 0.094)',
  },
];

export default function CoursesSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = (type: 'format' | 'category' | 'audience', id: string) => {
    if (type === 'format') {
      setSelectedFormats(prev =>
        prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      );
      } else if (type === 'category') {
      setSelectedCategories(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      setSelectedAudiences(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    }
  };

  // Filter courses based on selected filters and search query
  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      // Filter by format
      if (selectedFormats.length > 0 && !selectedFormats.includes(course.formatId)) {
        return false;
      }
      
      // Filter by category
      if (selectedCategories.length > 0 && !selectedCategories.includes(course.categoryId)) {
        return false;
      }
      
      // Filter by audience
      if (selectedAudiences.length > 0) {
        const hasMatchingAudience = course.audienceIds.some(aid => selectedAudiences.includes(aid));
        if (!hasMatchingAudience) {
          return false;
        }
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  }, [selectedFormats, selectedCategories, selectedAudiences, searchQuery]);

  // Count active filters
  const activeFilterCount = selectedFormats.length + selectedCategories.length + selectedAudiences.length;

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFormats([]);
    setSelectedCategories([]);
    setSelectedAudiences([]);
    setSearchQuery('');
  };

  return (
    <section className="py-16 px-4 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden lg:block space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-serif text-slate-900">Bộ lọc</h2>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-slate-500 hover:text-primary"
                >
                  Xóa tất cả ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Format Filter */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-serif text-slate-400 tracking-[0.05em] uppercase">
                Hình thức
              </h3>
              <ul className="space-y-1.5">
                {formats.map((format) => (
                  <li key={format.id}>
                    <label className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-50 cursor-pointer">
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFormats.includes(format.id)}
                          onChange={() => toggleFilter('format', format.id)}
                          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span>{format.label}</span>
                      </span>
                      <span className="text-xs text-slate-400">{format.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-serif text-slate-400 tracking-[0.05em] uppercase">
                Nhóm chủ đề
              </h3>
              <ul className="space-y-1.5">
                {categories.map((category) => (
                  <li key={category.id}>
                    <label className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-50 cursor-pointer">
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleFilter('category', category.id)}
                          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span>{category.label}</span>
                      </span>
                      <span className="text-xs text-slate-400">{category.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audience Filter */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-serif text-slate-400 tracking-[0.05em] uppercase">
                Đối tượng
              </h3>
              <ul className="space-y-1.5">
                {audiences.map((audience) => (
                  <li key={audience.id}>
                    <label className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-50 cursor-pointer">
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedAudiences.includes(audience.id)}
                          onChange={() => toggleFilter('audience', audience.id)}
                          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span>{audience.label}</span>
                      </span>
                      <span className="text-xs text-slate-400">{audience.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="min-w-0">
            {/* Search and Sort */}
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-md">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.34-4.34m0 0A8 8 0 105.66 5.66a8 8 0 0010.68 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm khóa học..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-full bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-900">{filteredCourses.length}</span> khóa chuyên đề • trang 1/12
                </span>
                <select className="px-4 py-2 text-sm border border-slate-200 rounded-full bg-white focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Mới nhất</option>
                  <option>Bán chạy nhất</option>
                  <option>Sắp khai giảng</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <details className="rounded-2xl border bg-card">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
                    </svg>
                    Bộ lọc
                    {activeFilterCount > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-primary text-white rounded-full">
                        {activeFilterCount}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-slate-400">Mở / đóng</span>
                </summary>
                <div className="border-t p-4">
                  <div className="space-y-4">
                    {/* Mobile: Format Filter */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold font-serif text-slate-400 tracking-[0.05em] uppercase">
                        Hình thức
                      </h3>
                      <ul className="space-y-1.5">
                        {formats.map((format) => (
                          <li key={format.id}>
                            <label className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-50 cursor-pointer">
                              <span className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedFormats.includes(format.id)}
                                  onChange={() => toggleFilter('format', format.id)}
                                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                                />
                                <span>{format.label}</span>
                              </span>
                              <span className="text-xs text-slate-400">{format.count}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile: Category Filter */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold font-serif text-slate-400 tracking-[0.05em] uppercase">
                        Nhóm chủ đề
                      </h3>
                      <ul className="space-y-1.5">
                        {categories.map((category) => (
                          <li key={category.id}>
                            <label className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-50 cursor-pointer">
                              <span className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedCategories.includes(category.id)}
                                  onChange={() => toggleFilter('category', category.id)}
                                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                                />
                                <span>{category.label}</span>
                              </span>
                              <span className="text-xs text-slate-400">{category.count}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile: Audience Filter */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold font-serif text-slate-400 tracking-[0.05em] uppercase">
                        Đối tượng
                      </h3>
                      <ul className="space-y-1.5">
                        {audiences.map((audience) => (
                          <li key={audience.id}>
                            <label className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-50 cursor-pointer">
                              <span className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedAudiences.includes(audience.id)}
                                  onChange={() => toggleFilter('audience', audience.id)}
                                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                                />
                                <span>{audience.label}</span>
                              </span>
                              <span className="text-xs text-slate-400">{audience.count}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile: Clear filters */}
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="w-full mt-2 px-4 py-2 text-sm font-semibold text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                      >
                        Xóa tất cả bộ lọc ({activeFilterCount})
                      </button>
                    )}
                  </div>
                </div>
              </details>
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedFormats.map(id => {
                  const format = formats.find(f => f.id === id);
                  return format ? (
                    <button
                      key={`format-${id}`}
                      onClick={() => toggleFilter('format', id)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full hover:bg-primary/20"
                    >
                      {format.label}
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  ) : null;
                })}
                {selectedCategories.map(id => {
                  const category = categories.find(c => c.id === id);
                  return category ? (
                    <button
                      key={`category-${id}`}
                      onClick={() => toggleFilter('category', id)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full hover:bg-primary/20"
                    >
                      {category.label}
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  ) : null;
                })}
                {selectedAudiences.map(id => {
                  const audience = audiences.find(a => a.id === id);
                  return audience ? (
                    <button
                      key={`audience-${id}`}
                      onClick={() => toggleFilter('audience', id)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full hover:bg-primary/20"
                    >
                      {audience.label}
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  ) : null;
                })}
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-700"
                >
                  Xóa tất cả
                </button>
              </div>
            )}

            {/* Course Grid */}
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <article
                  key={course.id}
                  className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all group"
                >
                  {/* Image */}
                  <Link href={`/khoa-hoc/${course.id}`} className="block relative aspect-[2/1]">
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: course.color }}
                    >
                      <svg className="w-14 h-14 opacity-25 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v14m0-13c-1.168-.5-2.334-1-3.5-1c-1.666 0-3.332.477-4.5 1.253v13C5.754 18.477 7.246 18 9 18s3.332.477 4.5 1.253m0-13c1.168-.5 2.334-1 3.5-1c1.666 0 3.332.477 4.5 1.253v13c-1.168-.5-2.334-1-3.5-1c-1.166 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur">
                        {course.category}
                      </span>
                      <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold shadow-sm ${course.statusColor} text-white`}>
                        {course.status}
                      </span>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="inline-flex items-center rounded-md border px-2 py-0.5 font-semibold bg-secondary text-secondary-foreground text-[11px]">
                        Khóa học
                      </span>
                      <span>{course.format}</span>
                    </div>

                    <Link href={`/khoa-hoc/${course.id}`}>
                      <h3 className="mb-2 line-clamp-2 text-lg font-bold font-serif text-slate-900 group-hover:text-primary">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="mb-4 line-clamp-3 text-sm leading-6 text-slate-500">
                      {course.description}
                    </p>

                    <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500">
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{course.date}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87a4 4 0 0 0-1-7.87+3a4 4 0 0 0-7 0A4 4 0 0 0 14 21v-2" />
                        </svg>
                        <span className="truncate">{course.audience.join(', ')}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{course.location}</span>
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link
                        href={`/khoa-hoc/${course.id}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold font-serif hover:bg-primary-800 transition-colors"
                      >
                        Chi tiết & Đăng ký
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link
                        href={`/khoa-hoc/${course.id}#lich-khai-giang`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold font-serif hover:bg-slate-50 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        Lịch khai giảng
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Không tìm thấy khóa học</h3>
                <p className="text-slate-500 mb-4">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-800 transition-colors"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            <nav className="mt-10 flex justify-center">
              <ul className="flex items-center gap-1">
                <li>
                  <button className="px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-50 rounded-md disabled:opacity-50" disabled>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
                <li>
                  <button className="w-9 h-9 flex items-center justify-center text-sm font-medium bg-primary text-white rounded-md">
                    1
                  </button>
                </li>
                <li>
                  <button className="w-9 h-9 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md">
                    2
                  </button>
                </li>
                <li>
                  <span className="w-9 h-9 flex items-center justify-center text-slate-400">...</span>
                </li>
                <li>
                  <button className="w-9 h-9 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md">
                    12
                  </button>
                </li>
                <li>
                  <button className="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}