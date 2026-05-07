// Public API - returns courses for display on public pages
import { NextRequest, NextResponse } from 'next/server';
import { getCourses, getCategories } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status') || undefined;
    const category_slug = searchParams.get('category_slug') || undefined;
    const format_ids = searchParams.get('format_ids') || undefined;
    const audience_ids = searchParams.get('audience_ids') || undefined;
    const program_id = searchParams.get('program_id') ? parseInt(searchParams.get('program_id')!) : undefined;
    const is_featured = searchParams.get('is_featured') === 'true' ? true : undefined;
    const search = searchParams.get('search') || undefined;

    // Get categories for mapping if needed
    let categories = await getCategories();
    let category_id: number | undefined;
    
    if (category_slug) {
      const cat = categories.find((c: any) => c.slug === category_slug);
      if (cat) category_id = cat.id;
    }

    const result = await getCourses({
      limit,
      sort: 'order',
      status: status || 'active',
      program_id,
      category_id,
      is_featured,
      search,
    });

    // Filter courses if needed
    let courses = result.data;
    
    // Filter by format_ids if provided (comma-separated)
    if (format_ids) {
      const ids = format_ids.split(',');
      courses = courses.filter(c => ids.includes(c.format));
    }

    // Filter by audience_ids if provided (comma-separated, partial match)
    if (audience_ids) {
      const ids = audience_ids.split(',');
      courses = courses.filter(c => 
        c.audience?.some(a => ids.includes(a))
      );
    }

    return NextResponse.json({ 
      data: courses, 
      total: courses.length,
      categories,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}