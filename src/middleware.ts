import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './constants';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const isPublicPage =
    req.nextUrl.pathname === PUBLIC_ROUTES.LOGIN ||
    req.nextUrl.pathname === PUBLIC_ROUTES.REGISTRATION;

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTES.LOGIN, req.url));
  }

  if (token && isPublicPage) {
    return NextResponse.redirect(new URL(PRIVATE_ROUTES.CHATS, req.url));
  }

  if (req.nextUrl.pathname === PRIVATE_ROUTES.VERIFICATION && token?.isVerified) {
    return NextResponse.redirect(new URL(PRIVATE_ROUTES.CHATS, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/register', '/verification', '/profile/:path*', '/chats/:path*', '/users/:path*'],
};
