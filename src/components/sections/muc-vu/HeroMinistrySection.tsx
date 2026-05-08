export default function HeroMinistrySection() {
  return (
    <section className="relative bg-primary py-20 lg:py-[80px]">
      {/* Background Image - right side */}
      <div className="absolute right-0 top-0 h-full w-[512px] hidden lg:block">
        <div className="h-full w-full bg-gradient-to-l from-primary/80 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-[768px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="bg-white/10 rounded-full px-4 py-1.5">
              <span className="text-white text-[12px] font-semibold font-serif tracking-[0.05em] uppercase">
                PHỤC VỤ GIA ĐÌNH
              </span>
            </div>
          </div>
          
          {/* Heading */}
          <h1 className="text-white text-[48px] font-bold font-serif leading-[1.25] mb-6">
            Các Chương Trình Mục Vụ
          </h1>
          
          {/* Description paragraphs */}
          <div className="space-y-6">
            <p className="text-white/90 text-[18px] font-serif leading-[1.55]">
              Các chương trình mục vụ của CEFAM Đắc Lộ được thiết kế nhằm đồng hành với các cá nhân, đôi bạn, vợ chồng và gia đình trong hành trình chữa lành, trưởng thành và sống đức tin giữa đời sống thường ngày.
            </p>
            <p className="text-white/90 text-[18px] font-serif leading-[1.55]">
              Với tinh thần lắng nghe, tôn trọng và phục vụ, chúng tôi mong muốn mở ra những không gian gặp gỡ, học hỏi, cầu nguyện và đồng hành, để mỗi gia đình được nâng đỡ trong tình yêu, niềm hy vọng và sự hiện diện của Thiên Chúa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}