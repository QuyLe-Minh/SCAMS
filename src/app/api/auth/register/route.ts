import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/config/prisma_client';

import { encrypt } from '@/lib/util';
// import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { username, email, password, role } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        {success: false, resultCode: 3 , message: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, resultCode: 2 ,message: 'Email already exists' },
        { status: 400 }
      );
    }

    // // Hash the password
    // const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: encrypt(password),
        role,
      },
    });

    // Respond with success
    return NextResponse.json(
      { success: true, resultCode: 0 ,message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({success: false, resultCode: 1 , message: 'Internal server error' }, { status: 500 });
  }
}
