import { db } from "@/lib/db"
import { cartSchema } from "@/schema/api"
import { APIError, CartAPIResponse } from "@/types/api"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: NextRequest) {
  // Supposedly, awaiting a db.$connect() speeds up the connection
  await db.$connect()

  try {
    const body = await request.json()
    const { menuItemId, total, userId } = cartSchema.parse(body)

    const cart = await db.cart.create({
      data: {
        total: total,
        items: {
          connect: {
            id: menuItemId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return NextResponse.json<CartAPIResponse>(
      {
        cart: cart,
        message: "Item added to cart",
      },
      {
        status: 201,
      }
    )
  } catch (e) {
    console.error(e)

    return NextResponse.json<APIError<CartAPIResponse>>(
      {
        cart: null,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    )
  }
}
