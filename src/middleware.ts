import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value }) =>
            supabaseResponse.cookies.set(name, value)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // TODO: Authentication temporarily disabled for development
  // Re-enable by uncommenting the code below and removing the pass-through
  
  // // Check if accessing admin routes
  // const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  // const isAdminLoginRoute = request.nextUrl.pathname === '/admin/login';

  // // If accessing admin route without user, redirect to login
  // if (isAdminRoute && !isAdminLoginRoute && !user) {
  //   const loginUrl = new URL('/admin/login', request.url);
  //   loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // // If accessing login page with valid user, redirect to admin dashboard
  // if (isAdminLoginRoute && user) {
  //   const dashboardUrl = new URL('/admin', request.url);
  //   return NextResponse.redirect(dashboardUrl);
  // }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*'],
};
