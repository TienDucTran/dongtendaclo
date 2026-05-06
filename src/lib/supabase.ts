import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category_id: string;
  author_id: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent_id: string | null;
  created_at: string;
}

// Database helper functions
export const db = {
  pages: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Page[];
    },
    getBySlug: async (slug: string) => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data as Page;
    },
  },
  posts: {
    getAll: async (limit = 10) => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, categories(*)')
        .order('published_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data;
    },
    getBySlug: async (slug: string) => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, categories(*)')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data;
    },
  },
  categories: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });
      if (error) throw error;
      return data as Category[];
    },
  },
};