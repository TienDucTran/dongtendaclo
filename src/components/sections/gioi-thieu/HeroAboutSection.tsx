'use client';

export default function HeroAboutSection() {
  return (
    <section className="relative bg-[#8B1D1D] py-20 px-8 md:px-48 overflow-hidden">
      {/* Decorative background icon */}
      <div className="absolute right-0 -top-12 opacity-10">
        <svg width="400" height="400" viewBox="0 0 100 100" fill="white">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      
      <div className="relative max-w-5xl mx-auto flex flex-col gap-6">
        {/* Badge */}
        <div className="inline-flex">
          <div className="bg-white/20 rounded px-3 py-1">
            <span className="text-white text-xs font-bold tracking-[0.1em] uppercase">
              Về chúng tôi
            </span>
          </div>
        </div>
        
        {/* Heading */}
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-lg">
          Trung Tâm Mục Vụ
          <br />
          Gia Đình Đắc Lộ
        </h1>
        
        {/* Description */}
        <div className="space-y-4 text-white/90 max-w-3xl text-lg leading-relaxed">
          <p>
            Trung Tâm Mục Vụ Gia Đình (CEFAM) Đắc Lộ — thuộc Tỉnh Dòng Tên Việt Nam — là không gian
            đồng hành, huấn luyện và nâng đỡ các gia đình, đặc biệt là các gia đình trẻ, trong hành trình
            sống ơn gọi hôn nhân và gia đình Công giáo.
          </p>
          <p>
            Chúng tôi mong muốn cùng các gia đình học cách lắng nghe nhau, chăm sóc các tương quan, lớn
            lên trong đức tin và nhận ra sự hiện diện của Thiên Chúa trong đời sống thường ngày.
          </p>
          <p>
            Với tinh thần phục vụ của Dòng Tên, CEFAM Đắc Lộ ước mong mỗi gia đình trở thành một chứng
            nhân Tin Mừng sống động giữa lòng Giáo Hội và xã hội Việt Nam hôm nay.
          </p>
        </div>
      </div>
    </section>
  );
}