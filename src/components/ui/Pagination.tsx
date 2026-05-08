'use client';

import { useState } from 'react';

// SVG Icons
const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ChevronsLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
  </svg>
);

const ChevronsRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
  </svg>
);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  className = '',
}: PaginationProps) {
  // Don't render if there's only one page or less
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Items info */}
      {totalItems !== undefined && (
        <p className="text-sm text-slate-500 font-serif">
          Hiển thị <span className="font-semibold text-slate-700">{startItem}</span> - <span className="font-semibold text-slate-700">{endItem}</span> trong tổng số <span className="font-semibold text-slate-700">{totalItems}</span> kết quả
        </p>
      )}
      
      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        {/* First page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Trang đầu"
        >
          <ChevronsLeftIcon className="w-4 h-4" />
        </button>
        
        {/* Previous page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Trang trước"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        
        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
                  ...
                </span>
              );
            }
            
            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;
            
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium font-serif transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                aria-label={`Trang ${pageNumber}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
        
        {/* Next page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Trang sau"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
        
        {/* Last page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Trang cuối"
        >
          <ChevronsRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Hook for pagination logic
export function usePagination<T>({
  data,
  itemsPerPage = 10,
}: {
  data: T[];
  itemsPerPage?: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToPrevPage = () => goToPage(currentPage - 1);
  
  return {
    currentPage,
    totalPages,
    totalItems: data.length,
    itemsPerPage,
    startIndex,
    endIndex,
    paginatedData,
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPrevPage,
  };
}