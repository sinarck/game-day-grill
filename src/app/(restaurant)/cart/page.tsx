"use client"

import { Button } from "@/components/ui/button"
import useAxios from "@/hooks/useAxios"
import { useCartStore } from "@/lib/store"
import { CartAPIResponse } from "@/types/api"
import { MenuItem } from "@prisma/client"
import { useSession } from "next-auth/react"
import { z } from "zod"

const Page = () => {
  const session = useSession()
  const { cart, add, remove } = useCartStore()
  const { data, error, errorMessage, fetch, loading } =
    useAxios<CartAPIResponse>()

  const addToCartSchema = z.object({
    userId: z.number(),
  })

  const getCart = async () => {
    if (session.data) {
      await fetch<z.infer<typeof addToCartSchema>>({
        endpoint: "/api/cart?userId=" + session.data.user.id,
        body: {
          userId: +session.data.user.id,
        },
        method: "GET",
      })
    }
  }

  if (session.status === "authenticated") {
    return (
      <div className="">
        <p>User is logged in as {session.data.user.username}</p>
        <Button loading={loading} onClick={getCart}>
          Get Cart
        </Button>
        {data?.data.cart?.items?.map((item) => <p>{item.name}</p>)}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-lg font-bold tracking-wide ">
        {cart.length === 0 ? "Cart is empty" : "Cart has the following items:"}
      </h1>
      <div className="flex">
        {cart.map((item: MenuItem) => (
          <div key={item.id}>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.price}</div>
            <div>{item.category}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
