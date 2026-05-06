import HeroMinistrySection from '@/components/sections/muc-vu/HeroMinistrySection';
import MainProgramsSection from '@/components/sections/muc-vu/MainProgramsSection';
import ContactCTASection from '@/components/sections/muc-vu/ContactCTASection';

export const metadata = {
  title: 'Mục vụ | Mục Vụ Gia Đình Đắc Lộ',
  description: 'Các chương trình mục vụ của CEFAM Đắc Lộ được thiết kế nhằm đồng hành với các cá nhân, đôi bạn, vợ chồng và gia đình trong hành trình chữa lành, trưởng thành và sống đức tin giữa đời sống thường ngày.',
};

export default function MucVuPage() {
  return (
    <>
      <HeroMinistrySection />
      <MainProgramsSection />
      <ContactCTASection />
    </>
  );
}