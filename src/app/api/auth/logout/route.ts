import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'auth_token';

export async function GET(req: NextRequest) {
  const response = NextResponse.json({success: true, resultCode: 0, message: 'Logged out successfully' });

  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: 0, // Expire the cookie
  });

  return response;
}
