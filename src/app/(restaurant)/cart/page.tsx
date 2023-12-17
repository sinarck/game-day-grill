"use client"

import DeliveryForm from "@/components/cart/delivery-form"
import DetailsForm from "@/components/cart/details-form"
import OrderSummary from "@/components/cart/order-summary"
import { useToast } from "@/components/ui/use-toast"
import useAxios from "@/hooks/useAxios"
import { useCartStore } from "@/lib/store"
import { addToCartSchema, cartFormSchema } from "@/schema/cart"
import { CartAPIResponse } from "@/types/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const Page = () => {
  const session = useSession()
  const { toast } = useToast()
  const { cart, remove } = useCartStore()
  const { data, fetch, loading } = useAxios<CartAPIResponse>()

  const form = useForm<z.infer<typeof cartFormSchema>>({
    resolver: zodResolver(cartFormSchema),
    defaultValues: {
      fullName: "",
      location: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
    },
  })

  function onSubmit(values: z.infer<typeof cartFormSchema>) {
    toast({
      title: "Order submitted!",
      description: "Your order has been submitted successfully.",
    })

    cart.forEach((item) => {
      remove(item)
    })
  }

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

  const subtotal = cart.reduce((sum, a) => sum + a.price, 0)
  const tax = subtotal && (subtotal * 0.0825).toFixed(2)
  const discount =
    session.status === "authenticated"
      ? subtotal && (subtotal * 0.2).toFixed(2)
      : 0
  const total = subtotal && subtotal + +(tax ?? 0) - (Number(discount) || 0)

  return (
    <div className="grid min-h-screen grid-cols-1 items-stretch gap-4 p-4 md:grid-cols-3 md:p-28">
      <div className="space-y-5 md:col-span-2">
        <DetailsForm form={form} onSubmit={onSubmit} />
        <DeliveryForm />
        {/* <PayementForm /> */}
      </div>
      <div className="md:col-end md:col-start-3">
        <OrderSummary
          session={session}
          cart={cart}
          data={data}
          loading={loading}
          subtotal={subtotal}
          tax={tax}
          discount={discount}
          total={total}
        />
      </div>
    </div>
  )
}

export default Page
