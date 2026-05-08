import Image from 'next/image';
import LucideIcon from '@/components/ui/LucideIcon';
import logoCefam from '@/assets/logo-cefam.png';

export default function HeroTrainingSection() {
  return (
    <section className="relative bg-primary pt-20 lg:pt-[80px] pb-28 lg:pb-36">
      {/* Background Image - right side */}
      <div className="absolute right-0 top-0 h-full w-[512px] hidden lg:block">
        <div className="h-full w-full bg-gradient-to-l from-primary/80 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-[672px]">
          {/* Logo + Badge */}
          <div className="mb-4 flex items-center gap-3">
            <Image
              src={logoCefam}
              alt="Logo CEFAM"
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full bg-white object-contain p-1 shadow-sm"
            />
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white font-semibold uppercase tracking-[0.2em]">
              <LucideIcon name="Sparkles" className="mr-1.5 h-3.5 w-3.5" />
              Huấn luyện & Chuyên đề
            </span>
          </div>
          
          {/* Heading */}
          <h1 className="text-white text-[48px] font-bold font-serif leading-[1.25] mb-6">
            Huấn luyện Mục vụ Gia đình
          </h1>
          
          {/* Description */}
          <p className="text-white/80 text-lg font-serif leading-[1.4]">
            Các chương trình được thiết kế theo tinh thần Tâm lý – Linh hướng Dòng Tên, giúp các gia đình lớn lên trong yêu thương, hiểu biết và đức tin.
          </p>
        </div>
      </div>
    </section>
  );
}