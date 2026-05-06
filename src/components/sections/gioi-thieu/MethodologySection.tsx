'use client';

const methods = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Chuyên môn tâm lý',
    description: 'Chúng tôi lắng nghe, giúp các cá nhân và gia đình nhận diện cảm xúc, thấu hiểu các khó khăn trong tương quan và tìm kiếm những phương thế sống triển nở hơn.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Linh đạo I-nhã',
    description: 'Trong ánh sáng linh đạo I-nhã, chúng tôi đồng hành để các gia đình nhận ra sự hiện diện của Thiên Chúa, phân định các chọn lựa và tìm thấy bình an nội tâm giữa những biến cố của đời sống.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Đồng hành mục vụ',
    description: 'Việc đồng hành được thực hiện trong tinh thần tôn trọng, nhằm giúp mỗi người lớn lên trong tự do nội tâm, tình yêu, đức tin và sự hiệp thông.'
  },
];

export default function MethodologySection() {
  return (
    <section id="phuong-phap" className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-[#FB923C] text-xs font-bold tracking-[0.1em] uppercase">
            Phương pháp tiếp cận
          </span>
        </div>
        <h2 className="text-[#0F172A] text-3xl font-bold text-center mb-4">
          Tâm lý – Thiêng liêng
        </h2>
        <p className="text-[#475569] text-center max-w-3xl mx-auto mb-12">
          CEFAM Đắc Lộ chọn phương pháp tiếp cận Tâm lý — Thiêng liêng, nhìn con người và gia đình trong
          sự thống nhất giữa đời sống nội tâm, các tương quan và hành trình đức tin.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {methods.map((method, index) => (
            <div key={index} className="bg-[#FBF8FC] border border-[#F1F5F9] rounded-lg p-8">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
                  {method.icon}
                </div>
              </div>
              <h3 className="text-[#0F172A] text-xl font-bold text-center mb-4">
                {method.title}
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                {method.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}