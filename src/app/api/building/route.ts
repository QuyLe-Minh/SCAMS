import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/config/prisma_client"
import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'auth_token';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const token = req.cookies.get(COOKIE_NAME)?.value;

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
  if (!token) {
    return NextResponse.json(
      {
        success: false,
        resultCode: 2,
        message: "Unauthorized",
      },
      { status: 401 }
    )
  }
  const decoded = jwt.verify(token, JWT_SECRET);

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
        include:{
          rooms: true,
        }
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
