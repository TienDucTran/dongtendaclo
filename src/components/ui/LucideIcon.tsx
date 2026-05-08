'use client';

import React from 'react';

/**
 * LucideIcon - Component hiển thị Lucide icons từ tên icon
 * Hỗ trợ cả PascalCase (vd: 'GraduationCap') và kebab-case (vd: 'graduation-cap')
 * 
 * Danh sách icons được hỗ trợ:
 * - GraduationCap (graduation-cap)
 * - BookOpen (book-open)
 * - HeartHandshake (heart-handshake)
 * - Users (users)
 * - Calendar (calendar)
 * - Clock (clock)
 * - Star (star)
 * - Award (award)
 * - Certificate (certificate)
 * - Library (library)
 */

interface LucideIconProps {
  name: string;
  className?: string;
}

// SVG paths cho từng icon (từ Lucide library)
const iconPaths: Record<string, React.ReactNode> = {
  GraduationCap: (
    <>
      <path d="M22 10v6" />
      <path d="M22 10l-8.97-5.26a4 4 0 0 0-3.06 0L1 10l8.97 5.26a4 4 0 0 0 3.06 0L22 10z" />
      <path d="M6.5 17.5V22l6.5-3 6.5 3v-4.5" />
    </>
  ),
  BookOpen: (
    <>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </>
  ),
  HeartHandshake: (
    <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762" />
  ),
  Users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  Calendar: (
    <>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  Clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  Star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  Award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </>
  ),
  Certificate: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      <path d="M12 14v8" />
    </>
  ),
  Library: (
    <>
      <path d="M16 12V6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v6" />
      <path d="M20 12V8a4 4 0 0 0-4-4h-1" />
      <path d="M2 12h20" />
      <path d="M2 18h20" />
      <path d="M6 18v4" />
      <path d="M18 18v4" />
    </>
  ),
};

// Icon mặc định (fallback)
const DEFAULT_ICON = 'BookOpen';

/**
 * Convert kebab-case sang PascalCase
 * Ví dụ: 'heart-handshake' → 'HeartHandshake'
 */
function normalizeIconName(name: string): string {
  // Nếu đã là PascalCase, return luôn
  if (/^[A-Z][a-zA-Z]*$/.test(name)) {
    return name;
  }
  
  // Convert kebab-case sang PascalCase
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Lấy danh sách tất cả icons được hỗ trợ
 */
export function getSupportedIcons(): string[] {
  return Object.keys(iconPaths);
}

/**
 * Kiểm tra xem icon có được hỗ trợ không
 */
export function isIconSupported(name: string): boolean {
  const normalizedName = normalizeIconName(name);
  return normalizedName in iconPaths;
}

/**
 * LucideIcon Component
 * 
 * @param name - Tên icon (PascalCase hoặc kebab-case)
 * @param className - CSS classes (default: 'h-6 w-6')
 * 
 * @example
 * // Sử dụng PascalCase
 * <LucideIcon name="GraduationCap" className="h-8 w-8" />
 * 
 * // Sử dụng kebab-case
 * <LucideIcon name="graduation-cap" className="h-6 w-6" />
 * 
 * // Fallback khi icon không tồn tại
 * <LucideIcon name="unknown-icon" /> // Render BookOpen
 */
export default function LucideIcon({ name, className = 'h-6 w-6' }: LucideIconProps) {
  const normalizedName = normalizeIconName(name);
  const iconContent = iconPaths[normalizedName] || iconPaths[DEFAULT_ICON];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconContent}
    </svg>
  );
}