import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const Page = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <p>User's cart is here</p>
    </div>
  )
}

export default Page
