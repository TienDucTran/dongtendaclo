'use client';

import { useState, useEffect, useMemo } from 'react';
import CourseFormModal, { CourseFormData } from '@/components/admin/CourseFormModal';

interface Course {
  id: number;
  title: string;
  slug: string;
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
  program_name: string | null;
  category_name: string | null;
  created_at: string;
}

type ViewMode = 'card' | 'table';
type SortOption = 'order' | 'name-asc' | 'name-desc' | 'date-desc' | 'date-asc';

export default function KhoaHocPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('order');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [filterProgram, setFilterProgram] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [filterFeatured, setFilterFeatured] = useState<string>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Open modal for new course
  const handleAddCourse = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  // Handle form submission
  const handleSubmitCourse = async (data: CourseFormData) => {
    try {
      const url = editingCourse 
        ? `/api/admin/courses?id=${editingCourse.id}`
        : '/api/admin/courses';
      
      const method = editingCourse ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Có lỗi xảy ra');
      }
      
      // Refresh courses list
      const coursesRes = await fetch('/api/admin/courses?limit=100');
      if (coursesRes.ok) {
        const coursesData = await coursesRes.json();
        setCourses(coursesData.data || []);
      }
    } catch (error: any) {
      throw error;
    }
  };

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/admin/courses?limit=100');
        if (!res.ok) throw new Error('Failed to fetch courses');
        const data = await res.json();
        setCourses(data.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Get unique values for filters
  const uniqueTypes = useMemo(() => {
    const types = new Set(courses.map(p => p.course_type));
    return Array.from(types);
  }, [courses]);

  const uniqueCategories = useMemo(() => {
    const cats = new Set(courses.map(p => p.category_name).filter(Boolean));
    return Array.from(cats);
  }, [courses]);

  const uniquePrograms = useMemo(() => {
    const progs = new Set(courses.map(p => p.program_name).filter(Boolean));
    return Array.from(progs);
  }, [courses]);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          (course.description?.toLowerCase() || '').includes(query) ||
          course.slug.toLowerCase().includes(query) ||
          (course.category_name?.toLowerCase() || '').includes(query)
      );
    }

    // Filter by program
    if (filterProgram !== 'all') {
      result = result.filter((course) => course.program_name === filterProgram);
    }

    // Filter by type
    if (filterType !== 'all') {
      result = result.filter((course) => course.course_type === filterType);
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
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'order':
      default:
        result.sort((a, b) => a.order - b.order);
        break;
    }

    return result;
  }, [courses, searchQuery, sortOption, filterProgram, filterType, filterStatus, filterFormat]);

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBF8FC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#801818] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-serif text-gray-500">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FBF8FC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-serif mb-2">Lỗi tải dữ liệu: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-[#801818] hover:underline font-serif"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8FC]">
      {/* Header */}
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-serif font-bold text-gray-800">
          Khóa học chuyên đề
        </h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 px-8 py-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[16rem] max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
          <input
            type="text"
            placeholder="Tìm theo tiêu đề, slug, danh mục…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm pl-9 h-9"
            data-testid="search-courses"
          />
        </div>

        {/* Filter: Program */}
        <select
          value={filterProgram}
          onChange={(e) => setFilterProgram(e.target.value)}
          className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring h-9 w-auto min-w-[10rem]"
          data-testid="filter-courses-programSlug"
        >
          <option value="all">Tất cả chương trình</option>
          {uniquePrograms.map((program) => (
            <option key={program} value={program}>{program}</option>
          ))}
        </select>

        {/* Filter: Type */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring h-9 w-auto min-w-[10rem]"
          data-testid="filter-courses-eventKind"
        >
          <option value="all">Tất cả loại</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Filter: Status */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring h-9 w-auto min-w-[10rem]"
          data-testid="filter-courses-status"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang mở</option>
          <option value="upcoming">Sắp khai giảng</option>
          <option value="completed">Đã qua</option>
        </select>

        {/* Filter: Format */}
        <select
          value={filterFormat}
          onChange={(e) => setFilterFormat(e.target.value)}
          className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring h-9 w-auto min-w-[10rem]"
          data-testid="filter-courses-format"
        >
          <option value="all">Tất cả hình thức</option>
          <option value="in_person">Trực tiếp</option>
          <option value="online">Online</option>
          <option value="hybrid">Kết hợp</option>
        </select>

        {/* Filter: Featured */}
        <select
          value={filterFeatured}
          onChange={(e) => setFilterFeatured(e.target.value)}
          className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring h-9 w-auto min-w-[10rem]"
          data-testid="filter-courses-isFeatured"
        >
          <option value="all">Tất cả</option>
          <option value="featured">Nổi bật</option>
          <option value="not-featured">Không nổi bật</option>
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring h-9 w-auto min-w-[10rem]"
        >
          <option value="order">Sắp xếp: Thứ tự</option>
          <option value="name-asc">Tên A-Z</option>
          <option value="name-desc">Tên Z-A</option>
          <option value="date-desc">Mới nhất</option>
          <option value="date-asc">Cũ nhất</option>
        </select>

        {/* Sort Direction Toggle */}
        <button
          type="button"
          onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border shadow-sm min-h-8 rounded-md px-3 text-xs h-9"
          title={sortDirection === 'asc' ? 'Tăng dần' : 'Giảm dần'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`}>
            <path d="m18 15-6-6-6 6" />
          </svg>
          {sortDirection === 'asc' ? 'Tăng' : 'Giảm'}
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* View Toggle */}
        <div className="inline-flex rounded-md border bg-background overflow-hidden">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 text-xs flex items-center gap-1.5 ${viewMode === 'table' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
            data-testid="view-table-courses"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M12 3v18" />
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M3 15h18" />
            </svg>
            Bảng
          </button>
          <button
            type="button"
            onClick={() => setViewMode('card')}
            className={`px-3 py-1.5 text-xs flex items-center gap-1.5 border-l ${viewMode === 'card' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
            data-testid="view-card-courses"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            Thẻ
          </button>
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={handleAddCourse}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground border border-primary-border min-h-9 px-4 py-2 h-9"
          data-testid="button-new-courses"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Thêm khóa học
        </button>
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
                      {course.is_featured && (
                        <span className="px-2 py-0.5 bg-[#991B1B] text-white text-[10px] font-serif font-bold rounded-full">
                          NỔI BẬT
                        </span>
                      )}
                      {course.is_new && (
                        <span className="px-2 py-0.5 bg-[#EAB308] text-white text-[10px] font-serif font-bold rounded-full">
                          MỚI
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Slug */}
                  <p className="text-sm font-mono text-gray-400 mb-3">
                    /{course.slug}
                  </p>

                  {/* Description */}
                  <p className="text-sm font-serif text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded text-xs font-serif text-gray-600">
                      {course.status_label || course.status}
                    </span>
                    <span className="px-2 py-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded text-xs font-serif text-gray-600">
                      {course.format_label || course.format}
                    </span>
                    <span className="px-2 py-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded text-xs font-serif text-gray-600">
                      {course.category_name || '—'}
                    </span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-end gap-3 px-5 py-3 bg-[#F9FAFB]/[0.3] border-t border-[#F3F4F6]">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors" title="Chỉnh sửa">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Xóa">
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
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap">
                    <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
                      Khóa học
                    </button>
                  </th>
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap">
                    <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
                      Danh mục
                    </button>
                  </th>
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Loại</th>
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Chương trình</th>
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap">
                    <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
                      Hình thức
                    </button>
                  </th>
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap">
                    <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
                      Trạng thái
                    </button>
                  </th>
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap">
                    <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
                      Khai giảng
                    </button>
                  </th>
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap w-20">Lượt HV</th>
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap w-16">
                    <button 
                      type="button" 
                      className="inline-flex items-center gap-1 hover:text-foreground"
                      onClick={() => {
                        if (sortOption === 'order') {
                          setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortOption('order');
                          setSortDirection('asc');
                        }
                      }}
                    >
                      STT
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-3 h-3 transition-transform ${sortOption === 'order' && sortDirection === 'desc' ? 'rotate-180' : ''}`}>
                        <path d="m18 15-6-6-6 6"></path>
                      </svg>
                    </button>
                  </th>
                  <th className="px-3 py-2 text-right w-[1%] whitespace-nowrap">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr 
                    key={course.id} 
                    className="border-b last:border-0 hover:bg-muted/30"
                    data-testid={`courses-${course.id}`}
                  >
                    <td className="px-3 py-2 align-top">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-medium truncate">{course.title}</span>
                          {course.is_featured && (
                            <div className="whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate border-transparent bg-primary text-primary-foreground shadow-xs text-[10px]">
                              Nổi bật
                            </div>
                          )}
                          {course.is_new && (
                            <div className="whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate border-transparent bg-secondary text-secondary-foreground text-[10px]">
                              Mới
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">/{course.slug}</p>
                        <p className="text-xs text-muted-foreground truncate">{course.description?.replace(/<[^>]*>/g, '').substring(0, 100) || ''}</p>
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top">{course.category_name || '—'}</td>
                    <td className="px-3 py-2 align-top">
                      <div className="whitespace-nowrap inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate text-foreground border [border-color:var(--badge-outline)]">
                        {course.course_type}
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span className="text-muted-foreground text-xs">{course.program_name ? course.program_name : '— (chuyên đề)'}</span>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <div className="whitespace-nowrap inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate text-foreground border [border-color:var(--badge-outline)]">
                        {course.format_label || (course.format === 'in_person' ? 'Trực tiếp' : course.format === 'online' ? 'Online' : 'Kết hợp')}
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <div className={`whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate border-transparent ${
                        course.status === 'active' ? 'bg-secondary text-secondary-foreground' :
                        course.status === 'upcoming' ? 'bg-secondary text-secondary-foreground' :
                        'bg-secondary text-secondary-foreground'
                      }`}>
                        {course.status_label || (course.status === 'active' ? 'Đang mở' : course.status === 'upcoming' ? 'Sắp khai giảng' : 'Đã qua')}
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span className="text-xs">{formatDate(course.start_date)}</span>
                    </td>
                    <td className="px-3 py-2 align-top w-20">
                      <span className={course.students_count > 0 ? 'tabular-nums text-xs' : 'text-muted-foreground text-xs'}>
                        {course.students_count > 0 ? course.students_count : '—'}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top w-16">
                      <span className="tabular-nums text-xs">{course.order}</span>
                    </td>
                    <td className="px-3 py-2 text-right whitespace-nowrap">
                      <div className="inline-flex gap-1">
                        <button 
                          onClick={() => handleEditCourse(course)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent h-8 w-8"
                          title="Chỉnh sửa"
                          data-testid={`edit-courses-${course.id}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                            <path d="m15 5 4 4"></path>
                          </svg>
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm('Bạn có chắc muốn xóa khóa học này?')) {
                              fetch(`/api/admin/courses?id=${course.id}`, { method: 'DELETE' })
                                .then(() => {
                                  setCourses(prev => prev.filter(c => c.id !== course.id));
                                });
                            }
                          }}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent h-8 w-8 text-destructive"
                          title="Xóa"
                          data-testid={`delete-courses-${course.id}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
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
          {filteredCourses.length === 0 ? '0 mục' : `1-${filteredCourses.length} / ${filteredCourses.length} mục`}
        </p>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select defaultValue="20" className="h-9 pl-3 pr-10 bg-white border border-gray-200 rounded-lg text-sm font-serif appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#801818]">
              <option value="10">10/trang</option>
              <option value="20">20/trang</option>
              <option value="50">50/trang</option>
            </select>
            <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex border border-gray-200 rounded overflow-hidden">
            <button className="p-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled title="Trang trước">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-4 py-2 bg-gray-50 border-x border-gray-200 text-sm font-serif text-gray-700">1/1</button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled title="Trang sau">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Course Form Modal */}
      <CourseFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCourse}
        initialData={editingCourse}
        programs={[]} // TODO: Fetch programs from API
        categories={[]} // TODO: Fetch categories from API
      />
    </div>
  );
}
