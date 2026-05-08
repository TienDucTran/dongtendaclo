// Public API - returns active programs only
import { NextRequest, NextResponse } from 'next/server';
import { getPrograms, getProgramBySlug } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const limit = parseInt(searchParams.get('limit') || '50');

    // If slug is provided, return single program
    if (slug) {
      const program = await getProgramBySlug(slug);
      
      if (!program) {
        return NextResponse.json({ 
          error: 'Program not found',
          data: null 
        }, { status: 404 });
      }
      
      return NextResponse.json({ 
        data: program 
      });
    }

    // Otherwise, return list of programs
    const result = await getPrograms({ 
      limit, 
      sort: 'order',
    });
    
    // Only return active programs
    const activePrograms = result.data.filter(p => p.is_active);
    
    return NextResponse.json({ 
      data: activePrograms, 
      total: activePrograms.length 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
