import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { verifyToken, getIdFromToken} from '@/lib/auth';
import { decrypt } from '@/lib/util';

const prisma = new PrismaClient();

// GET method handler for listing bookings
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, resultCode: 401, message: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Bearer Key
    let userId = getIdFromToken(token)
    if (!userId){
      return NextResponse.json({ success: false, resultCode: 401, message: 'Invalid signature' }, { status: 401 });
    }

    // console.log('Decoded Token:', decodedToken);
    // console.log('Decoded Token:', decodedToken.userId);
    // const user = await prisma.user.findUnique({ where: { id: decodedToken.userId } });
    // console.log("User exists?", user);

    const bookings = await prisma.booking.findMany({
      where: { userId: userId },
      include: {
        room: true,
      },
    });

    const decryptedBookings = bookings.map((booking) => {return {...booking, schedule: parseInt(decrypt(booking.schedule))}})

    return NextResponse.json({ success: true, resultCode: 200, message: 'Booking list retrieved', data: decryptedBookings });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, resultCode: 500, message: 'Server error' }, { status: 500 });
  }
}
