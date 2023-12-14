import { db } from "@/lib/db"
import { cartSchema } from "@/schema/api"
import {
  APIError,
  AuthAPIResponse,
  CartAPIResponse,
  MenuAPIResponse,
} from "@/types/api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Supposedly, awaiting a db.$connect() speeds up the connection
  await db.$connect()

  try {
    const url = new URL(request.url)
    const userIdParam = url.searchParams.get("userId")
    const userId = userIdParam ? +userIdParam : null

    if (userId === null) {
      return NextResponse.json<APIError<CartAPIResponse>>(
        {
          cart: null,
          message: "User ID is required",
        },
        {
          status: 400,
        }
      )
    }

    const cart = await db.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        items: true,
        user: true,
      },
    })

    if (!cart) {
      return NextResponse.json<APIError<CartAPIResponse>>({
        cart: null,
        message: "Cart for user with id `" + userId + "` not found",
      })
    }

    return NextResponse.json<CartAPIResponse>(
      {
        cart: cart,
        message: "Cart items successfully retrieved",
      },
      {
        status: 200,
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

export async function POST(request: NextRequest) {
  // Supposedly, awaiting a db.$connect() speeds up the connection
  await db.$connect()

  try {
    const body = await request.json()
    const { menuItemId, total, userId } = cartSchema.parse(body)

    // Check if the user id is valid exists
    const user = await db.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      return NextResponse.json<APIError<AuthAPIResponse>>(
        {
          user: null,
          message: "User with ID `" + userId + "` not found",
        },
        {
          status: 404,
        }
      )
    }

    // Check if the menuItem exists
    const menuItem = await db.menuItem.findUnique({
      where: { id: menuItemId },
    })
    if (!menuItem) {
      return NextResponse.json<APIError<MenuAPIResponse>>(
        {
          menu: null,
          message: "Menu item with ID `" + menuItemId + "`not found",
        },
        {
          status: 404,
        }
      )
    }

    const cartExists = await db.cart.findFirst({
      where: {
        userId: userId,
      },
    })

    if (cartExists) {
      const cart = await db.cart.update({
        where: {
          userId: userId,
        },
        data: {
          items: {
            connect: {
              id: menuItemId,
            },
          },
        },
      })

      return NextResponse.json<CartAPIResponse>(
        {
          cart: cart,
          message: "Item added to cart for user with ID `" + userId + "`",
        },
        {
          status: 201,
        }
      )
    } else {
      const cart = await db.cart.create({
        data: {
          items: {
            connect: {
              id: menuItemId,
            },
          },
          total: total,
          user: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          user: true, // Include the user in the response
        },
      })
      return NextResponse.json<CartAPIResponse>(
        {
          cart: cart,
          message:
            "Cart wasn't found for user with ID `" +
            userId +
            "`, cart created with items",
        },
        {
          status: 201,
        }
      )
    }
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
