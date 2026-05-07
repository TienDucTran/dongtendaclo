'use client';

import Link from 'next/link';

export default function CallToActionSection() {
  return (
    <section id="loi-moi" className="py-20 px-8 bg-[#0F172A]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-[#FB923C] text-xs font-bold tracking-[0.1em] uppercase">
            Lời mời gọi
          </span>
        </div>
        <h2 className="text-white text-3xl font-bold text-center mb-8">
          Cùng bước đi trên hành trình này
        </h2>

        {/* Description */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-[#94A3B8] text-center text-lg leading-relaxed">
            Nếu bạn đang tìm một không gian để được lắng nghe, học hỏi, cầu nguyện hoặc đồng
            hành trong đời sống hôn nhân và gia đình, CEFAM Đắc Lộ hân hạnh được cùng bạn
            bước đi trên hành trình ấy.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/huan-luyen"
            className="bg-white text-[#0F172A] px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
          >
            Khám phá các chương trình
          </Link>
          <Link
            href="/lien-he"
            className="border border-white/30 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            Liên hệ với chúng tôi
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}