import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// GET method handler for listing bookings
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, resultCode: 401, message: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Bearer Key
    let decodedToken: any;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return NextResponse.json({ success: false, resultCode: 401, message: 'Invalid signature' }, { status: 401 });
    }
    // console.log('Decoded Token:', decodedToken);
    // console.log('Decoded Token:', decodedToken.userId);
    // const user = await prisma.user.findUnique({ where: { id: decodedToken.userId } });
    // console.log("User exists?", user);

    const bookings = await prisma.booking.findMany({
      //where: { userId: decodedToken.userId },
      include: {
        room: true,
      },
    });

    return NextResponse.json({ success: true, resultCode: 200, message: 'Booking list retrieved', data: bookings });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, resultCode: 500, message: 'Server error' }, { status: 500 });
  }
}
