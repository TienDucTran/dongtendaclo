// Database types matching Supabase schema
export interface TrainingProgram {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  duration: string | null;
  schedule: string | null;
  current_cohort: string | null;
  icon: string | null;
  pdf_link: string | null;
  color_hex: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TrainingProgramInput {
  title: string;
  slug: string;
  description?: string;
  duration?: string;
  schedule?: string;
  current_cohort?: string;
  icon?: string;
  pdf_link?: string;
  color_hex?: string;
  order?: number;
  is_active?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  order: number;
  created_at: string;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  program_id: number | null;
  category_id: number | null;
  course_type: 'Chuyên đề' | 'Khóa học';
  format: 'in_person' | 'online' | 'hybrid';
  status: 'active' | 'upcoming' | 'completed';
  status_label: string | null;
  format_label: string | null;
  start_date: string | null;
  students_count: number;
  order: number;
  is_featured: boolean;
  is_new: boolean;
  location: string | null;
  audience: string[];
  color_hex: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  program_name?: string;
  category_name?: string;
}

export interface CourseInput {
  title: string;
  slug: string;
  description?: string;
  program_id?: number | null;
  category_id?: number | null;
  course_type: 'Chuyên đề' | 'Khóa học';
  format: 'in_person' | 'online' | 'hybrid';
  status: 'active' | 'upcoming' | 'completed';
  status_label?: string;
  format_label?: string;
  start_date?: string;
  students_count?: number;
  order?: number;
  is_featured?: boolean;
  is_new?: boolean;
  location?: string;
  audience?: string[];
  color_hex?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}