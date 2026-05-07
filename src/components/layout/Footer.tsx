import Link from 'next/link';

const footerLinks = {
  explore: [
    { name: 'Về chúng tôi', href: '/gioi-thieu' },
    { name: 'Huấn luyện', href: '/huan-luyen' },
    { name: 'Các chương trình mục vụ', href: '/muc-vu' },
    { name: 'Tài nguyên gia đình', href: '/tai-nguyen' },
    { name: 'Thắc mắc biết hỏi ai?', href: '/thac-mac' },
  ],
  programs: [
    { name: 'Tư vấn mục vụ & tâm lý', href: '/tu-van' },
    { name: 'Chuẩn bị hôn nhân', href: '/chuan-bi-hon-nhan' },
    { name: 'Khóa học nuôi dạy con', href: '/nuoi-day-con' },
    { name: 'Linh hướng', href: '/linh-huong' },
  ],
  contact: [
    { name: '171 Lý Chính Thắng, Phường Võ Thị Sáu, Quận 3, TP.HCM', href: '#' },
    { name: '0373 778 171 / 096 5506 171', href: 'tel:0373778171' },
    { name: 'ttmvgdd@gmail.com', href: 'mailto:ttmvgdd@gmail.com' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary-900 pt-16 pb-8">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 p-3 flex items-center justify-center">
                <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center">
                  {/* Logo Image - TODO: Replace with actual logo image */}
                  <span className="text-white font-serif font-bold text-sm">MV</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white font-serif leading-tight">
                  Mục Vụ Gia Đình
                  <br />
                  Đắc Lộ
                </span>
                <span className="text-[10px] text-white/70 tracking-[0.1em] uppercase font-serif mt-1">
                  HỘI DÒNG TÊN VIỆT NAM
                </span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-sm text-white/70 font-serif leading-relaxed mb-4">
              Đồng hành cùng các gia đình Công giáo
              <br />
              theo tinh thần Tin Mừng và linh đạo
              <br />
              Thánh I-nhã Loyola.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.927.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.261-.073 1.669-.073 4.948 0 3.279.014 3.688.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.261.058 1.669.072 4.948.072 3.279 0 3.688-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.261.073-1.669.073-4.948 0-3.279-.014-3.688-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.261-.059-1.669-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Khám phá */}
          <div>
            <h3 className="text-lg font-bold text-white font-serif mb-6">
              Khám phá
            </h3>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-white/70 font-serif hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mục vụ nổi bật */}
          <div>
            <h3 className="text-lg font-bold text-white font-serif mb-6">
              Mục vụ nổi bật
            </h3>
            <ul className="space-y-4">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-white/70 font-serif hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-bold text-white font-serif mb-6">
              Liên hệ
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-white/50 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-white/70 font-serif">
                  171 Lý Chính Thắng, Phường Võ Thị Sáu, Quận 3, TP.HCM
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:0373778171" className="text-sm text-white/70 font-serif hover:text-white transition-colors">
                  0373 778 171 / 096 5506 171
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:ttmvgdd@gmail.com" className="text-sm text-white/70 font-serif hover:text-white transition-colors">
                  ttmvgdd@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50 font-serif">
              © 2026 Trung Tâm Mục Vụ Gia Đình Đắc Lộ. Mọi bản quyền được bảo lưu.
            </p>
            <p className="text-sm text-white/50 font-serif">
              Ad Maiorem Dei Gloriam — Dòng Tên Việt Nam
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}