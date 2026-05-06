'use client';

const values = [
  {
    title: 'Đức tin sống động',
    description: 'Chúng tôi đặt nền tảng mọi hoạt động trên niềm tin vào Thiên Chúa là Đấng yêu thương và đang đồng hành với các gia đình.'
  },
  {
    title: 'Lắng nghe và cảm thông',
    description: 'Chúng tôi đón nhận mỗi người trong sự tôn trọng, không phán xét và với lòng cảm thông trước những khó khăn rất thật của đời sống gia đình.'
  },
  {
    title: 'Yêu thương và tha thứ',
    description: 'Chúng tôi tin rằng yêu thương và tha thứ là con đường giúp các gia đình chữa lành, nối lại tương quan và lớn lên trong hy vọng.'
  },
  {
    title: 'Chuyên môn kết hợp đức tin',
    description: 'Chúng tôi vận dụng những hiểu biết tâm lý phù hợp trong ánh sáng đức tin Kitô giáo và linh đạo I-nhã.'
  },
  {
    title: 'Đối thoại và phân định',
    description: 'Chúng tôi khuyến khích các gia đình học cách đối thoại, lắng nghe các chuyển động nội tâm và phân định những chọn lựa quan trọng.'
  },
  {
    title: 'Cộng tác và phục vụ',
    description: 'Chúng tôi làm việc trong tinh thần hiệp thông giữa linh mục, tu sĩ, chuyên viên và các cộng tác viên giáo dân, cùng phục vụ các gia đình.'
  },
];

export default function CoreValuesSection() {
  return (
    <section id="gia-tri" className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-[#FB923C] text-xs font-bold tracking-[0.1em] uppercase">
            Các giá trị cốt lõi
          </span>
        </div>
        <h2 className="text-[#0F172A] text-3xl font-bold text-center mb-12">
          Điều chúng tôi tin tưởng
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-[#FBF8FC] border border-[#F1F5F9] rounded-lg p-8">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-[#0F172A] text-lg font-bold text-center mb-4">
                {value.title}
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}