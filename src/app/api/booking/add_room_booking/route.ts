import { NextResponse } from "next/server"
import { getIdFromToken } from "@/lib/auth"
import { prisma } from "@/config/prisma_client"
import { Booking } from "@prisma/client/wasm"
import { isDate } from "util/types"

interface BookingRequest {
  roomName: string
  date: Date
  schedule: number //Bitmap
}

function generateBitmap(start: number, end: number): number {
  let bitmap = 0
  for (let i = 0; i <= end; i++) {
    if (i >= start){
      bitmap |= 1 << i
    }
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
  const userId = getIdFromToken(token)

  if (!userId) {
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
    typeof roomName !== "string" ||
    typeof schedule !== "number"
  ) {
    return NextResponse.json(
      { success: false, resultCode: 3, message: "Invalid request body" },
      { status: 400 }
    )
  }

  const bookingDate = new Date(date)
  bookingDate.setHours(0, 0, 0, 0)
  const room = await prisma.room.findFirst({where: {
    name: roomName
  }})

  if(!room){
    return NextResponse.json(
      { success: false, resultCode: 1, message: "Room not found" },
      { status: 404 }
    )
  }

  const roomId = room.id 
  const bookeds = await prisma.booking.findMany({
    where: { roomId: roomId, date: bookingDate },
  })

  const conflict = await bookeds.some((booking:Booking)=>{
    return (booking.schedule & schedule) != 0
  })

  if(conflict){
    return NextResponse.json(
      {
        success: false,
        resultCode: 4,
        message: "Conflict with existing booking.",
      },
      { status: 409 }
    )
  }
  try {
    const booking = await prisma.booking.create({
      data: {
        userId: userId,
        roomId: roomId, 
        date: bookingDate,
        schedule: schedule,
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
