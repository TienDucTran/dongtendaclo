import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const supabase = await createClient();
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    // Create response and clear auth cookies
    const response = NextResponse.json({ success: true });
    
    // Clear Supabase auth cookies
    const cookieNames = [
      'sb-access-token',
      'sb-refresh-token',
      'sb-zwrvtqvlffknhadsebxp-auth-token',
    ];
    
    cookieNames.forEach(name => {
      response.cookies.delete(name);
    });
    
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}