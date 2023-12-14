import { db } from "@/lib/db"
import { enrollSchema } from "@/schema/form"
import { APIError, AuthAPIResponse } from "@/types/api"
import { hash } from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  await db.$connect()

  try {
    const body = await request.json()
    const { username, password } = enrollSchema.parse(body)

    // check for duplicate usernames
    const existingUsername = await db.user.findUnique({
      where: { username: username },
    })

    if (existingUsername) {
      return NextResponse.json<AuthAPIResponse>(
        {
          user: null,
          message: "Username is already taken",
        },
        {
          status: 409,
        }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })

    // Remove password from response
    const { password: _, ...user } = newUser

    return NextResponse.json<AuthAPIResponse>(
      {
        user: user,
        message: "User created successfully",
      },
      {
        status: 201,
      }
    )
  } catch (e) {
    console.error(e)

    return NextResponse.json<APIError<AuthAPIResponse>>(
      {
        user: null,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    )
  }
}
