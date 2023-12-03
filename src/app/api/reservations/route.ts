import { db } from "@/lib/db"
import { reservationsSchema } from "@/schema/api"
import { APIError, ReservationsAPIResponse } from "@/types/api"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // Supposedly, awaiting a db.$connect() speeds up the connection
  await db.$connect()

  const body = await request.json()
  const { date, restaurantId, size, name } = reservationsSchema.parse(body)

  try {
    const existingReservation = await db.reservations.findFirst({
      where: {
        restaurantId: restaurantId,
        name: name,
        size: size,
        date: date,
      },
    })

    if (existingReservation) {
      // Gracefully fail if the reservation already exists
      return NextResponse.json<APIError<ReservationsAPIResponse>>({
        reservations: null,
        message: "Reservation already exists",
      })
    }

    const reservation = await db.reservations.create({
      data: {
        date: date,
        restaurantId: restaurantId,
        name: name,
        size: size,
      },
    })

    return NextResponse.json<ReservationsAPIResponse>({
      reservations: reservation,
      message: "Reservation created",
    })
  } catch (e) {
    console.error(e)

    return NextResponse.json<APIError<ReservationsAPIResponse>>({
      reservations: null,
      message: "Something went wrong",
    })
  }
}
