'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ProgramDetailHero from '@/components/sections/huan-luyen/detail/ProgramDetailHero';
import ProgramDetailContent from '@/components/sections/huan-luyen/detail/ProgramDetailContent';
import ProgramSidebarForm from '@/components/sections/huan-luyen/detail/ProgramSidebarForm';

interface Program {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  description: string | null;
  content: string | null;
  duration: string | null;
  schedule: string | null;
  current_cohort: string | null;
  icon: string | null;
  pdf_link: string | null;
  color_hex: string;
}

export default function ProgramDetailPage({ slug }: { slug: string }) {
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
        const res = await fetch(`${baseUrl}/api/programs?slug=${slug}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch program');
        }
        
        const data = await res.json();
        setProgram(data.data || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching program:', err);
        setError('Không thể tải thông tin chương trình');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProgram();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="animate-pulse">
          {/* Hero skeleton */}
          <div className="bg-primary pt-20 pb-20 lg:pb-24">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="h-8 bg-white/20 rounded w-1/3 mb-6"></div>
              <div className="h-12 bg-white/20 rounded w-2/3 mb-4"></div>
              <div className="h-6 bg-white/20 rounded w-1/2"></div>
            </div>
          </div>
          {/* Content skeleton */}
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
              <div className="h-96 bg-slate-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !program) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Không tìm thấy chương trình
            </h1>
            <p className="text-slate-600 mb-6">
              {error || 'Chương trình bạn tìm kiếm không tồn tại hoặc đã bị xóa.'}
            </p>
            <Link
              href="/huan-luyen"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại danh sách
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <ProgramDetailHero program={program} />
      
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <ProgramDetailContent program={program} />
            <ProgramSidebarForm program={program} />
          </div>
        </div>
      </section>
    </main>
  );
}