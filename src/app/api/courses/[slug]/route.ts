import { NextRequest, NextResponse } from 'next/server';
import { getCourseBySlug } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const course = await getCourseBySlug(slug);

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: course });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}