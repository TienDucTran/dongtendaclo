import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseDetailClient from './CourseDetailClient';
import { getCourseBySlug } from '@/lib/db/queries';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);
  
  if (!course) {
    return {
      title: 'Không tìm thấy khóa học | Mục Vụ Gia Đình Đắc Lộ',
    };
  }

  return {
    title: `${course.title} | Mục Vụ Gia Đình Đắc Lộ`,
    description: course.description || `Khóa học ${course.title} tại Trung tâm Mục Vụ Gia Đình Đắc Lộ`,
    openGraph: {
      title: course.title,
      description: course.description || '',
      type: 'article',
      locale: 'vi_VN',
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}