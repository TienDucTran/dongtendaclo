import HeroAboutSection from '@/components/sections/gioi-thieu/HeroAboutSection';
import SecondaryNav from '@/components/sections/gioi-thieu/SecondaryNav';
import MissionVisionSection from '@/components/sections/gioi-thieu/MissionVisionSection';
import TrainingHistorySection from '@/components/sections/gioi-thieu/TrainingHistorySection';
import MethodologySection from '@/components/sections/gioi-thieu/MethodologySection';
import CurrentActivitiesSection from '@/components/sections/gioi-thieu/CurrentActivitiesSection';
import TeamSection from '@/components/sections/gioi-thieu/TeamSection';
import CoreValuesSection from '@/components/sections/gioi-thieu/CoreValuesSection';
import CallToActionSection from '@/components/sections/gioi-thieu/CallToActionSection';

export default function GioiThieuPage() {
  return (
    <>
      <HeroAboutSection />
      <SecondaryNav />
      <MissionVisionSection />
      <TrainingHistorySection />
      <MethodologySection />
      <CurrentActivitiesSection />
      <TeamSection />
      <CoreValuesSection />
      <CallToActionSection />
    </>
  );
}