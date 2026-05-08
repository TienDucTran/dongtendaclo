'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserInfo {
  id: string;
  email: string;
  role?: string;
}

interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: {
    id: string;
    email: string;
  };
}

const menuItems = [
  { href: '/admin', label: 'Tổng quan', icon: 'home', exact: true },
  { href: '/admin/dang-ky', label: 'Đăng ký', icon: 'register' },
  { href: '/admin/tin-nhanh', label: 'Tin nhắn liên hệ', icon: 'message' },
  { href: '/admin/thac-mac', label: 'Thắc mắc biết hỏi ai?', icon: 'question' },
  { href: '/admin/huan-luyen', label: 'Chương trình huấn luyện', icon: 'training', multiline: true },
  { href: '/admin/khoa-hoc', label: 'Khóa học chuyên đề', icon: 'course' },
  { href: '/admin/muc-vu', label: 'Mục vụ', icon: 'ministry' },
  { href: '/admin/tinh-tam', label: 'Khóa tĩnh tâm / linh thao', icon: 'retreat', multiline: true },
  { href: '/admin/bai-viet', label: 'Bài viết / Tài nguyên', icon: 'post' },
  { href: '/admin/faq', label: 'Câu hỏi thường gặp', icon: 'faq' },
  { href: '/admin/cam-nhan', label: 'Cảm nhận', icon: 'feedback' },
  { href: '/admin/doi-ngu', label: 'Đội ngũ', icon: 'team' },
  { href: '/admin/cau-hinh', label: 'Cấu hình trang', icon: 'settings' },
  { href: '/admin/cau-hinh-thac-mac', label: "Cấu hình 'Thắc mắc biết...'", icon: 'config', multiline: true },
  { href: '/admin/nhat-ky', label: 'Nhật ký email', icon: 'email' },
  { href: '/admin/nguoi-dung', label: 'Người dùng quản trị', icon: 'users' },
];

const icons: Record<string, React.ReactNode> = {
  home: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  register: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  message: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  question: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  training: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  course: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  ministry: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  retreat: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  post: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ),
  faq: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
  ),
  feedback: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  team: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  settings: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  config: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
  email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

function SidebarLink({ item }: { item: { href: string; label: string; icon: string; exact?: boolean; multiline?: boolean } }) {
  const pathname = usePathname();
  const isActive = item.exact 
    ? pathname === item.href 
    : pathname.startsWith(item.href);
  
  const icon = icons[item.icon];
  
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors mb-1 ${
        isActive
          ? 'bg-[#8B1D1D] text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <span className={isActive ? 'text-white' : 'text-gray-500'}>{icon}</span>
      <span className={`text-sm font-serif ${item.multiline ? 'leading-tight' : ''}`}>
        {item.label}
      </span>
    </Link>
  );
}

export default function Sidebar() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user info from localStorage
    const getUser = () => {
      try {
        const sessionStr = localStorage.getItem('admin_session');
        
        if (sessionStr) {
          const session: Session = JSON.parse(sessionStr);
          
          // Check if token is expired
          if (session.expires_at && session.expires_at * 1000 < Date.now()) {
            // Token expired, clear session
            localStorage.removeItem('admin_session');
            setUser(null);
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email,
              role: 'Admin',
            });
          }
        }
      } catch (error) {
        console.error('Error getting user:', error);
        localStorage.removeItem('admin_session');
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  const handleLogout = () => {
    // Clear session from localStorage
    localStorage.removeItem('admin_session');
    setUser(null);
    // Redirect to login
    router.push('/admin/login');
  };

  // Get display name from email
  const getDisplayName = (email: string) => {
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <p className="text-xs text-gray-400 tracking-widest font-serif uppercase">Trang quản trị</p>
        <h1 className="text-xl font-serif font-bold text-[#8B1D1D] mt-1">CEFAM Admin</h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        {menuItems.map((item) => (
          <SidebarLink key={item.href} item={item} />
        ))}
      </nav>
      
      {/* User section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-xl p-3 mb-3">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
          ) : user ? (
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 bg-[#801C1C] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-serif text-gray-700 truncate">
                    {getDisplayName(user.email)}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              <p>Chưa đăng nhập</p>
            </div>
          )}
        </div>
        
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span className="font-serif">Về trang công khai</span>
        </Link>
        
        <button 
          onClick={handleLogout}
          disabled={!user}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors w-full mt-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-serif">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}