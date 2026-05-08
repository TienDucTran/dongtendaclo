import Link from 'next/link';

const articles = [
  {
    id: 1,
    category: 'HÔN NHÂN',
    date: '11/4/2026',
    title: 'Năm bí quyết lắng nghe nhau giữa cuộc sống bận rộn',
    excerpt: 'Khi vợ chồng không còn lắng nghe nhau, tình yêu dần thinh lặng. Năm bí quyết nhỏ giúp bạn tìm lại không gian đối thoại trong gia đình.',
    readTime: '8 phút đọc',
    type: 'Bài viết',
    image: '/images/article-1.jpg',
  },
  {
    id: 2,
    category: 'GIÁO DỤC ĐỨC TIN',
    date: '7/4/2026',
    title: 'Dạy con cầu nguyện từ những điều rất nhỏ',
    excerpt: 'Cầu nguyện không phải là một hoạt động được dạy bằng lý thuyết. Nó được trao đi qua chính một người mẹ luôn có cách cho trẻ sống đức tin mỗi ngày.',
    readTime: '6 phút đọc',
    type: 'Bài viết',
    image: '/images/article-2.jpg',
  },
  {
    id: 3,
    category: 'TÂM LÝ GIA ĐÌNH',
    date: '29/3/2026',
    title: 'Chăm sóc sức khỏe tinh thần cho người làm cha mẹ',
    excerpt: 'Cha mẹ kiệt sức là một thực tế mà nhiều gia đình hiện đại đang phải đối diện. Đâu là không gian an toàn để tháo gỡ?',
    readTime: '9 phút đọc',
    type: 'Bài viết',
    image: '/images/article-3.jpg',
  },
];

const resources = [
  {
    id: 1,
    category: 'TÀI LIỆU NỀN TẢNG',
    date: '27/2/2026',
    title: 'Đọc tông huấn Amoris Laetitia cùng cả gia đình',
    description: 'Bộ tài liệu hướng dẫn đọc Tông huấn Amoris Laetitia trong gia đình – chia thành 9 buổi, có câu hỏi gợi ý và bài tập thực hành.',
    type: 'Sách & tài liệu',
    image: '/images/resource-1.jpg',
  },
  {
    id: 2,
    category: 'TỌA ĐÀM',
    date: '19/1/2026',
    title: 'Tọa đàm: "Sống Tin Mừng giữa thời đại số" – phát sóng trực tuyến',
    description: 'Bản ghi hình tọa đàm với ba diễn giả về cách sống đức tin trưởng thành giữa kỷ nguyên mạng xã hội của cha mẹ và các thầy cô.',
    type: 'Video',
    image: '/images/resource-2.jpg',
  },
];

export default function KnowledgeSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Kiến thức về gia đình & linh đạo
            </h2>
          </div>
          <Link
            href="/tai-nguyen"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Xem tất cả bài viết →
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    {article.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.24 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>{article.type}</span>
                  </div>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 h-48 md:h-auto bg-gray-200 relative flex-shrink-0">
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    {resource.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500">{resource.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{resource.type}</span>
                  </div>
                  <Link
                    href={`/tai-nguyen/${resource.id}`}
                    className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Đọc tiếp →
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