'use client';

import Link from 'next/link';
import { useState } from 'react';

const navigation = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Giới thiệu', href: '/gioi-thieu' },
  { name: 'Huấn luyện', href: '/huan-luyen' },
  { name: 'Mục vụ', href: '/muc-vu' },
  { name: 'Tài nguyên', href: '/tai-nguyen' },
  { name: 'Thắc mắc biết hỏi ai?', href: '/thac-mac' },
  { name: 'Liên lạc', href: '/lien-he' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10">
              <span className="text-primary font-serif font-bold text-lg">MV</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-primary tracking-wide">
                MỤC VỤ GIA ĐÌNH ĐẮC LỘ
              </span>
              <span className="text-xs text-gray-500 tracking-wider uppercase">
                Dòng Tên Việt Nam
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/dang-ky"
              className="bg-primary text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-primary-800 transition-colors"
            >
              Đăng ký ngay
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/dang-ky"
              className="block w-full text-center bg-primary text-white px-6 py-2.5 rounded-md text-sm font-semibold mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}