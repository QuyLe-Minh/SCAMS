import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { prisma } from "@/config/prisma_client"
import { Booking } from "@prisma/client"

interface BookingRequest {
  roomName: string
  date: string
  schedule: [number, number]
}

function generateBitmap(start: number, end: number): number {
  let bitmap = 0
  for (let i = start; i <= end; i++) {
    bitmap |= 1 << i
  }
  return bitmap
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, resultCode: 2, message: "Unauthorized" },
      { status: 401 }
    )
  }

  const token = authHeader.split(" ")[1]
  const decoded = verifyToken(token)

  if (!decoded) {
    return NextResponse.json(
      { success: false, resultCode: 2, message: "Invalid or expired token" },
      { status: 401 }
    )
  }

  let body: BookingRequest
  try {
    body = await req.json()
  } catch (error) {
    return NextResponse.json(
      { success: false, resultCode: 3, message: "Invalid request body" },
      { status: 400 }
    )
  }

  const { roomName, date, schedule } = body

  if (
    typeof roomName !== "string" || // Changed from number to string
    !Array.isArray(schedule) ||
    schedule.length !== 2 ||
    typeof schedule[0] !== "number" ||
    typeof schedule[1] !== "number"
  ) {
    return NextResponse.json(
      { success: false, resultCode: 3, message: "Invalid request body" },
      { status: 400 }
    )
  }

  try {
    const bookingDate = new Date(date)
    const room = await prisma.room.findFirst({
      where: {
        name: roomName,
      },
    })

    if (!room) {
      return NextResponse.json(
        { success: false, resultCode: 1, message: "Room not found" },
        { status: 404 }
      )
    }

    const bookeds = await prisma.booking.findMany({
      where: {
        roomId: room.id,
        date: bookingDate,
      },
    })

    const bitmap = generateBitmap(schedule[0], schedule[1])

    const conflict = bookeds.some((booking: Booking) => {
      return (booking.schedule & bitmap) !== 0
    })

    if (conflict) {
      return NextResponse.json(
        {
          success: false,
          resultCode: 4,
          message: "Room is already booked",
        },
        { status: 409 }
      )
    }

    const booking = await prisma.booking.create({
      data: {
        userId: decoded.id,
        roomId: room.id,
        date: bookingDate,
        schedule: bitmap,
      },
    })

    return NextResponse.json({
      success: true,
      resultCode: 0,
      message: "Booking created successfully",
      data: booking,
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json(
      { success: false, resultCode: 1, message: "Failed to create booking" },
      { status: 500 }
    )
  }
}
