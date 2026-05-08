'use client';

import { useState, useEffect, useMemo } from 'react';
import ProgramFormModal, { ProgramFormData } from '@/components/admin/ProgramFormModal';
import { TrainingProgram } from '@/lib/db/index';

type ViewMode = 'card' | 'table';
type SortOption = 'order' | 'name-asc' | 'name-desc' | 'date-desc' | 'date-asc';

export default function HuanLuyenPage() {
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('order');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [setupStatus, setSetupStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<TrainingProgram | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Fetch programs from API
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/programs?limit=100');
      const data = await res.json();
      
      // Check if DB needs setup
      if (data._setup === true) {
        setSetupStatus('DATABASE_NEEDS_SETUP');
        setError(null);
        return;
      }
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch');
      }
      setPrograms(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort programs
  const filteredPrograms = useMemo(() => {
    let result = [...programs];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (program) =>
          program.title.toLowerCase().includes(query) ||
          (program.description?.toLowerCase() || '').includes(query) ||
          program.slug.toLowerCase().includes(query)
      );
    }

    switch (sortOption) {
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title, 'vi')); break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title, 'vi')); break;
      case 'date-desc':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()); break;
      case 'order':
      default:
        result.sort((a, b) => a.order - b.order); break;
    }

    return result;
  }, [programs, searchQuery, sortOption]);

  // Handle create/update program
  const handleSubmit = async (formData: ProgramFormData) => {
    try {
      const url = editingProgram 
        ? `/api/admin/programs/${editingProgram.id}`
        : '/api/admin/programs';
      
      const method = editingProgram ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save');
      }

      // Refresh the list
      await fetchPrograms();
    } catch (error: any) {
      throw error;
    }
  };

  // Handle delete program
  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa chương trình này?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/programs/${id}`, { method: 'DELETE' });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }

      setPrograms(prev => prev.filter(p => p.id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Open modal for creating
  const openCreateModal = () => {
    setEditingProgram(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (program: TrainingProgram) => {
    setEditingProgram(program);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProgram(null);
  };

  if (setupStatus === 'DATABASE_NEEDS_SETUP') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-3">Cần setup database</h2>
          <p className="text-gray-600 mb-6 font-serif">
            Bảng <code className="bg-gray-100 px-2 py-1 rounded text-sm">training_programs</code> chưa tồn tại trong Supabase.
            Vui lòng chạy script SQL sau trong Supabase SQL Editor:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-gray-500 mb-2 font-mono">1. Mở <a href="https://supabase.com/dashboard/project/zwrvtqvlffknhahdsebxp/sql/new" target="_blank" className="text-[#801818] underline">Supabase SQL Editor</a></p>
            <p className="text-xs text-gray-500 mb-2 font-mono">2. Copy nội dung file <code>src/lib/db/schema.sql</code></p>
            <p className="text-xs text-gray-500 font-mono">3. Paste và Run</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-[#801818] text-white rounded-lg hover:bg-[#6B1515] transition-colors font-serif"
          >
            Đã setup - Tải lại
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#801818] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-serif text-gray-500">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-serif mb-2">Lỗi tải dữ liệu: {error}</p>
          <button onClick={() => window.location.reload()} className="text-sm text-[#801818] hover:underline font-serif">Thử lại</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8FC]">
      {/* Header */}
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-serif font-bold text-gray-800">
          Chương trình huấn luyện
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
            data-testid="search-programs"
          />
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring h-9 w-auto min-w-[10rem]"
          data-testid="sort-programs"
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
            data-testid="view-table-programs"
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
            data-testid="view-card-programs"
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
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground border border-primary-border min-h-9 px-4 py-2 h-9"
          data-testid="button-new-programs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Thêm chương trình
        </button>
      </div>

      {/* Content */}
      <div className="px-8 pb-8">

        {/* Content */}
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 font-serif">Không tìm thấy chương trình nào</p>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="mt-2 text-sm text-[#801818] hover:underline font-serif">Xóa bộ lọc</button>
            )}
          </div>
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-2 gap-6">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-1">{program.title}</h3>
                <p className="text-sm font-serif text-gray-400 mb-3">/{program.slug}</p>
                <p className="text-sm font-serif text-gray-600 leading-relaxed mb-6">{program.description}</p>
                <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                  <button 
                    onClick={() => openEditModal(program)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-[#801818] hover:bg-gray-50 rounded-lg transition-colors" 
                    title="Chỉnh sửa"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Sửa
                  </button>
                  <button 
                    onClick={() => handleDelete(program.id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                    title="Xóa"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap">
                    <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
                      Chương trình
                    </button>
                  </th>
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Thời lượng</th>
                  <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Khóa hiện tại</th>
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
                {filteredPrograms.map((program) => (
                  <tr 
                    key={program.id} 
                    className="border-b last:border-0 hover:bg-muted/30"
                    data-testid={`training-programs-${program.id}`}
                  >
                    <td className="px-3 py-2 align-top">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium truncate">{program.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">/{program.slug}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{program.summary || program.description?.replace(/<[^>]*>/g, '').substring(0, 100) || ''}</p>
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top">{program.duration || '—'}</td>
                    <td className="px-3 py-2 align-top">{program.current_cohort || '—'}</td>
                    <td className="px-3 py-2 align-top w-16">
                      <span className="tabular-nums text-xs">{program.order}</span>
                    </td>
                    <td className="px-3 py-2 text-right whitespace-nowrap">
                      <div className="inline-flex gap-1">
                        <button 
                          onClick={() => openEditModal(program)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent h-8 w-8"
                          title="Chỉnh sửa"
                          data-testid={`edit-training-programs-${program.id}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                            <path d="m15 5 4 4"></path>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(program.id)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-transparent h-8 w-8 text-destructive"
                          title="Xóa"
                          data-testid={`delete-training-programs-${program.id}`}
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

        {/* Pagination */}
        <div className="flex items-center justify-between py-6 border-t border-gray-100 mt-8">
          <p className="text-sm font-serif text-gray-500">
            {filteredPrograms.length === 0 ? '0 mục' : `1-${filteredPrograms.length} / ${filteredPrograms.length} mục`}
          </p>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select defaultValue="20" className="h-9 pl-3 pr-10 bg-white border border-gray-200 rounded-lg text-sm font-serif appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#801818]">
                <option value="10">10/trang</option>
                <option value="20">20/trang</option>
                <option value="50">50/trang</option>
              </select>
              <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button className="p-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50" disabled title="Trang trước">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="px-4 py-2 bg-gray-50 border-x border-gray-200 text-sm font-serif text-gray-700">1/1</button>
              <button className="p-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50" disabled title="Trang sau">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProgramFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingProgram}
      />
    </div>
  );
}