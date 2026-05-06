import HeroSection from '@/components/sections/HeroSection';
import QuickStatsSection from '@/components/sections/QuickStatsSection';
import ProgramsSection from '@/components/sections/ProgramsSection';
import CoursesSection from '@/components/sections/CoursesSection';
import KnowledgeSection from '@/components/sections/KnowledgeSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactCTA from '@/components/sections/ContactCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickStatsSection />
      <ProgramsSection />
      <CoursesSection />
      <KnowledgeSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactCTA />
    </>
  );
}