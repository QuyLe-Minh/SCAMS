import { NextResponse } from "next/server"
import { getIdFromToken, verifyToken } from "@/lib/auth" 
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
  const userId = getIdFromToken(token)

  if (!userId) {
    NextResponse.json(
      {
        success: false,
        resultCode: 2,
        message: "Invalid or expired token",
      },
      { status: 401 }
    )
  }

  try{
    const bookings = await prisma.booking.findMany({
        where: {
          userId: userId
        },
        select: {
          roomId: true,
          date: true,
          schedule: true,
        },
        orderBy: [
          {roomId: `asc`},
          {date: 'asc'},
      ],
    });
    return NextResponse.json({
      success: true,
      resultCode: 0,
      message: "All bookings retrieved successfully",
      data: bookings,
    })
  }catch(error){
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
