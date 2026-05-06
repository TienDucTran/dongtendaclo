import Link from 'next/link';

const statsCards = [
  {
    title: 'Đăng ký',
    value: '4',
    badge: '2 mới',
    href: '/admin/dang-ky',
    icon: '📝',
    color: 'bg-[#F9ECEC]',
  },
  {
    title: 'Tin nhắn liên hệ',
    value: '1',
    badge: '1 mới',
    href: '/admin/tin-nhanh',
    icon: '💬',
    color: 'bg-[#F9ECEC]',
  },
  {
    title: 'Thắc mắc biết hỏi ai?',
    value: '0',
    href: '/admin/thac-mac',
    icon: '❓',
    color: 'bg-[#F9ECEC]',
  },
  {
    title: 'Huấn luyện',
    value: '116',
    subtitle: 'Trong đó 2 chương trình',
    href: '/admin/huan-luyen',
    icon: '📚',
    color: 'bg-[#F9ECEC]',
  },
  {
    title: 'Mục vụ',
    value: '4',
    href: '/admin/muc-vu',
    icon: '⛪',
    color: 'bg-[#F9ECEC]',
  },
  {
    title: 'Bài viết',
    value: '8',
    href: '/admin/bai-viet',
    icon: '📄',
    color: 'bg-[#F9ECEC]',
  },
  {
    title: 'FAQ',
    value: '5',
    href: '/admin/faq',
    icon: '💭',
    color: 'bg-[#F9ECEC]',
  },
  {
    title: 'Cảm nhận',
    value: '4',
    href: '/admin/cam-nhan',
    icon: '💡',
    color: 'bg-[#F9ECEC]',
  },
];

const typeStats = [
  { name: 'Chuyên đề', count: '998', courses: '15 khóa' },
  { name: 'Khóa học', count: '1.727', courses: '55 khóa' },
  { name: 'Khóa miễn phí', count: '681', courses: '20 khóa' },
  { name: 'Linh thao', count: '166', courses: '7 khóa' },
  { name: 'Tĩnh tâm', count: '4.203', courses: '19 khóa' },
];

const quickGuideItems = [
  'Bấm vào ô số liệu để xem nội dung tương ứng.',
  'Đăng ký mới, tin nhắn liên hệ và chia sẻ mục vụ mới sẽ được gắn nhãn "mới" cho đến khi bạn cập nhật trạng thái.',
  'Có thể gửi email trả lời trực tiếp từ trang Đăng ký nếu người gửi để lại email.',
  'Mục "Cấu hình trang" cho phép sửa thông tin liên hệ, lời chào trang chủ, v.v.',
  'Mục "Cấu hình mục vụ" dùng riêng để quản lý trang "Thắc mắc biết hỏi ai?", routing email và email template liên quan.',
];

export default async function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-[30px] font-serif font-normal text-gray-800 mb-8">Tổng quan</h1>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow relative"
          >
            {/* Badge */}
            {card.badge && (
              <span className="absolute top-4 right-4 bg-[#8B1D1D] text-white text-xs font-bold px-2 py-1 rounded-full">
                {card.badge}
              </span>
            )}
            
            {/* Icon */}
            <div className="w-10 h-10 bg-[#F9ECEC] rounded-lg flex items-center justify-center mb-3 text-xl">
              {card.icon}
            </div>
            
            {/* Title */}
            <h3 className="text-sm font-serif text-gray-500 mb-1">{card.title}</h3>
            
            {/* Value */}
            <p className="text-3xl font-serif font-normal text-gray-800">{card.value}</p>
            
            {/* Subtitle */}
            {card.subtitle && (
              <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
            )}
            
            {/* Link */}
            <div className="flex items-center gap-1 mt-4 text-xs text-gray-500 hover:text-[#8B1D1D]">
              <span className="font-serif">Xem chi tiết</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Yearly Report Section */}
      <div className="bg-white border border-gray-200 rounded-2xl mb-8">
        <div className="p-8 pb-4">
          <h2 className="text-xl font-serif font-bold text-gray-800 mb-1">
            Báo cáo đào tạo qua các năm
          </h2>
          <p className="text-sm text-gray-500">
            Tổng hợp số học viên, số khóa theo loại hình và theo năm khai giảng.
          </p>
        </div>

        {/* Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#F9ECEC] rounded-lg flex items-center justify-center text-2xl">
              👥
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-gray-800">7.775</p>
              <p className="text-xs text-gray-500">Học viên đã đào tạo</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#F9ECEC] rounded-lg flex items-center justify-center text-2xl">
              📚
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-gray-800">116</p>
              <p className="text-xs text-gray-500">Khóa & chuyên đề đã tổ chức</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#F9ECEC] rounded-lg flex items-center justify-center text-2xl">
              📅
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-gray-800">5</p>
              <p className="text-xs text-gray-500">Năm có dữ liệu lịch sử</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pb-8">
          {/* Student Chart */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 bg-[#F9ECEC] rounded-lg flex items-center justify-center text-lg">
                📊
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-gray-800">Học viên theo năm</h4>
                <p className="text-xs text-gray-500">Tổng số học viên cộng dồn theo năm khai giảng.</p>
              </div>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="border-b border-gray-200 pb-8">
              <div className="flex items-end justify-between h-48 gap-4">
                {[2022, 2023, 2024, 2025, 2026].map((year, index) => {
                  const heights = [60, 75, 85, 95, 100];
                  return (
                    <div key={year} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-[#8B1D1D] rounded-t"
                        style={{ height: `${heights[index]}%` }}
                      />
                      <span className="text-xs text-gray-500 mt-2">{year}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              * Số liệu được tổng hợp từ 105/116 khóa có ghi nhận số học viên.
            </p>
          </div>

          {/* Type Stats */}
          <div>
            <h4 className="text-base font-serif font-bold text-gray-800 mb-1">Theo loại hình</h4>
            <p className="text-xs text-gray-500 mb-4">Tổng hợp theo loại sự kiện đã tổ chức.</p>
            
            <div className="space-y-0">
              {typeStats.map((stat, index) => (
                <div 
                  key={stat.name} 
                  className={`flex items-center justify-between py-3 ${
                    index !== typeStats.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div>
                    <p className="text-sm font-serif font-bold text-gray-700">{stat.name}</p>
                    <p className="text-xs text-gray-500">{stat.courses}</p>
                  </div>
                  <p className="text-xl font-serif font-bold text-[#8B1D1D]">{stat.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Guide Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Hướng dẫn nhanh</h3>
        
        <div className="space-y-3">
          {quickGuideItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-gray-400">•</span>
              <p className="text-sm text-gray-600 font-serif">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}