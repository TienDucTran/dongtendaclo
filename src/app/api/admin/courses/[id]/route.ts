import { NextRequest, NextResponse } from 'next/server';
import { getCourseById, updateCourse, deleteCourse } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const course = await getCourseById(id);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json({ data: course });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();
    
    // Map form data to database schema - only include fields that exist in the courses table
    const courseInput: Record<string, any> = {};
    if (body.title !== undefined) courseInput.title = body.title;
    if (body.slug !== undefined) courseInput.slug = body.slug;
    if (body.description !== undefined) courseInput.description = body.description;
    if (body.short_description !== undefined && !body.description) courseInput.description = body.short_description;
    if (body.program_id !== undefined) courseInput.program_id = body.program_id || null;
    if (body.category_id !== undefined) courseInput.category_id = body.category_id || null;
    if (body.course_type !== undefined) courseInput.course_type = body.course_type;
    if (body.format !== undefined) {
      courseInput.format = body.format;
      courseInput.format_label = body.format === 'in_person' ? 'Trực tiếp' : body.format === 'online' ? 'Online' : 'Kết hợp';
    }
    if (body.status !== undefined) {
      courseInput.status = body.status;
      courseInput.status_label = body.status === 'active' ? 'Đang mở' : body.status === 'upcoming' ? 'Sắp khai giảng' : 'Đã qua';
    }
    if (body.start_date !== undefined) courseInput.start_date = body.start_date || null;
    if (body.students_count !== undefined) courseInput.students_count = body.students_count;
    if (body.order !== undefined) courseInput.order = body.order;
    if (body.is_featured !== undefined) courseInput.is_featured = body.is_featured;
    if (body.is_new !== undefined) courseInput.is_new = body.is_new;
    if (body.location !== undefined) courseInput.location = body.location;
    if (body.target_audience !== undefined) courseInput.audience = body.target_audience.split(',').map((s: string) => s.trim()).filter(Boolean);
    if (body.color_hex !== undefined) courseInput.color_hex = body.color_hex;
    
    const course = await updateCourse(id, courseInput);
    return NextResponse.json({ data: course });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    await deleteCourse(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}