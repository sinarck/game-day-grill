import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import React from "react"

const Page = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <p>User can order food here</p>
    </div>
  )
}

export default Page
