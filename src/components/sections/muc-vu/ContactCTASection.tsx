import Link from 'next/link';

export default function ContactCTASection() {
  return (
    <section className="bg-white py-12 border-t border-[#F1F5F9]">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Text Content */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[24px] font-bold font-serif text-slate-800">
              Bạn cần thêm thông tin về một chương trình?
            </h3>
            <p className="text-[16px] font-serif text-slate-500">
              Đội ngũ của trung tâm luôn sẵn sàng lắng nghe và đồng hành cùng bạn.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/lien-he"
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold font-serif text-[16px] hover:bg-primary-800 transition-colors"
            >
              Liên hệ ngay
            </Link>
            <Link
              href="tel:0373778171"
              className="border border-primary text-primary px-8 py-3 rounded-full font-bold font-serif text-[16px] hover:bg-primary hover:text-white transition-colors"
            >
              0373 778 171
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}