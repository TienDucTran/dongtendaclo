'use client';

interface Program {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  duration: string | null;
  schedule: string | null;
}

interface ProgramDetailContentProps {
  program: Program;
}

export default function ProgramDetailContent({ program }: ProgramDetailContentProps) {
  return (
    <div className="lg:col-span-2 space-y-12">
      {/* Introduction Section */}
      <div>
        <h2 className="text-[30px] font-bold font-serif text-[#1F2937] mb-6">
          Giới thiệu chương trình
        </h2>
        <div className="text-[#4B5563] font-serif leading-relaxed text-base">
          {program.description ? (
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: program.description }} 
            />
          ) : (
            <p>
              Chương trình kéo dài {program.duration || '6 tháng'}, kết hợp lý thuyết tâm lý gia đình, 
              đường hướng mục vụ của Giáo hội và thực hành đồng hành thiêng liêng. 
              Học viên sẽ được cấp chứng chỉ sau khi hoàn tất.
            </p>
          )}
        </div>
      </div>

      {/* Upcoming Sessions Section */}
      <div>
        <h2 className="text-[30px] font-bold font-serif text-[#1F2937] mb-4">
          Các khóa sắp khai giảng
        </h2>
        <p className="text-[#6B7280] font-serif text-base mb-6">
          Chọn một đợt phù hợp để xem chi tiết và đăng ký tham dự.
        </p>
        
        {/* Empty State */}
        <div className="bg-white border-2 border-dashed border-[#E5E7EB] rounded-lg p-12">
          <div className="text-center">
            <p className="text-[#6B7280] font-serif text-base">
              Hiện chưa có đợt sắp khai giảng. Bạn có thể để lại thông tin bên dưới để được thông báo khi có lịch mới.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section (if available) */}
      {program.content && (
        <div>
          <h2 className="text-[30px] font-bold font-serif text-[#1F2937] mb-6">
            Nội dung chương trình
          </h2>
          <div 
            className="prose prose-slate max-w-none text-[#4B5563] font-serif"
            dangerouslySetInnerHTML={{ __html: program.content }} 
          />
        </div>
      )}
    </div>
  );
}