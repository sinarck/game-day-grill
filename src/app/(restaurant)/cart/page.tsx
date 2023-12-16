"use client"

import CartItem from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import useAxios from "@/hooks/useAxios"
import { useCartStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { CartAPIResponse } from "@/types/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const Page = () => {
  const session = useSession()
  const { cart } = useCartStore()
  const { data, fetch, loading } = useAxios<CartAPIResponse>()

  const addToCartSchema = z.object({
    userId: z.number(),
  })
  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  )
  const cartFormSchema = z.object({
    name: z.string().min(1, "Name is required").max(25, "Name is too long"),
    location: z.string().min(1, "Location is required"),
    phone: z.string().regex(phoneRegex, "Invalid phone number"),
  })

  const form = useForm<z.infer<typeof cartFormSchema>>({
    resolver: zodResolver(cartFormSchema),
    defaultValues: {
      name: "",
      location: "",
      phone: "",
    },
  })

  function onSubmit(values: z.infer<typeof cartFormSchema>) {
    console.log(values)
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

  const subtotal = data
    ? data?.data.cart?.items?.reduce((sum, a) => sum + a.price, 0)
    : cart.reduce((sum, a) => sum + a.price, 0)
  const tax = subtotal && (subtotal * 0.0825).toFixed(2)
  const discount =
    session.status === "authenticated"
      ? subtotal && (subtotal * 0.2).toFixed(2)
      : 0
  const total =
    subtotal && subtotal + Number(tax || 0) - (Number(discount) || 0)

  return (
    <div className="grid min-h-screen grid-cols-3 gap-4 p-28">
      <div className="col-span-2">
        <h2 className="inline-block whitespace-nowrap pb-5 text-lg font-semibold tracking-wide">
          Details
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="details"
            className="w-full rounded-md border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/3">
                    <FormLabel className="hidden">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        label="Full Name"
                        className="w-full rounded border p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/3">
                    <FormLabel className="hidden">Location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        label="Location"
                        className="w-full rounded border p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/3">
                    <FormLabel className="hidden">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        label="Phone Number"
                        className="w-full rounded border p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
      <div className="col-end col-start-3">
        <div className="flex justify-between">
          <h2 className="col-start-3 col-end-3 inline-block whitespace-nowrap pb-5 text-lg font-semibold tracking-wide">
            Order Summary
          </h2>
          <p>Progress</p>
        </div>
        <div className="rounded-md border bg-white shadow-sm">
          {(session.status === "loading" || loading) && <div>Loading...</div>}
          {session.status === "authenticated" && data?.data.cart?.items && (
            <div className="p-5">
              {countDuplicates(data.data.cart.items).map((item, idx) => (
                <>
                  <CartItem
                    key={(item.id, idx)}
                    item={item}
                    quantity={item.quantity}
                  />
                  <div
                    className={cn(
                      "px-4",
                      (data?.data.cart?.items?.length ?? 0) - 1 == idx
                        ? "pt-5"
                        : "py-5"
                    )}
                  >
                    <Separator className="h-[2px]" />
                  </div>
                </>
              ))}
            </div>
          )}
          {session.status === "unauthenticated" && cart.length > 0 && (
            <div className="p-5">
              {countDuplicates(cart).map((item, idx) => (
                <>
                  <CartItem
                    key={(item.id, idx)}
                    item={item}
                    quantity={item.quantity}
                  />
                  <div
                    className={cn(
                      "px-4",
                      (cart.length ?? 0) - 1 == idx ? "pt-5" : "py-5"
                    )}
                  >
                    <Separator className="h-[2px]" />
                  </div>
                </>
              ))}
            </div>
          )}
          {(session.status === "unauthenticated" && cart.length === 0) ||
          (session.status === "authenticated" &&
            data?.data.cart?.items?.length === 0) ? (
            <div>Cart is empty</div>
          ) : null}
          {(session.status === "unauthenticated" && cart.length > 0) ||
          (session.status === "authenticated" &&
            (data?.data.cart?.items?.length ?? 0) > 0) ? (
            <div className="px-5">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <p>Subtotal</p>
                  <p>${subtotal?.toFixed(2)}</p>
                </div>
                <div
                  className={cn(
                    "flex justify-between text-sm text-gray-500",
                    discount === 0 ? "hidden" : ""
                  )}
                >
                  <p>Discount</p>
                  <p>${discount}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <p>Tax</p>
                  <p>${tax}</p>
                </div>
              </div>
              <div className="px-4 py-5">
                <Separator className="y-5 h-[2px]" />
              </div>

              <div className="flex justify-between">
                <p className="text-md font-semibold">Total</p>
                <p className="text-md font-semibold">${total}</p>
              </div>
            </div>
          ) : null}
          <div className="p-5">
            <Button
              loading={false}
              size="wide"
              className="w-full"
              form="details"
              type="submit"
            >
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
