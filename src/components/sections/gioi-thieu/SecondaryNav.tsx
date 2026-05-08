'use client';

import { useState, useEffect, useRef } from 'react';

const navItems = [
  { id: 'su-mang-tam-nhin', label: 'Sứ mạng & Tầm nhìn' },
  { id: 'dao-tao', label: 'Đào tạo qua các năm' },
  { id: 'phuong-phap', label: 'Phương pháp tiếp cận' },
  { id: 'chuong-trinh', label: 'Các chương trình chính' },
  { id: 'doi-ngu', label: 'Đội ngũ' },
  { id: 'gia-tri', label: 'Giá trị cốt lõi' },
  { id: 'loi-moi', label: 'Lời mời gọi' },
];

export default function SecondaryNav() {
  const [activeItem, setActiveItem] = useState('su-mang-tam-nhin');
  const [isScrolled, setIsScrolled] = useState(false);
  const isManualScrolling = useRef(false); // Flag để tránh xung đột khi click

  useEffect(() => {
    // 1. Xử lý hiệu ứng thanh Nav (10px)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // 2. Xử lý Tự động Active Item khi Scroll (Intersection Observer)
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -70% 0px', // Điều chỉnh vùng nhận diện (khoảng giữa màn hình)
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Nếu đang trong quá trình scroll do click thì không cập nhật active ngẫu nhiên
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Đăng ký quan sát các section
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleClick = (id: string) => {
    isManualScrolling.current = true;
    setActiveItem(id);
    
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -130; // Trừ đi chiều cao của thanh Nav chính + phụ
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Sau khi scroll xong (khoảng 800ms) thì mở lại cho observer làm việc
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 800);
    }
  };

  return (
    <nav 
      className={`sticky top-[73px] z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-[#FBF8FC] border-b border-[#E2E8F0]'
      }`}
    >
      <div className="container mx-auto">
        <div className="items-center overflow-x-auto flex min-w-max gap-8 py-5 text-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`text-xs font-bold tracking-[0.05em] uppercase whitespace-nowrap transition-all duration-200 border-b-2 pb-1 ${
                activeItem === item.id
                  ? 'text-[#8B1D1D] border-[#8B1D1D]'
                  : 'text-[#64748B] border-transparent hover:text-[#0F172A]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}