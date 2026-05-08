export default function HeroTrainingSection() {
  return (
    <section className="relative bg-primary pt-20 lg:pt-[80px] pb-28 lg:pb-36">
      {/* Background Image - right side */}
      <div className="absolute right-0 top-0 h-full w-[512px] hidden lg:block">
        <div className="h-full w-full bg-gradient-to-l from-primary/80 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-[672px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="bg-white/20 rounded-full px-4 py-2">
              <span className="text-white text-sm font-semibold font-serif tracking-[0.1em] uppercase">
                HUẤN LUYỂN & CHUYÊN ĐỀ
              </span>
            </div>
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
