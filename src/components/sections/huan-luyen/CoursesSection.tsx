'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Pagination from '@/components/ui/Pagination';
import CourseCard from '@/components/ui/CourseCard';

const ITEMS_PER_PAGE = 9;

// Filter data - will be populated from API
const defaultFormats = [
  { id: 'in_person', label: 'Trực tiếp', count: 0 },
  { id: 'hybrid', label: 'Kết hợp', count: 0 },
  { id: 'online', label: 'Online', count: 0 },
];

const defaultCategories: { id: string; label: string; count: number }[] = [];
const defaultAudiences: { id: string; label: string; count: number }[] = [];

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  categoryId: number | null;
  category_name: string | null;
  format: string;
  format_label: string | null;
  status: string;
  status_label: string | null;
  start_date: string | null;
  location: string | null;
  audience: string[];
  color_hex: string;
  is_featured: boolean;
  is_new: boolean;
}

export default function CoursesSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<{ id: string; label: string; count: number }[]>(defaultCategories);
  const [audiences, setAudiences] = useState<{ id: string; label: string; count: number }[]>(defaultAudiences);
  const [formats, setFormats] = useState(defaultFormats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use ref to prevent duplicate fetches in React strict mode
  const hasFetched = useRef(false);

  // Fetch courses from API
  useEffect(() => {
    // Prevent duplicate fetches
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
        const res = await fetch(`${baseUrl}/api/courses?limit=100`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const data = await res.json();
        setCourses(data.data || []);

        // Extract unique categories with counts
        const categoryMap = new Map<string, { label: string; count: number }>();
        const audienceMap = new Map<string, { label: string; count: number }>();
        const formatMap = new Map<string, { label: string; count: number }>([
          ['in_person', { label: 'Trực tiếp', count: 0 }],
          ['hybrid', { label: 'Kết hợp', count: 0 }],
          ['online', { label: 'Online', count: 0 }],
        ]);

        (data.data || []).forEach((course: Course) => {
          // Count categories
          if (course.category_name) {
            const cat = categoryMap.get(course.category_name) || { label: course.category_name, count: 0 };
            cat.count++;
            categoryMap.set(course.category_name, cat);
          }

          // Count audiences
          (course.audience || []).forEach((aud: string) => {
            const au = audienceMap.get(aud) || { label: aud, count: 0 };
            au.count++;
            audienceMap.set(aud, au);
          });

          // Count formats
          if (course.format && formatMap.has(course.format)) {
            const fmt = formatMap.get(course.format)!;
            fmt.count++;
          }
        });

        setCategories(Array.from(categoryMap.values()).map(c => ({ id: c.label, ...c })));
        setAudiences(Array.from(audienceMap.values()).map(a => ({ id: a.label, ...a })));
        setFormats(Array.from(formatMap.values()).map(f => ({ id: f.label, ...f })));
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Không thể tải khóa học. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
    return courses.filter(course => {
      // Filter by format
      if (selectedFormats.length > 0 && !selectedFormats.includes(course.format_label || course.format)) {
        return false;
      }
      
      // Filter by category
      if (selectedCategories.length > 0 && !selectedCategories.includes(course.category_name || '')) {
        return false;
      }
      
      // Filter by audience
      if (selectedAudiences.length > 0) {
        const hasMatchingAudience = (course.audience || []).some(aud => selectedAudiences.includes(aud));
        if (!hasMatchingAudience) {
          return false;
        }
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(query) ||
          (course.description?.toLowerCase().includes(query)) ||
          (course.category_name?.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  }, [courses, selectedFormats, selectedCategories, selectedAudiences, searchQuery]);

  // Count active filters
  const activeFilterCount = selectedFormats.length + selectedCategories.length + selectedAudiences.length;

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFormats([]);
    setSelectedCategories([]);
    setSelectedAudiences([]);
    setSearchQuery('');
    setCurrentPage(1); // Reset pagination when clearing filters
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFormats, selectedCategories, selectedAudiences, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-amber-500';
      case 'active':
        return 'bg-emerald-600';
      case 'completed':
        return 'bg-slate-500';
      default:
        return 'bg-slate-500';
    }
  };

  // Get status label
  const getStatusLabel = (status: string, statusLabel: string | null) => {
    if (statusLabel) return statusLabel;
    switch (status) {
      case 'upcoming':
        return 'Sắp khai giảng';
      case 'active':
        return 'Đang mở đăng ký';
      case 'completed':
        return 'Đã kết thúc';
      default:
        return status;
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 px-4 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-3xl overflow-hidden">
                  <div className="aspect-[2/1] bg-slate-200"></div>
                  <div className="p-5">
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
                    <div className="border-t border-slate-100 pt-3">
                      <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 px-4 lg:px-8 bg-white">
        <div className="container mx-auto text-center">
          <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Không thể tải khóa học</h3>
          <p className="text-slate-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 lg:px-8 bg-white">
      <div className="container mx-auto">
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
            {formats.length > 0 && (
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
            )}

            {/* Category Filter */}
            {categories.length > 0 && (
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
            )}

            {/* Audience Filter */}
            {audiences.length > 0 && (
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
            )}
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
                  <span className="font-semibold text-slate-900">{filteredCourses.length}</span> khóa chuyên đề
                </span>
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
                    {/* Mobile filters */}
                    {formats.length > 0 && (
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
                    )}
                    
                    {categories.length > 0 && (
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
                    )}
                    
                    {audiences.length > 0 && (
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
                    )}

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
              {paginatedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && !loading && (
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
            {filteredCourses.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredCourses.length}
                itemsPerPage={ITEMS_PER_PAGE}
                className="mt-8"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
