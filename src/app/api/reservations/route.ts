import { db } from "@/lib/db"
import { reservationsSchema } from "@/schema/api"
import { APIError, ReservationsAPIResponse } from "@/types/api"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: NextRequest) {
  // Supposedly, awaiting a db.$connect() speeds up the connection
  await db.$connect()

  try {
    const body = await request.json()
    const { date, restaurantId, size, name } = reservationsSchema.parse(body)

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
      return NextResponse.json<APIError<ReservationsAPIResponse>>(
        {
          reservations: null,
          message: "Reservation already exists",
        },
        {
          status: 409,
        }
      )
    }

    const reservation = await db.reservations.create({
      data: {
        date: date,
        restaurantId: restaurantId,
        name: name,
        size: size,
      },
    })

    return NextResponse.json<ReservationsAPIResponse>(
      {
        reservations: reservation,
        message: "Reservation created",
      },
      {
        status: 201,
      }
    )
  } catch (e) {
    return NextResponse.json<APIError<ReservationsAPIResponse>>(
      {
        reservations: null,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    )
  }
}
