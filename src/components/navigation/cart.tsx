import useAxios from "@/hooks/useAxios"
import { useCartStore } from "@/lib/store"
import { CartAPIResponse } from "@/types/api"
import { ShoppingCart } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { z } from "zod"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

const Cart = () => {
  const router = useRouter()
  const { cart } = useCartStore()

  const session = useSession()

  const { data, error, errorMessage, fetch, loading } =
    useAxios<CartAPIResponse>()

  const addToCartSchema = z.object({
    userId: z.number(),
  })

  useEffect(() => {
    const getCart = async () => {
      if (session.status === "authenticated") {
        await fetch<z.infer<typeof addToCartSchema>>({
          endpoint: "/api/cart?userId=" + session.data.user.id,
          body: {
            userId: +session.data.user.id,
          },
          method: "GET",
        })
      }
    }

    getCart()
  }, [fetch, session.data?.user.id, session.status])

  return (
    <Button
      loading={false}
      variant={"ghost"}
      size={"icon"}
      onClick={() => {
        router.push("/cart")
      }}
    >
      <ShoppingCart className="h-8 w-8 cursor-pointer sm:h-6 sm:w-6" />
      {(session.status === "authenticated" && data?.data.cart) ||
      (session.status === "unauthenticated" && cart.length > 0) ? (
        <Badge className="absolute right-2 top-2 h-2 w-2 items-center justify-center p-2 text-center">
          {session.status === "authenticated"
            ? data?.data.cart?.items?.length
            : cart.length}
        </Badge>
      ) : null}
    </Button>
  )
}

export default Cart
