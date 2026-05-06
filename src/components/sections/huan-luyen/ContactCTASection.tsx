import Link from 'next/link';

export default function ContactCTASection() {
  return (
    <section className="py-12 px-4 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-[#FEF9F9] border border-red-100 rounded-[40px] p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.038 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.038-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              
              {/* Text */}
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                  Chưa tìm được chương trình phù hợp?
                </h3>
                <p className="text-slate-500 font-serif text-sm">
                  Liên hệ trực tiếp để được tư vấn chương trình phù hợp với nhu cầu của bạn.
                </p>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Call Button */}
              <Link
                href="tel:0373778171"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold font-serif text-sm hover:bg-primary-800 transition-colors shadow-button"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Gọi 0373 778 171</span>
              </Link>

              {/* Zalo Button */}
              <Link
                href="https://zalo.me/0965506171"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold font-serif text-sm hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.5 4.5c3.59 0 6.5 2.462 6.5 5.5 0 1.555-.73 2.96-1.9 3.954.116.256.28.523.496.79.416.518.86.903 1.19 1.126.145.098.216.272.177.44-.04.167-.173.297-.35.33-.29.055-.655.1-1.073.1-.705 0-1.34-.13-1.88-.4-.23-.115-.5-.2-.78-.255-.65.4-1.44.645-2.28.645-2.21 0-4-1.57-4-3.5s1.79-3.5 4-3.5c.965 0 1.854.3 2.575.81.15-.025.305-.035.465-.035.59 0 1.135.16 1.59.435-.32-.15-.69-.28-1.09-.365-.1-.015-.205-.025-.31-.025-.355 0-.68.085-.96.24-.31-.16-.66-.24-1.035-.24-.965 0-1.785.535-2.19 1.32-.165.32-.25.675-.25 1.045 0 .345.085.675.245.975.39.715 1.17 1.205 2.075 1.205.425 0 .82-.105 1.165-.295.18-.1.38-.15.585-.15.265 0 .52.085.735.245.29.22.45.55.45.91 0 .515-.345.96-.84 1.15.065.085.125.175.175.27.215.385.325.84.325 1.31 0 1.465-1.165 2.655-2.6 2.655-.4 0-.78-.1-1.115-.275-.335-.175-.635-.425-.88-.735-.38-.485-.605-1.1-.605-1.765 0-.59.185-1.14.505-1.605-.115-.045-.225-.1-.33-.16-.355-.21-.655-.5-.885-.845-.165-.245-.29-.51-.37-.795-.065-.235-.1-.48-.1-.735 0-.325.055-.64.155-.935.28-.825.87-1.53 1.655-1.985.32-.185.68-.325 1.06-.41-.015-.135-.02-.27-.02-.405 0-.87.38-1.66.99-2.23.725-.68 1.74-1.1 2.86-1.1 1.01 0 1.93.345 2.635.925-.095-.005-.19-.01-.285-.01z"/>
                </svg>
                <span>Nhắn Zalo</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}