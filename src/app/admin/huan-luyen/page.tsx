'use client';

import { useState, useMemo } from 'react';

// Mock data - sẽ thay thế bằng API call sau
const trainingProgramsData = [
  {
    id: 1,
    title: 'Huấn luyện Người Đồng Hành Gia Đình Công Giáo',
    slug: '/nguoi-dong-hanh-gia-dinh-cong-giao',
    description: 'Chương trình đào tạo chuyên sâu cho những ai mong muốn trở thành người đồng hành các gia đình theo linh đạo Dòng Tên.',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Huấn luyện Giáo Lý Viên Hôn Nhân',
    slug: '/giao-ly-vien-hon-nhan',
    description: 'Đào tạo các giáo lý viên đồng hành các đôi chuẩn bị bước vào Bí tích Hôn Phối với chiều sâu tâm lý và linh đạo.',
    createdAt: '2024-02-20',
  },
];

type ViewMode = 'card' | 'table';
type SortOption = 'order' | 'name-asc' | 'name-desc' | 'date-desc' | 'date-asc';

export default function HuanLuyenPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('order');
  const [viewMode, setViewMode] = useState<ViewMode>('card');

  // Filter and sort programs
  const filteredPrograms = useMemo(() => {
    let result = [...trainingProgramsData];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (program) =>
          program.title.toLowerCase().includes(query) ||
          program.description.toLowerCase().includes(query) ||
          program.slug.toLowerCase().includes(query)
      );
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
        // Keep original order
        break;
    }

    return result;
  }, [searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-8 pt-6">
        <h1 className="text-3xl font-serif font-bold text-gray-800">
          Chương trình huấn luyện
        </h1>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-8 py-10">
        {/* Left: Search and Sort */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo tên chương trình..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-10 pl-10 pr-4 bg-[#F9F9F9] border border-gray-200 rounded-lg text-sm font-serif focus:outline-none focus:ring-2 focus:ring-[#801818] focus:border-transparent"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="h-10 pl-3 pr-10 bg-[#F9F9F9] border border-gray-200 rounded-lg text-sm font-serif appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#801818]"
            >
              <option value="order">Sắp xếp: Thứ tự</option>
              <option value="name-asc">Tên A-Z</option>
              <option value="name-desc">Tên Z-A</option>
              <option value="date-desc">Mới nhất</option>
              <option value="date-asc">Cũ nhất</option>
            </select>
            <svg
              className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Right: View Toggle and Add Button */}
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#801818] text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              title="Xem dạng bảng"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="text-sm font-serif">Bảng</span>
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                viewMode === 'card'
                  ? 'bg-[#801818] text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              title="Xem dạng thẻ"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="text-sm font-serif">Thẻ</span>
            </button>
          </div>

          {/* Add Button */}
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#801818] text-white rounded-lg hover:bg-[#6B1515] transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-serif font-medium">Thêm chương trình</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8">
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 font-serif">Không tìm thấy chương trình nào</p>
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
          <div className="grid grid-cols-2 gap-6">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-1">
                  {program.title}
                </h3>

                {/* Slug */}
                <p className="text-sm font-serif text-gray-400 mb-3">
                  {program.slug}
                </p>

                {/* Description */}
                <p className="text-sm font-serif text-gray-600 leading-relaxed mb-6">
                  {program.description}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Chỉnh sửa"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-serif font-bold text-gray-700">
                    Tên chương trình
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-serif font-bold text-gray-700">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-serif font-bold text-gray-700">
                    Mô tả
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-serif font-bold text-gray-700">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((program) => (
                  <tr key={program.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-serif text-gray-800">{program.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-serif text-gray-400">{program.slug}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-serif text-gray-600 line-clamp-2">
                        {program.description}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
      <div className="flex items-center justify-between px-8 py-6 border-t border-gray-100">
        <p className="text-sm font-serif text-gray-500">
          {filteredPrograms.length === 0 ? (
            '0 mục'
          ) : (
            `1-${filteredPrograms.length} / ${filteredPrograms.length} mục`
          )}
        </p>

        <div className="flex items-center gap-4">
          {/* Per page */}
          <div className="relative">
            <select
              defaultValue="20"
              className="h-9 pl-3 pr-10 bg-white border border-gray-200 rounded-lg text-sm font-serif appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#801818]"
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
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
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