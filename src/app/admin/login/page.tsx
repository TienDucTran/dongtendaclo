'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Use Supabase client-side auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
        setIsLoading(false);
        return;
      }

      // Store session in localStorage for easy access
      if (data.session) {
        localStorage.setItem('admin_session', JSON.stringify({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
          user: {
            id: data.user?.id,
            email: data.user?.email,
          }
        }));
      }

      // Redirect to admin dashboard
      window.location.href = redirect;
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="pt-12 pb-8 px-8">
            {/* Shield Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-[#801C1C] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-serif text-gray-800 text-center mb-2">
              Đăng nhập quản trị
            </h1>
            <p className="text-sm font-serif text-gray-500 text-center">
              Trung Tâm Mục Vụ Gia Đình Đắc Lộ
            </p>
          </div>

          {/* Login Form */}
          <div className="px-12 pb-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-serif text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    autoComplete="email"
                    className="w-full py-3 px-4 pl-10 bg-blue-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#801C1C] focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-serif text-gray-700">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="w-full py-3 px-4 pl-10 pr-10 bg-blue-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#801C1C] focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.414a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full py-3 px-4 bg-[#801C1C] text-white font-serif text-base tracking-widest uppercase rounded-md hover:bg-[#6B1717] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  'ĐĂNG NHẬP'
                )}
              </button>
            </form>

            {/* Forgot Password Link */}
            <div className="mt-6 text-center">
              <Link href="/admin/forgot-password" className="text-sm text-gray-500 hover:text-[#801C1C] transition-colors">
                Quên mật khẩu?
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-[#801C1C] transition-colors">
            ← Quay về trang chủ
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            © 2024 Trung Tâm Mục Vụ Gia Đình Đắc Lộ
          </p>
        </div>
      </div>
    </div>
  );
}