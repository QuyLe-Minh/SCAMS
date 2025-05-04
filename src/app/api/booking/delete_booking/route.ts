import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const COOKIE_NAME = 'auth_token';

export async function DELETE(req: NextRequest) {
  try {
    // const authHeader = req.headers.get('authorization');
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return NextResponse.json({ success: false, resultCode: 401, message: 'No token provided' }, { status: 401 });
    // }

    const tokenFromCookie = req.cookies.get(COOKIE_NAME)?.value;

    if (!tokenFromCookie) {
      return NextResponse.json(
        { success: false, resultCode: 401, message: 'No token provided' },
        { status: 401 }
      );
    }

    const token = tokenFromCookie; //authHeader.split(' ')[1]; // Bearer Key


    let decodedToken: any;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return NextResponse.json({ success: false, resultCode: 401, message: 'Invalid signature' }, { status: 401 });
    }

    const { bookingId } = await req.json(); // Expecting bookingId from the request body

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ success: false, resultCode: 404, message: 'Booking not found' }, { status: 404 });
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    return NextResponse.json({ success: true, resultCode: 200, message: 'Booking deleted successfully' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, resultCode: 500, message: 'Server error' }, { status: 500 });
  }
}
