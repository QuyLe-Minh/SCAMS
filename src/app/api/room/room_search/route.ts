import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/config/prisma_client"

export async function GET(req: NextRequest) {
    
  const { searchParams } = new URL(req.url)

  const buildingId = searchParams.get("buildingId")
  const floor = searchParams.get("floor")
  const capacity = searchParams.get("capacity")

  if (buildingId === null && floor === null && capacity === null) {
    return NextResponse.json(
      { error: "At least one search parameter must be provided." },
      { status: 400 }
    )
  }

  try {
    const filters: any[] = []

    if (buildingId !== null) filters.push({ buildingId: Number(buildingId) })
    if (floor !== null) filters.push({ floor: Number(floor) })
    if (capacity !== null) filters.push({ capacity: { gte: Number(capacity) } })

    const rooms = await prisma.room.findMany({
      where: {
        AND: filters.length > 0 ? filters : undefined,
      },
    })

    return NextResponse.json({ rooms })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
