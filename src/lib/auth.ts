import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db"

export const authOptions: NextAuthOptions = {
  // The following line causes errors with Prisma Accelerate
  // Ignore it for now, there is no fix
  // @ts-ignore
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
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: { username: credentials?.username },
          cacheStrategy: { ttl: 60, swr: 60 },
        })
        if (!user) {
          return null
        }

        const validPassword = await compare(credentials.password, user.password)

        if (!validPassword) {
          return null
        }

        return {
          id: `${user.id}`,
          username: user.username,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
        }
      }
      return token
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      }
    },
  },
}
