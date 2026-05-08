import { supabaseAdmin } from '@/lib/supabase/admin';
import type { Course, CourseInput, TrainingProgram, TrainingProgramInput, PaginatedResponse } from './index';

const supabase = supabaseAdmin;

// ================================================
// Training Programs Queries
// ================================================

export async function getPrograms(options?: {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}): Promise<PaginatedResponse<TrainingProgram>> {
  const page = options?.page || 1;
  const limit = options?.limit || 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('training_programs')
    .select('*', { count: 'exact' });

  // Search
  if (options?.search) {
    query = query.or(
      `title.ilike.%${options.search}%,description.ilike.%${options.search}%,slug.ilike.%${options.search}%`
    );
  }

  // Sort
  const sortField = options?.sort || 'order';
  query = query.order(sortField as any, { ascending: true });

  // Pagination
  const { data, count, error } = await query.range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);

  return {
    data: (data || []) as TrainingProgram[],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function getProgramById(id: number): Promise<TrainingProgram | null> {
  const { data, error } = await supabase
    .from('training_programs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as TrainingProgram;
}

export async function getProgramBySlug(slug: string): Promise<TrainingProgram | null> {
  const { data, error } = await supabase
    .from('training_programs')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) return null;
  return data as TrainingProgram;
}

export async function createProgram(input: TrainingProgramInput): Promise<TrainingProgram> {
  const { data, error } = await supabase
    .from('training_programs')
    .insert([{ ...input, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as TrainingProgram;
}

export async function updateProgram(id: number, input: Partial<TrainingProgramInput>): Promise<TrainingProgram> {
  const { data, error } = await supabase
    .from('training_programs')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as TrainingProgram;
}

export async function deleteProgram(id: number): Promise<void> {
  const { error } = await supabase.from('training_programs').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ================================================
// Courses Queries
// ================================================

export async function getCourses(options?: {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
  program_id?: number;
  category_id?: number;
  status?: string;
  format?: string;
  course_type?: string;
  is_featured?: boolean;
  is_new?: boolean;
}): Promise<PaginatedResponse<Course>> {
  const page = options?.page || 1;
  const limit = options?.limit || 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('courses')
    .select(`
      *,
      training_programs!courses_program_id_fkey (title),
      categories (name)
    `, { count: 'exact' });

  // Filters
  if (options?.search) {
    query = query.or(
      `title.ilike.%${options.search}%,description.ilike.%${options.search}%,slug.ilike.%${options.search}%`
    );
  }
  if (options?.program_id) {
    query = query.eq('program_id', options.program_id);
  }
  if (options?.category_id) {
    query = query.eq('category_id', options.category_id);
  }
  if (options?.status) {
    query = query.eq('status', options.status);
  }
  if (options?.format) {
    query = query.eq('format', options.format);
  }
  if (options?.course_type) {
    query = query.eq('course_type', options.course_type);
  }
  if (options?.is_featured !== undefined) {
    query = query.eq('is_featured', options.is_featured);
  }
  if (options?.is_new !== undefined) {
    query = query.eq('is_new', options.is_new);
  }

  // Sort
  const sortField = options?.sort || 'order';
  query = query.order(sortField as any, { ascending: true });

  // Pagination
  const { data, count, error } = await query.range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);

  // Transform joined fields
  const courses = (data || []).map((item: any) => ({
    ...item,
    program_name: item.training_programs?.title || null,
    category_name: item.categories?.name || null,
  })) as Course[];

  return {
    data: courses,
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function getCourseById(id: number): Promise<Course | null> {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      training_programs!courses_program_id_fkey (title),
      categories (name)
    `)
    .eq('id', id)
    .single();

  if (error) return null;
  const item = data as any;
  return {
    ...item,
    program_name: item.training_programs?.title || null,
    category_name: item.categories?.name || null,
  } as Course;
}

export async function createCourse(input: CourseInput): Promise<Course> {
  const { data, error } = await supabase
    .from('courses')
    .insert([{
      ...input,
      audience: input.audience || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Course;
}

export async function updateCourse(id: number, input: Partial<CourseInput>): Promise<Course> {
  const { data, error } = await supabase
    .from('courses')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Course;
}

export async function deleteCourse(id: number): Promise<void> {
  const { error } = await supabase.from('courses').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ================================================
// Categories Queries
// ================================================

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('order', { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}