import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { verifyToken, getIdFromToken } from '@/lib/auth';
import { decrypt } from '@/lib/util';

const prisma = new PrismaClient();
const COOKIE_NAME = 'auth_token';

// GET method handler for listing bookings
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const tokenFromCookie = req.cookies.get(COOKIE_NAME)?.value;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, resultCode: 401, message: 'No token provided' }, { status: 401 });
    }
    const token = tokenFromCookie; // Bearer Key

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { success: false, resultCode: 401, message: 'No token provided' },
        { status: 401 }
      );
    }

    let userId = getIdFromToken(token);

    if (!userId) {
      return NextResponse.json({ success: false, resultCode: 401, message: 'Invalid signature' }, { status: 401 });
    }

    // Fetch all bookings
    const bookings = await prisma.booking.findMany({
      include: {
        room: true,
      },
    });

    // Decrypt and process bookings
    const decryptedBookings = bookings.map((booking) => ({
      ...booking,
      schedule: parseInt(decrypt(booking.schedule)),
    }));

    // Count the number of bookings for the user from the token
    const userBookingsCount = decryptedBookings.filter((booking) => booking.userId === userId).length;

    return NextResponse.json({
      success: true,
      resultCode: 200,
      message: 'Booking list retrieved',
      data: {
        userId,
        userBookingsCount,
        allBookings: decryptedBookings,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, resultCode: 500, message: 'Server error' }, { status: 500 });
  }
}