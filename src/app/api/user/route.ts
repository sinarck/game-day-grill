import { db } from "@/lib/db"
import { userSchema } from "@/schema/auth"
import { Response } from "@/types/auth"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = userSchema.parse(body)

    // check for duplicate usernames
    const existingUsername = await db.user.findUnique({
      where: { username: username },
    })

    if (existingUsername) {
      return NextResponse.json<Response>(
        {
          user: null,
          message: "Username is already taken",
        },
        {
          status: 409,
        }
      )
    }

    // hash password
    const hashedPassword = await hash(password, 10)

    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })

    // remove password from response
    const { password: _, ...user } = newUser

    return NextResponse.json<Response>(
      {
        user: user,
        message: "User created successfully",
      },
      {
        status: 201,
      }
    )
  } catch (e) {
    return NextResponse.json(
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
