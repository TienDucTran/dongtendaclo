import { NextResponse } from 'next/server';
import { checkSupabaseConnection, supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    console.log('[Test Supabase] Checking connection...');
    
    // Check environment variables - show actual URL for debugging
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const envCheck = {
      url: supabaseUrl || 'MISSING',
      urlLength: supabaseUrl?.length || 0,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (len: ' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ')' : 'MISSING',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET (len: ' + process.env.SUPABASE_SERVICE_ROLE_KEY.length + ')' : 'MISSING',
    };
    
    console.log('[Test Supabase] Environment:', envCheck);
    
    // Test fetch to Supabase directly
    let directFetchResult: any = null;
    try {
      const healthUrl = `${supabaseUrl}/rest/v1/`;
      console.log('[Test Supabase] Testing direct fetch to:', healthUrl);
      const fetchResponse = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        }
      });
      directFetchResult = {
        status: fetchResponse.status,
        statusText: fetchResponse.statusText,
        ok: fetchResponse.ok,
      };
      console.log('[Test Supabase] Direct fetch result:', directFetchResult);
    } catch (fetchError: any) {
      directFetchResult = {
        error: fetchError.message,
        cause: fetchError.cause?.message || fetchError.cause?.code || 'unknown',
      };
      console.error('[Test Supabase] Direct fetch error:', directFetchResult);
    }
    
    // Check connection using supabase client
    const connectionResult = await checkSupabaseConnection();
    
    console.log('[Test Supabase] Connection result:', connectionResult);
    
    return NextResponse.json({
      environment: envCheck,
      directFetch: directFetchResult,
      connection: connectionResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Test Supabase] Error:', error);
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
