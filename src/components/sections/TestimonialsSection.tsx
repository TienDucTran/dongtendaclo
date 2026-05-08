const testimonials = [
  {
    id: 1,
    quote: 'Sau khi đi học khóa Nghệ thuật lắng nghe, vợ chồng chúng tôi đã tìm lại được nhau. Những điều tưởng nhỏ – như cách chúng tôi lắng nghe nhau – lại trở thành nguồn vui mới mỗi ngày.',
    author: 'Anh Tuấn & Chị Mai',
    role: 'Vợ chồng — đã tham dự khóa Lắng nghe & Đối thoại',
    initial: 'A',
  },
  {
    id: 2,
    quote: 'Tôi đã từng nghĩ con mình hư hỏng. Sau khóa học, tôi nhận ra điều con cần là một người mẹ biết lắng nghe, chứ không phải một người mẹ luôn có câu trả lời. Cảm ơn các Cha và các thầy cô.',
    author: 'Cô Lan Hương',
    role: 'Mẹ — tham dự khóa Nuôi dạy con tuổi teen',
    initial: 'L',
  },
  {
    id: 3,
    quote: 'Khóa chuẩn bị hôn nhân ở Đắc Lộ không phải là một khóa học, mà là một cuộc đồng hành. Chúng tôi đã có một nền tảng vững chắc để bước vào đời sống vợ chồng – biết ơn Cha và đội ngũ cố vấn...',
    author: 'Anh Bảo & Chị Thảo',
    role: 'Đôi bạn vừa kết hôn – học khóa Chuẩn bị Hôn Nhân',
    initial: 'B',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">
            Hoa Trái Mục Vụ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
            >
              <blockquote className="text-white text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{testimonial.initial}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-white/60 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.718 3.783a2.5 2.5 0 003.536 0z" />
            </svg>
            Viết cảm nhận của bạn
          </button>
        </div>
      </div>
    </section>
  );
}