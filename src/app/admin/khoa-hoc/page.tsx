'use client';

import { useState, useMemo } from 'react';

// Mock data - sẽ thay thế bằng API call sau
const coursesData = [
  {
    id: 1,
    title: 'Chuyên đề "Thai Giáo"',
    slug: '/chuyen-de-thai-giao',
    description: 'Giáo dục con từ trong bụng mẹ',
    category: 'Nuôi dạy con',
    type: 'Chuyên đề',
    program: 'Huấn luyện',
    status: 'active',
    statusLabel: 'Đang mở',
    format: 'hybrid',
    formatLabel: 'Kết hợp',
    startDate: '2024-01-20',
    students: 45,
    order: 1,
    isFeatured: true,
    isNew: true,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Nghệ thuật lắng nghe & đối thoại yêu thương trong gia đình',
    slug: '/nghe-thuat-lang-nghe',
    description: 'Khóa kỹ năng giao tiếp vợ chồng và cha mẹ — con cái',
    category: 'Hôn nhân & Cặp đôi',
    type: 'Khóa học',
    program: 'Huấn luyện',
    status: 'active',
    statusLabel: 'Đang mở',
    format: 'in-person',
    formatLabel: 'Trực tiếp',
    startDate: '2024-02-25',
    students: 32,
    order: 2,
    isFeatured: true,
    isNew: false,
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    title: 'Vấn đề giới tính & kỹ năng phòng chống xâm hại cho trẻ',
    slug: '/phong-chong-xam-hai-tre',
    description: 'Chuyên đề thời sự cho phụ huynh và giáo viên giáo lý',
    category: 'Nuôi dạy con',
    type: 'Chuyên đề',
    program: 'Huấn luyện',
    status: 'active',
    statusLabel: 'Đang mở',
    format: 'in-person',
    formatLabel: 'Trực tiếp',
    startDate: '2024-03-15',
    students: 28,
    order: 3,
    isFeatured: true,
    isNew: false,
    createdAt: '2024-03-10',
  },
  {
    id: 4,
    title: 'Gia đình giữa làn sóng công nghệ & trí tuệ nhân tạo',
    slug: '/gia-dinh-cong-nghe',
    description: 'Chuyên đề lớn của năm — sống đức tin trong kỷ nguyên số',
    category: 'Tâm lý - Linh đạo',
    type: 'Chuyên đề',
    program: 'Mục vụ',
    status: 'active',
    statusLabel: 'Đang mở',
    format: 'hybrid',
    formatLabel: 'Kết hợp',
    startDate: '2024-04-10',
    students: 56,
    order: 4,
    isFeatured: true,
    isNew: true,
    createdAt: '2024-04-05',
  },
  {
    id: 5,
    title: 'Gia đình Việt Nam trong buổi đầu Tin Mừng đến Đất Việt',
    slug: '/viet-nam-buoi-dau-tin-mung',
    description: 'Lịch sử mục vụ gia đình tại Việt Nam',
    category: 'Lịch sử & Giáo lý',
    type: 'Khóa học',
    program: 'Huấn luyện',
    status: 'active',
    statusLabel: 'Đang mở',
    format: 'in-person',
    formatLabel: 'Trực tiếp',
    startDate: '2024-05-20',
    students: 38,
    order: 5,
    isFeatured: true,
    isNew: false,
    createdAt: '2024-05-12',
  },
  {
    id: 6,
    title: 'Tổng huấn "Niềm Vui Tin Mừng" – Evangelii Gaudium',
    slug: '/niem-vui-tin-mung',
    description: 'Sống Tin Mừng với niềm vui — đọc và cầu nguyện cùng tài liệu Đức Phanxicô',
    category: 'Tâm lý - Linh đạo',
    type: 'Khóa học',
    program: 'Linh thao',
    status: 'completed',
    statusLabel: 'Đã qua',
    format: 'in-person',
    formatLabel: 'Trực tiếp',
    startDate: '2024-06-01',
    students: 120,
    order: 6,
    isFeatured: false,
    isNew: false,
    createdAt: '2024-06-01',
  },
  {
    id: 7,
    title: 'Khóa Chuẩn bị Hôn nhân Công giáo – Mùa Hè 2026',
    slug: '/khoa-tien-hon-nhan-mua-he',
    description: 'Khóa tập trung 8 buổi – kèm cố vấn cá nhân',
    category: 'Hôn nhân & Cặp đôi',
    type: 'Khóa học',
    program: 'Huấn luyện',
    status: 'upcoming',
    statusLabel: 'Sắp khai giảng',
    format: 'in-person',
    formatLabel: 'Trực tiếp',
    startDate: '2024-07-20',
    students: 0,
    order: 7,
    isFeatured: true,
    isNew: true,
    createdAt: '2024-07-15',
  },
  {
    id: 8,
    title: 'Linh thao đời thường – 19th Annotation',
    slug: '/linh-thao-doi-thuong',
    description: '34 tuần đồng hành cá nhân theo Linh thao Inhã',
    category: 'Tâm lý - Linh đạo',
    type: 'Khóa học',
    program: 'Linh thao',
    status: 'upcoming',
    statusLabel: 'Sắp khai giảng',
    format: 'hybrid',
    formatLabel: 'Kết hợp',
    startDate: '2024-08-25',
    students: 0,
    order: 8,
    isFeatured: false,
    isNew: true,
    createdAt: '2024-08-20',
  },
  {
    id: 9,
    title: 'Nuôi dạy con tuổi teen – Parenting',
    slug: '/nuoi-day-con-tuoi-teen',
    description: 'Đồng hành cùng tuổi vị thành niên trong đức tin và đời sống',
    category: 'Nuôi dạy con',
    type: 'Khóa học',
    program: 'Huấn luyện',
    status: 'active',
    statusLabel: 'Đang mở',
    format: 'online',
    formatLabel: 'Online',
    startDate: '2024-09-15',
    students: 67,
    order: 9,
    isFeatured: false,
    isNew: false,
    createdAt: '2024-09-10',
  },
];

