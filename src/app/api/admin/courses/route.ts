import { NextRequest, NextResponse } from 'next/server';
import { getCourses, createCourse } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sort = searchParams.get('sort') || 'order';
    const program_id = searchParams.get('program_id') ? parseInt(searchParams.get('program_id')!) : undefined;
    const category_id = searchParams.get('category_id') ? parseInt(searchParams.get('category_id')!) : undefined;
    const status = searchParams.get('status') || undefined;
    const format = searchParams.get('format') || undefined;
    const course_type = searchParams.get('course_type') || undefined;
    const is_featured = searchParams.get('is_featured') === 'true' ? true : undefined;
    const is_new = searchParams.get('is_new') === 'true' ? true : undefined;

    const result = await getCourses({
      search, page, limit, sort,
      program_id, category_id, status, format, course_type,
      is_featured, is_new,
    });
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.message?.includes('does not exist') || error.message?.includes('relation')) {
      return NextResponse.json({ data: [], total: 0, page: 1, limit: 20, totalPages: 0, _setup: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Map form data to database schema - only include fields that exist in the courses table
    const courseInput = {
      title: body.title,
      slug: body.slug,
      description: body.description || body.short_description || null,
      program_id: body.program_id || null,
      category_id: body.category_id || null,
      course_type: body.course_type || 'course',
      format: body.format || 'in_person',
      status: body.status || 'active',
      status_label: body.status === 'active' ? 'Đang mở' : body.status === 'upcoming' ? 'Sắp khai giảng' : 'Đã qua',
      format_label: body.format === 'in_person' ? 'Trực tiếp' : body.format === 'online' ? 'Online' : 'Kết hợp',
      start_date: body.start_date || null,
      students_count: body.students_count || 0,
      order: body.order || 0,
      is_featured: body.is_featured ?? false,
      is_new: body.is_new ?? false,
      location: body.location || null,
      audience: body.target_audience ? body.target_audience.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      color_hex: body.color_hex || '#8A1A1A',
    };
    
    const course = await createCourse(courseInput);
    return NextResponse.json({ data: course }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
