'use client';

const teams = [
  {
    title: 'Ban Điều Hành',
    description: 'Linh mục Nguyễn Minh Triệu, SJ, STD — Đặc trách',
    bgColor: 'bg-[#8B1D1D]/10',
  },
  {
    title: 'Ban Giảng Huấn',
    description: 'Đội ngũ chuyên gia và tu sĩ giàu kinh nghiệm...',
    bgColor: 'bg-[#FFEDD5]',
  },
  {
    title: 'Cộng Tác Viên',
    description: 'Sự tham gia tích cực từ các gia đình...',
    bgColor: 'bg-[#CCFBF1]',
  },
];

export default function TeamSection() {
  return (
    <section id="doi-ngu" className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-[#FB923C] text-xs font-bold tracking-[0.1em] uppercase">
            Đội ngũ đồng hành
          </span>
        </div>
        <h2 className="text-[#0F172A] text-3xl font-bold text-center mb-8">
          Những người đồng hành cùng bạn
        </h2>

        {/* Description */}
        <div className="max-w-3xl mx-auto mb-12 space-y-4">
          <p className="text-[#475569] text-center">
            CEFAM Đắc Lộ là một cộng đoàn quy tụ những con người cùng chung một thao thức: phục vụ các gia đình trong
            tinh thần cộng tác, lắng nghe và yêu thương.
          </p>
          <p className="text-[#475569] text-center">
            Chúng tôi cùng chia sẻ một niềm xác tín: tình yêu, lòng cảm thông và đức tin vào Thiên Chúa —
            Đấng yêu thương vô điều kiện — là nền tảng giúp các gia đình tìm lại bình an, hy vọng và sức sống.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {teams.map((team, index) => (
            <div key={index} className="bg-[#FBF8FC] border border-[#F1F5F9] rounded-lg p-8">
              <div className={`w-16 h-16 ${team.bgColor} rounded-full mb-6 flex items-center justify-center`}>
                <svg className="w-8 h-8 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-[#0F172A] text-xl font-bold mb-4">
                {team.title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">
                {team.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}