type ViewMode = 'card' | 'table';
type SortOption = 'order' | 'name-asc' | 'name-desc' | 'date-desc' | 'date-asc';

export default function KhoaHocPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('order');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [filterProgram, setFilterProgram] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFormat, setFilterFormat] = useState<string>('all');

  // Get unique values for filters
  const uniqueTypes = useMemo(() => {
    const types = new Set(coursesData.map(p => p.type));
    return Array.from(types);
  }, []);

  const uniqueCategories = useMemo(() => {
    const cats = new Set(coursesData.map(p => p.category));
    return Array.from(cats);
  }, []);

  const uniquePrograms = useMemo(() => {
    const progs = new Set(coursesData.map(p => p.program));
    return Array.from(progs);
  }, []);

  // Filter and sort programs
  const filteredCourses = useMemo(() => {
    let result = [...coursesData];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.slug.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      );
    }

    // Filter by program
    if (filterProgram !== 'all') {
      result = result.filter((course) => course.program === filterProgram);
    }

    // Filter by type
    if (filterType !== 'all') {
      result = result.filter((course) => course.type === filterType);
    }

    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter((course) => course.status === filterStatus);
    }

    // Filter by format
    if (filterFormat !== 'all') {
      result = result.filter((course) => course.format === filterFormat);
    }

    // Sort
    switch (sortOption) {
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title, 'vi'));
        break;
      case 'date-desc':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'order':
      default:
        result.sort((a, b) => a.order - b.order);
        break;
    }

    return result;
  }, [searchQuery, sortOption, filterProgram, filterType, filterStatus, filterFormat]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#FBF8FC]">
      {/* Header */}
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-serif font-bold text-gray-800">
          Khóa học chuyên đề
        </h1>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left: Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter: Program */}
          <div className="relative">
            <select
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
              className="h-[34px] pl-3 pr-10 bg-white border border-[#D1D5DB] rounded text-sm font-serif appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#801818]"
            >
              <option value="all">Tất cả chương trình</option>
              {uniquePrograms.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
            <svg
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Filter: Type */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-[34px] pl-3 pr-10 bg-white border border-[#D1D5DB] rounded text-sm font-serif appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#801818]"
            >
              <option value="all">Tất cả loại</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <svg
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Filter: Status */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-[34px] pl-3 pr-10 bg-white border border-[#D1D5DB] rounded text-sm font-serif appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#801818]"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang mở</option>
              <option value="upcoming">Sắp khai giảng</option>
              <option value="completed">Đã qua</option>
            </select>
            <svg
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Filter: Format */}
          <div className="relative">
            <select
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value)}
              className="h-[34px] pl-3 pr-10 bg-white border border-[#D1D5DB] rounded text-sm font-serif appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#801818]"
            >
              <option value="all">Tất cả hình thức</option>
              <option value="in-person">Trực tiếp</option>
              <option value="online">Online</option>
              <option value="hybrid">Kết hợp</option>
            </select>
            <svg
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Right: Sort, View Toggle, Search, Add Button */}
        <div className="flex items-center gap-2">
          {/* Sort Label */}
          <span className="text-sm font-serif text-gray-600">Sắp xếp:</span>
          
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="h-[34px] pl-3 pr-10 bg-white border border-[#D1D5DB] rounded text-sm font-serif appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#801818]"
            >
              <option value="order">Thứ tự</option>
              <option value="name-asc">Tên A-Z</option>
              <option value="name-desc">Tên Z-A</option>
              <option value="date-desc">Mới nhất</option>
              <option value="date-asc">Cũ nhất</option>
            </select>
            <svg
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Increase/Decrease Order Buttons */}
          <div className="flex border border-[#D1D5DB] rounded overflow-hidden">
            <button
              className="px-2 py-1.5 bg-white hover:bg-gray-50 text-gray-600"
              title="Tăng"
            >
              ▼
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex border border-[#D1D5DB] rounded overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-3 py-1.5 transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-gray-600'
                  : 'bg-white text-gray-400 hover:bg-gray-50'
              }`}
              title="Xem dạng bảng"
            >
              <span className="text-sm">▦</span>
              <span className="text-sm font-serif">Bảng</span>
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-1 px-3 py-1.5 transition-colors ${
                viewMode === 'card'
                  ? 'bg-[#8B1D1D] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              title="Xem dạng thẻ"
            >
              <span className="text-sm">⧉</span>
              <span className="text-sm font-serif">Thẻ</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo tiêu đề, slug, danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-72 h-[34px] pl-10 pr-4 bg-white border border-[#D1D5DB] rounded text-sm font-serif focus:outline-none focus:ring-1 focus:ring-[#801818]"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Add Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#8B1D1D] text-white rounded hover:bg-[#6B1515] transition-colors">
            <span className="text-lg font-medium">+</span>
            <span className="text-sm font-serif">Thêm khóa học</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 font-serif">Không tìm thấy khóa học nào</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-sm text-[#801818] hover:underline font-serif"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        ) : viewMode === 'card' ? (
          /* Card View */
          <div className="grid grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="relative bg-white border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Card Content */}
                <div className="p-5 pb-24">
                  {/* Title and Badges */}
                  <div className="mb-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-serif font-bold text-gray-800 leading-tight line-clamp-2">
                        {course.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {course.isFeatured && (
                        <span className="px-2 py-0.5 bg-[#991B1B] text-white text-[10px] font-serif font-bold rounded-full">
                          NỔI BẬT
                        </span>
                      )}
                      {course.isNew && (
                        <span className="px-2 py-0.5 bg-[#EAB308] text-white text-[10px] font-serif font-bold rounded-full">
                          MỚI
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Slug */}
                  <p className="text-sm font-mono text-gray-400 mb-3">
                    {course.slug}
                  </p>

                  {/* Description */}
                  <p className="text-sm font-serif text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded text-xs font-serif text-gray-600">
                      {course.statusLabel}
                    </span>
                    <span className="px-2 py-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded text-xs font-serif text-gray-600">
                      {course.formatLabel}
                    </span>
                    <span className="px-2 py-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded text-xs font-serif text-gray-600">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-end gap-3 px-5 py-3 bg-[#F9FAFB]/[0.3] border-t border-[#F3F4F6]">
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    title="Chỉnh sửa"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Xóa"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-[#E5E7EB]">
                  <th className="px-4 py-3 text-left text-sm font-serif font-bold text-gray-700">
                    Khóa học
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-serif font-bold text-gray-700">
                    Danh mục
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-serif font-bold text-gray-700">
                    Loại
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-serif font-bold text-gray-700">
                    Chương trình
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-serif font-bold text-gray-700">
                    Hình thức
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-serif font-bold text-gray-700">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-serif font-bold text-gray-700">
                    Khai giảng
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-serif font-bold text-gray-700">
                    Lượt HV
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-serif font-bold text-gray-700">
                    STT
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-serif font-bold text-gray-700">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-serif text-gray-800 line-clamp-2">{course.title}</span>
                        {course.isFeatured && (
                          <span className="px-1.5 py-0.5 bg-[#991B1B] text-white text-[9px] font-bold rounded shrink-0">
                            NỔI BẬT
                          </span>
                        )}
                        {course.isNew && (
                          <span className="px-1.5 py-0.5 bg-[#EAB308] text-white text-[9px] font-bold rounded shrink-0">
                            MỚI
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-serif text-gray-600">{course.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-serif text-gray-600">{course.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-serif text-gray-600">{course.program}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded text-xs font-serif text-gray-600">
                        {course.formatLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded text-xs font-serif text-gray-600">
                        {course.statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-serif text-gray-600">{formatDate(course.startDate)}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-serif text-gray-800">{course.students}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-serif text-gray-800">{course.order}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Chỉnh sửa"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Xóa"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-8 py-4 border-t border-gray-100">
        <p className="text-sm font-serif text-gray-500">
          {filteredCourses.length === 0 ? (
            '0 mục'
          ) : (
            `1-${filteredCourses.length} / ${filteredCourses.length} mục`
          )}
        </p>

        <div className="flex items-center gap-4">
          {/* Per page */}
          <div className="relative">
            <select
              defaultValue="20"
              className="h-9 pl-3 pr-10 bg-white border border-gray-200 rounded-lg text-sm font-serif appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#801818]"
            >
              <option value="10">10/trang</option>
              <option value="20">20/trang</option>
              <option value="50">50/trang</option>
            </select>
            <svg
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Page buttons */}
          <div className="flex border border-gray-200 rounded overflow-hidden">
            <button
              className="p-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              title="Trang trước"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-4 py-2 bg-gray-50 border-x border-gray-200 text-sm font-serif text-gray-700">
              1/1
            </button>
            <button
              className="p-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              title="Trang sau"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}