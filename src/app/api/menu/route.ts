import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  await db.$connect()

  try {
    const body = await request.json()
    const { restaurantId } = body

    const existingMenu = await db.menu.findFirst({
      where: { restaurantId: restaurantId },
      include: { items: true },
      cacheStrategy: { ttl: 60, swr: 60 },
    })

    if (!existingMenu) {
      return NextResponse.json(
        {
          menu: null,
          message: "No menu found for restaurant with id of " + restaurantId,
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json(
      {
        menu: existingMenu,
        message: "Menu returned successfully",
      },
      {
        status: 200,
      }
    )
  } catch (e) {
    console.error(e)

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
