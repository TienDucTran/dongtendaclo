import HeroTrainingSection from '@/components/sections/huan-luyen/HeroTrainingSection';
import TabsSection from '@/components/sections/huan-luyen/TabsSection';
import LongTermProgramsSection from '@/components/sections/huan-luyen/LongTermProgramsSection';
import UpcomingScheduleSection from '@/components/sections/huan-luyen/UpcomingScheduleSection';
import ContactCTASection from '@/components/sections/huan-luyen/ContactCTASection';

export const metadata = {
  title: 'Huấn luyện | Mục Vụ Gia Đình Đắc Lộ',
  description: 'Các chương trình huấn luyện dài hạn và khóa học chuyên đề tại Trung tâm Mục Vụ Gia Đình Đắc Lộ.',
};

export default function HuanLuyenPage() {
  return (
    <>
      <HeroTrainingSection />
      <TabsSection />
      <LongTermProgramsSection />
      <UpcomingScheduleSection />
      <ContactCTASection />
    </>
  );
}