'use client';

import { useState } from 'react';

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

  const handleClick = (id: string) => {
    setActiveItem(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-[#FBF8FC] border-b border-[#E2E8F0] sticky top-[73px] z-40">
      <div className="px-8 py-4">
        <div className="flex items-center gap-8 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`text-xs font-bold tracking-[0.05em] uppercase whitespace-nowrap transition-colors ${
                activeItem === item.id
                  ? 'text-[#8B1D1D] border-b-2 border-[#8B1D1D]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
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