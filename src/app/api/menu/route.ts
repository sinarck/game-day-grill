import { db } from "@/lib/db"
import { menuSchema } from "@/schema/api"
import { APIError, MenuAPIResponse } from "@/types/api"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: NextRequest) {
  await db.$connect()

  try {
    const body = await request.json()
    const { restaurantId } = menuSchema.parse(body)

    const existingMenu = await db.menu.findFirst({
      where: { restaurantId: restaurantId },
      include: { items: true },
      cacheStrategy: { ttl: 60, swr: 60 },
    })

    if (!existingMenu) {
      return NextResponse.json<MenuAPIResponse>(
        {
          menu: null,
          message: "No menu found for restaurant with id of " + restaurantId,
        },
        {
          status: 404,
        }
      )
    }

    // TODO: Fully type out tihs response
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
    return NextResponse.json<APIError<MenuAPIResponse>>(
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
