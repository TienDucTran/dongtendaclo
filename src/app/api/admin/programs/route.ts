import { NextRequest, NextResponse } from 'next/server';
import { getPrograms, createProgram, getProgramById, updateProgram, deleteProgram } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sort = searchParams.get('sort') || 'order';

    const result = await getPrograms({ search, page, limit, sort });
    return NextResponse.json(result);
  } catch (error: any) {
    // Return empty array instead of 500 for missing tables
    // This allows the admin page to show "Cần setup database" instead
    if (error.message?.includes('does not exist') || error.message?.includes('relation')) {
      return NextResponse.json({ data: [], total: 0, page: 1, limit: 20, totalPages: 0, _setup: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const program = await createProgram(body);
    return NextResponse.json({ data: program }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}