import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db"
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null
          }

          const user = await db.user.findUnique({
            where: { username: credentials?.username },
          })
          if (!user) {
            return null
          }

          const validPassword = await compare(
            credentials.password,
            user.password
          )

          if (!validPassword) {
            return null
          }

          return {
            id: `${user.id}`,
            username: user.username,
          }
        } catch (error) {
          console.error(error)
          return null
        }
      },
    }),
  ],
}
