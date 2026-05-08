'use client';

import Sidebar from '@/components/admin/Sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Check authentication on mount
  useEffect(() => {
    // Don't check for login page
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }

    // Check localStorage for session
    const session = localStorage.getItem('admin_session');
    
    if (!session) {
      // No session, redirect to login
      router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    try {
      const parsedSession = JSON.parse(session);
      
      // Check if token is expired
      if (parsedSession.expires_at && parsedSession.expires_at * 1000 < Date.now()) {
        // Token expired, clear and redirect
        localStorage.removeItem('admin_session');
        router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      setIsAuthenticated(true);
    } catch (e) {
      // Invalid session, redirect to login
      localStorage.removeItem('admin_session');
      router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router]);

  // Loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FDF9F9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#801C1C]"></div>
          <p className="text-gray-600 font-serif">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Login page doesn't need sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Not authenticated - show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated - show admin layout with sidebar
  return (
    <div className="min-h-screen bg-[#FDF9F9]">
      <Sidebar />
      <main className="ml-64">
        {children}
      </main>
    </div>
  );
}
