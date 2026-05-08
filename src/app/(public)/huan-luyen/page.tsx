import { Suspense } from 'react';
import HeroTrainingSection from '@/components/sections/huan-luyen/HeroTrainingSection';
import TabsSection from '@/components/sections/huan-luyen/TabsSection';
import ContactCTASection from '@/components/sections/huan-luyen/ContactCTASection';

export const metadata = {
  title: 'Huấn luyện | Mục Vụ Gia Đình Đắc Lộ',
  description: 'Các chương trình huấn luyện dài hạn và khóa học chuyên đề tại Trung tâm Mục Vụ Gia Đình Đắc Lộ.',
};

function TabsSectionSkeleton() {
  return (
    <div className="px-4 lg:px-8 -mb-px">
      <div className="container mx-auto">
        <div className="animate-pulse flex gap-4 w-full max-w-2xl">
          <div className="h-12 w-1/2 bg-slate-200 rounded-t-2xl rounded-b-none"></div>
          <div className="h-12 w-1/2 bg-slate-200 rounded-t-2xl rounded-b-none"></div>
        </div>
      </div>
    </div>
  );
}

export default function HuanLuyenPage() {
  return (
    <>
      <HeroTrainingSection />
      <Suspense fallback={<TabsSectionSkeleton />}>
        <TabsSection />
      </Suspense>
      <ContactCTASection />
    </>
  );
}