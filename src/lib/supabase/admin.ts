import { createClient } from '@supabase/supabase-js';

// Admin client - dùng cho API routes
// Ưu tiên service_role key, fallback về anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Log warning nếu key đang dùng là anon key chứ không phải service_role
const isServiceRole = supabaseKey !== process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!isServiceRole) {
  console.warn(
    '[Supabase] Using ANON key - RLS policies required! ' +
    'Add NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY with actual service_role key from Supabase dashboard.'
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Helper để kiểm tra kết nối
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabaseAdmin.from('training_programs').select('id', { count: 'exact', head: true });
    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return { connected: true, tablesExist: false, error: null };
      }
      return { connected: false, tablesExist: false, error: error.message };
    }
    return { connected: true, tablesExist: true, error: null };
  } catch (err: any) {
    return { connected: false, tablesExist: false, error: err.message };
  }
}