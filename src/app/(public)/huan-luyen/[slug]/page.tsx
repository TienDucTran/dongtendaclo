import { Suspense } from 'react';
import ProgramDetailPage from './ProgramDetailPage';

// Generate static params for known programs
export async function generateStaticParams() {
  // Return empty array - will be populated dynamically
  return [];
}

export const metadata = {
  title: 'Chương trình huấn luyện | Mục Vụ Gia Đình Đắc Lộ',
  description: 'Chi tiết chương trình huấn luyện tại Trung tâm Mục Vụ Gia Đình Đắc Lộ',
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProgramDetailPage slug={slug} />
    </Suspense>
  );
}