import { prisma } from '@/config/prisma_client';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import 'dotenv/config';
import {
  getEmailFromToken,
  getIdFromToken,
  getRoleFromToken,
  getUsernameFromToken,
} from "@/lib/auth";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_NAME = 'auth_token';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const existingToken = req.cookies.get(COOKIE_NAME)?.value; // Extract the value of the cookie

    if (existingToken) {
      const decodedToken = jwt.verify(existingToken, JWT_SECRET); // Pass the string value to jwt.verify
    
      // Check if the token belongs to the same user
      const { email: tokenEmail } = decodedToken as { email: string };
      const { usernameOrEmail, password } = await req.json();
    
      if (tokenEmail !== usernameOrEmail) {
        // Invalidate the existing token and allow login with a new account
        const response = NextResponse.json({ success: false, resultCode: 5, message: 'Different account detected' });
        response.cookies.set(COOKIE_NAME, '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 0, // Expire immediately
        });
        return response;
      }
    
      return NextResponse.json({ success: false, resultCode: 4, message: 'Already logged in' }, { status: 403 });
    }

    const { usernameOrEmail, password } = await req.json();

    if (!usernameOrEmail || !password) {
      return NextResponse.json({ success: false, resultCode: 3, message: 'Username/Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail },
        ],
      },
    });

    if (!user || password != user.password) {
      return NextResponse.json({ success: false, resultCode: 2, message: 'Invalid username or password' }, { status: 401 });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '6h' }
    );

    const response = NextResponse.json({ username: user.username, role: user.role, token: token, success: true, resultCode: 0, message: 'Login successful' });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 6, // 6 hours
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ success: false, resultCode: 1, message: 'Internal server error' }, { status: 500 });
  }
}
