'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import CourseCard from '@/components/ui/CourseCard';

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  categoryId: number | null;
  category_name: string | null;
  format: string;
  format_label: string | null;
  status: string;
  status_label: string | null;
  start_date: string | null;
  location: string | null;
  audience: string[];
  color_hex: string;
  is_featured: boolean;
  is_new: boolean;
}

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use ref to prevent duplicate fetches in React strict mode
  const hasFetched = useRef(false);

  // Fetch courses from API
  useEffect(() => {
    // Prevent duplicate fetches
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
        const res = await fetch(`${baseUrl}/api/courses?limit=6&status=upcoming`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const data = await res.json();
        setCourses(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Không thể tải khóa học. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div className="border-l-4 border-primary pl-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Khóa học đang mở đăng ký
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white border border-border/70 rounded-2xl overflow-hidden">
                  <div className="aspect-[2/1] bg-slate-200"></div>
                  <div className="p-5">
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
                    <div className="border-t border-border/60 pt-3">
                      <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state or no courses
  if (error || courses.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Khóa học đang mở đăng ký
            </h2>
          </div>
          <Link
            href="/khoa-hoc"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}