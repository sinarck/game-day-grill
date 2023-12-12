"use client"

import Input from "@/components/auth/input"
import CartItem from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import useAxios from "@/hooks/useAxios"
import { useCartStore } from "@/lib/store"
import { detailsSchema } from "@/schema/payment"
import { CartAPIResponse } from "@/types/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const Page = () => {
  const session = useSession()
  const { cart, add, remove } = useCartStore()
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
  }, [session.status, fetch, session.data?.user.id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof detailsSchema>>({
    defaultValues: {
      fullName: "",
      location: "",
      email: "",
    },
    resolver: zodResolver(detailsSchema),
  })

  const countDuplicates = (items) => {
    const count = items.reduce((acc, item) => {
      acc[item.id] = (acc[item.id] || 0) + 1
      return acc
    }, {})

    return items
      .filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      )
      .map((item) => ({ ...item, quantity: count[item.id] }))
  }

  return (
    <div className="grid min-h-screen grid-cols-3 gap-4 p-28">
      <div className="col-span-2">
        <h2 className="inline-block whitespace-nowrap pb-5 text-lg font-semibold tracking-wide">
          Details
        </h2>
        <form className="border p-5">
          <div className="flex gap-4">
            <Input
              labelName="Full Name"
              fieldName="fullName"
              errors={errors}
              register={register}
              className="w-1/3"
            />
            <Input
              labelName="Location"
              fieldName="location"
              errors={errors}
              register={register}
              className="w-1/3"
            />
            <Input
              labelName="Email"
              fieldName="email"
              errors={errors}
              register={register}
              className="w-1/3"
            />
          </div>
        </form>
      </div>
      <div className="col-end col-start-3">
        <h2 className="col-start-3 col-end-3 inline-block whitespace-nowrap pb-5 text-lg font-semibold tracking-wide">
          Order Summary
        </h2>
        <div className="rounded-md bg-neutral-50 shadow-sm">
          {(session.status === "loading" || loading) && <div>Loading...</div>}
          {session.status === "authenticated" && data?.data.cart?.items && (
            <div>
              {countDuplicates(data?.data.cart?.items).map((item) => (
                <CartItem key={item.id} item={item} quantity={item.quantity} />
              ))}
            </div>
          )}
          {session.status === "unauthenticated" && cart.length > 0 && (
            <div>
              {countDuplicates(cart).map((item, idx) => (
                <div className="p-5" key={(item.id, idx)}>
                  <CartItem
                    key={(item.id, idx)}
                    item={item}
                    quantity={item.quantity}
                  />
                  {idx !== countDuplicates(cart).length - 1 && (
                    <Separator className="h-px" />
                  )}
                </div>
              ))}
            </div>
          )}
          {(session.status === "unauthenticated" && cart.length === 0) ||
            (session.status === "authenticated" &&
              data?.data.cart?.items?.length === 0 && <div>Cart is empty</div>)}
          <div className="p-5">
            <Button loading={false} size="wide" className="w-full">
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
