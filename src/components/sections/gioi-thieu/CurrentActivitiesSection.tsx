'use client';

const activities = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Huấn luyện',
    description: 'Gồm hai hoạt động chính: (1) Các chương trình huấn luyện dành cho những người phục vụ trong lĩnh vực hôn nhân và gia đình, kết hợp giáo huấn Kitô giáo, tâm lý và kỹ năng đồng hành. (2) Các khóa học chuyên đề về tình yêu, hôn nhân, kỹ năng làm cha mẹ, tâm lý lứa tuổi...'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Tư vấn mục vụ & tâm lý',
    description: 'Không gian lắng nghe và đồng hành dành cho cá nhân, cặp đôi và gia đình đang đối diện với những khó khăn trong đời sống tâm lý, tương quan, hôn nhân, gia đình hoặc đức tin.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Đồng Hành Gia Đình Trẻ',
    description: 'Một cộng đoàn nâng đỡ các gia đình trẻ qua các buổi gặp gỡ, chia sẻ, cầu nguyện, học hỏi và sinh hoạt chung, giúp các gia đình lớn lên trong tình yêu và sự hiệp thông.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Tĩnh tâm và linh thao cho các gia đình',
    description: 'Các khóa tĩnh tâm và linh thao giúp các gia đình dừng lại, cầu nguyện, phân định và gặp gỡ Thiên Chúa trong chính đời sống hôn nhân và gia đình.'
  },
];

export default function CurrentActivitiesSection() {
  return (
    <section id="chuong-trinh" className="py-20 px-8 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-[#FB923C] text-xs font-bold tracking-[0.1em] uppercase">
            Các chương trình chính
          </span>
        </div>
        <h2 className="text-[#0F172A] text-3xl font-bold text-center mb-4">
          Những hoạt động chúng tôi đang triển khai
        </h2>
        <p className="text-[#475569] text-center max-w-3xl mx-auto mb-12">
          Các hoạt động của CEFAM Đắc Lộ được triển khai qua những chương trình chính sau:
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-10">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-[#FBF8FC] rounded-full flex items-center justify-center">
                  {activity.icon}
                </div>
              </div>
              <h3 className="text-[#0F172A] text-xl font-bold text-center mb-4">
                {activity.title}
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}