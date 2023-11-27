import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { restaurantId } = body

    console.table(body)

    return NextResponse.json(
      {
        menu: null,
        message: "Menu returned successfully",
      },
      {
        status: 200,
      }
    )
  } catch (e) {
    return NextResponse.json(
      {
        menu: null,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    )
  }
}
