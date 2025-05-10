import { NextResponse } from "next/server"
import { getIdFromToken, getRoleFromToken } from "@/lib/auth"
import { prisma } from "@/config/prisma_client"
import { Booking } from "@prisma/client/wasm"
import { encrypt, decrypt} from "@/lib/util"
import { Role } from "@prisma/client";


interface BookingRequest {
  roomName: string
  date: Date
  schedule: number //Bitmap
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization")
  const cookieToken = req.headers.get("cookie")?.match(/auth_token=([^;]+)/)?.[1]

  // Ưu tiên lấy cookie token → nếu không có mới lấy header
  const token = cookieToken || (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null)

  if (!token) {
    return NextResponse.json(
      { success: false, resultCode: 2, message: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = getIdFromToken(token)
  const userRole = getRoleFromToken(token)

  if (!userId) {
    return NextResponse.json(
      { success: false, resultCode: 2, message: "Invalid or expired token" },
      { status: 401 }
    )
  }

  if (userRole !== Role.Lecturer){
    return NextResponse.json(
      { success: false, resultCode: 2, message: "Unauthorized access" },
      { status: 403 }
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
  bookingDate.setUTCDate(bookingDate.getDate())
  bookingDate.setUTCHours(0, 0, 0, 0)
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
    return (parseInt(decrypt(booking.schedule)) & schedule) != 0
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
        schedule: encrypt(String(schedule)),
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
