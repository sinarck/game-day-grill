import { db } from "@/lib/db"
import { enrollSchema } from "@/schema/form"
import { FormAPIResponse } from "@/types/api"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = enrollSchema.parse(body)

    // check for duplicate usernames
    const existingUsername = await db.user.findUnique({
      where: { username: username },
      cacheStrategy: { ttl: 60, swr: 60 },
    })

    if (existingUsername) {
      return NextResponse.json<FormAPIResponse>(
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

    return NextResponse.json<FormAPIResponse>(
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

    return NextResponse.json<FormAPIResponse>(
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
