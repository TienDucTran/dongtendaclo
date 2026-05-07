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
    const course = await createCourse(body);
    return NextResponse.json({ data: course }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}