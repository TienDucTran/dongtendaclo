'use client';

const stats = [
  { number: '7,775', label: 'Học viên đã đào tạo' },
  { number: '116', label: 'Khóa & chuyên đề đã tổ chức' },
  { number: '5', label: 'Năm có dữ liệu lịch sử' },
];

const yearData = [
  { year: '2022', height: 40, color: 'bg-[#8B1D1D]/10' },
  { year: '2023', height: 96, color: 'bg-[#8B1D1D]/30' },
  { year: '2024', height: 128, color: 'bg-[#8B1D1D]/50' },
  { year: '2025', height: 192, color: 'bg-[#8B1D1D]' },
  { year: '2026', height: 112, color: 'bg-[#8B1D1D]/60' },
];

const courseTypes = [
  { type: 'Chuyên đề', count: '15 khóa', students: '998' },
  { type: 'Khóa học', count: '55 khóa', students: '1,727' },
  { type: 'Khóa miễn phí', count: '20 khóa', students: '681' },
  { type: 'Linh thao', count: '7 khóa', students: '166' },
  { type: 'Tĩnh tâm', count: '19 khóa', students: '4,203' },
];

export default function TrainingHistorySection() {
  return (
    <section id="dao-tao" className="py-20 px-8 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-[#FB923C] text-xs font-bold tracking-[0.1em] uppercase">
            Đào tạo qua các năm
          </span>
        </div>
        <h2 className="text-[#0F172A] text-3xl font-bold text-center mb-4">
          Hành trình đồng hành cùng các học viên
        </h2>
        <p className="text-[#475569] text-center max-w-2xl mx-auto mb-12">
          Tổng hợp số học viên đã tham gia các khóa học, chuyên đề, linh thao và tĩnh tâm tại
          Trung tâm trong những năm gần đây.
        </p>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-8">
              <div className="bg-[#FBF8FC] rounded-lg p-3 w-fit mb-4">
                <svg className="w-6 h-6 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-[#8B1D1D] mb-2">{stat.number}</div>
              <div className="text-[#64748B] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-[#8B1D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-[#1E293B] text-lg font-bold">Học viên theo năm</h3>
            </div>
            <p className="text-[#94A3B8] text-xs uppercase mb-6">
              Tổng số học viên cộng dồn theo năm khai giảng.
            </p>
            <div className="flex items-end justify-between gap-4 h-48">
              {yearData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-full ${item.color} rounded-t`}
                    style={{ height: `${item.height}px` }}
                  />
                  <span className="text-[#64748B] text-xs mt-2">{item.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Types */}
          <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-8">
            <h3 className="text-[#1E293B] text-lg font-bold mb-6">Theo loại hình</h3>
            <div className="space-y-4">
              {courseTypes.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-[#F1F5F9] last:border-0">
                  <div>
                    <div className="text-[#0F172A] font-bold">{item.type}</div>
                    <div className="text-[#94A3B8] text-xs">{item.count}</div>
                  </div>
                  <div className="text-[#8B1D1D] font-bold text-lg">{item.students}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-[#94A3B8] text-xs mt-8">
          * Số liệu được tổng hợp từ 105/116 khóa có ghi nhận số học viên.
        </p>
      </div>
    </section>
  );
}