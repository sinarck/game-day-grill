import { db } from "@/lib/db"
import { orderSchema } from "@/schema/api"
import { APIError, OrderAPIResponse } from "@/types/api"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // This route will be remain unimplemented until a cart system is put in place
  // Supposedly, awaiting a db.$connect() speeds up the connection
  await db.$connect()

  const body = await request.json()
  const { orderId, restaurantId } = orderSchema.parse(body)

  try {
  } catch (e) {
    console.error(e)

    return NextResponse.json<APIError<OrderAPIResponse>>({
      order: null,
      message: "Something went wrong",
    })
  }
}
