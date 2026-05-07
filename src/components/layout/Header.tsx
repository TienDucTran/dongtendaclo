'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200/60 shadow-header">
      <div className="container">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center overflow-hidden bg-primary">
              {/* Logo Image - TODO: Replace with actual logo image */}
              <span className="text-white font-serif font-bold text-lg">MV</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-primary tracking-wide font-serif leading-tight">
                MỤC VỤ GIA ĐÌNH ĐẮC LỘ
              </span>
              <span className="text-[10px] text-primary/70 tracking-[0.1em] uppercase font-serif">
                DÒNG TÊN VIỆT NAM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-serif transition-colors ${
                    isActive
                      ? 'text-primary font-semibold border-b-2 border-primary'
                      : 'text-slate-600 font-medium hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/dang-ky"
              className="bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold font-serif hover:bg-primary-800 transition-colors"
            >
              Đăng ký ngay
            </Link>
          </div>
          </nav>


          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-700"
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
        <div className="lg:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-3 px-4 text-sm font-serif rounded-lg transition-colors ${
                    isActive
                      ? 'text-primary font-semibold bg-primary/5'
                      : 'text-slate-600 font-medium hover:text-primary hover:bg-slate-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/dang-ky"
              className="block w-full text-center bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold font-serif mt-4"
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