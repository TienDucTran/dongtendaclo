// Public API - returns active programs only
import { NextRequest, NextResponse } from 'next/server';
import { getPrograms } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

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