import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth" 
import { prisma } from "@/config/prisma_client"
import build from "next/dist/build"

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
  const paramPageNumber = searchParams.get("pageNumber")
  const paramPageSize = searchParams.get("pageSize")
 
  try {
    const queryOptions: any = {};
    if (paramPageNumber && paramPageSize) {
        const pageNumber = paramPageNumber ? parseInt(paramPageNumber) : -1
        const pageSize = paramPageSize ? parseInt(paramPageSize) : -1
        const skip = (pageNumber - 1) * pageSize;
        queryOptions.skip = skip;
        queryOptions.take = pageSize;
    }
    
    const buildings = await prisma.building.findMany({
        ...queryOptions,
        orderBy: {
            id: "asc",
        },
    });

    return NextResponse.json({
      success: true,
      resultCode: 0,
      message: `Retrieved ${buildings.length} building(s) sucessfully.`,
      data: buildings,
    })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      {
        success: false,
        resultCode: 1,
        message: "Failed to fetch buildings",
      },
      { status: 500 }
    )
  }
}
