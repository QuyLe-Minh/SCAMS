import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth" 
import { prisma } from "@/config/prisma_client"

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")
  console.log(authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      {
        success: false,
        resultCode: 2,
        message: "Unauthorized",
      },
      { status: 401 }
    )
  }


  const token = authHeader.split(" ")[1]
  const decoded = verifyToken(token)

  if (!decoded) {
    return NextResponse.json(
      {
        success: false,
        resultCode: 2,
        message: "Invalid or expired token",
      },
      { status: 401 }
    )
  }

 
  const { searchParams } = new URL(req.url)
  const roomIdParam = searchParams.get("roomId")
  const roomId = roomIdParam ? parseInt(roomIdParam) : -1

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        roomId: roomId,
      },
      select: {
        id:true,
        userId:true,
        date:true,
        schedule:true
      },
      orderBy: [
        {date: 'asc'},
    ],
    })

    return NextResponse.json({
      success: true,
      resultCode: 0,
      message: roomId
        ? "Room bookings retrieved successfully"
        : "All bookings retrieved successfully",
      data: bookings,
    })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      {
        success: false,
        resultCode: 1,
        message: "Failed to fetch bookings",
      },
      { status: 500 }
    )
  }
}
