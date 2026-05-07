import Link from 'next/link';

const courses = [
  {
    id: 1,
    title: 'Chuyên đề "Thai Giáo"',
    description: 'Khóa chuyên đề dành cho các cặp vợ chồng đang chuẩn bị đón con và những gia đình có em bé dưới 1 tuổi. Cùng các chuyên gia tâm lý, dinh dưỡng...',
    date: 'Thứ Sáu • Kết hợp',
    badge: 'MỚI',
    badgeColor: 'bg-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    id: 2,
    title: 'Nghệ thuật lắng nghe & đối thoại yêu thương trong gia đình',
    description: 'Lắng nghe là khởi đầu của tình yêu. Khóa học giúp mỗi người trong gia đình tập kỹ năng lắng nghe sâu – từ cảm xúc đến nhu cầu, và đối thoại trong tình...',
    date: 'Thứ Hai • Trực tiếp',
    badge: 'NỔI BẬT',
    badgeColor: 'bg-primary',
    bgColor: 'bg-gray-100',
  },
  {
    id: 3,
    title: 'Vấn đề giới tính & kỹ năng phòng chống xâm hại cho trẻ',
    description: 'Một chuyên đề khẩn thiết cho mọi gia đình. Trang bị cho cha mẹ và thầy cô giáo kiến thức và kỹ năng nhẹ nhàng để bảo vệ con trẻ khỏi mọi hình thức...',
    date: 'Thứ Năm • Trực tiếp',
    badge: 'MỚI',
    badgeColor: 'bg-orange-500',
    bgColor: 'bg-teal-50',
  },
  {
    id: 4,
    title: 'Gia đình giữa làn sóng công nghệ & trí tuệ nhân tạo',
    description: 'Trí tuệ nhân tạo, mạng xã hội, smartphone... đang định hình lại đời sống gia đình. Chuyên đề mời gọi suy tư và đề xuất những lối sống đức tin trưởng...',
    date: 'Chủ Nhật • Kết hợp',
    badge: 'NỔI BẬT',
    badgeColor: 'bg-primary',
    bgColor: 'bg-orange-50',
  },
  {
    id: 5,
    title: 'Gia đình Việt Nam trong buổi đầu Tin Mừng đến đất Việt',
    description: 'Một hành trình lịch sử đầy cảm hứng – gia đình Việt Nam đã đón nhận và sống Tin Mừng như thế nào trong những thế kỷ đầu? Bài học cho mục vụ...',
    date: 'Thứ Bảy • Trực tiếp',
    badge: 'MỚI',
    badgeColor: 'bg-orange-500',
    bgColor: 'bg-gray-100',
  },
  {
    id: 6,
    title: 'Khóa Chuẩn bị Hôn nhân Công giáo – Mùa Hè 2026',
    description: 'Khóa chuẩn bị hôn nhân Công giáo dành cho các đôi bạn dự định kết hôn trong vòng 6-12 tháng tới. Đầy đủ chứng nhận cho hồ sơ hôn phối.',
    date: 'Thứ Bảy • Trực tiếp',
    badge: 'NỔI BẬT',
    badgeColor: 'bg-primary',
    bgColor: 'bg-teal-50',
  },
];

export default function CoursesSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Khóa học đang mở đăng ký
            </h2>
          </div>
          <Link
            href="/khoa-hoc"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`group ${course.bgColor} border border-gray-200 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`${course.badgeColor} text-white text-xs font-bold px-3 py-1 rounded`}>
                    {course.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                  {course.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-600">
                    {course.date}
                  </span>
                  <Link
                    href={`/khoa-hoc/${course.id}`}
                    className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Đọc thêm & Đăng ký →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}