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
  const dateParam = searchParams.get("date")

  if (!roomIdParam) {
    return NextResponse.json(
      {
        success: false,
        resultCode: 1,
        message: "Missing roomId parameter.",
      },
      { status: 400 } 
    )
  }

  const roomId = parseInt(roomIdParam)

  try {

    const whereClause: any = {
      roomId: roomId,
    }

 
    if (dateParam && dateParam.includes(",")) {
      const dateArray = dateParam.split(",")

      if (dateArray.length >= 2) {
        const startDate = new Date(dateArray[0])
        const endDate = new Date(dateArray[dateArray.length - 1])

   
        whereClause.date = {
          gte: startDate,
          lte: endDate,
        }
      }
    } else if (dateParam) {
   
      whereClause.date = new Date(dateParam)
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      select: {
        id: true,
        userId: true,
        date: true,
        schedule: true,
      },
      orderBy: [{ date: "asc" }],
    })

    return NextResponse.json({
      success: true,
      resultCode: 0,
      message: "Bookings retrieved successfully",
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
