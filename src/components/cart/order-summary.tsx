import CartItem, { CartItems } from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CartItem as ItemFromCart } from "@/lib/store"
import { cn, countDuplicates } from "@/lib/utils"
import { CartAPIResponse } from "@/types/api"
import { AxiosResponse } from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import EmptyCartImage from "../../../public/cart.jpg"
import { Skeleton } from "../ui/skeleton"
import { useToast } from "../ui/use-toast"

interface OrderSummaryProps {
  session: typeof useSession extends (...args: any) => infer R ? R : never
  cart: ItemFromCart[]
  data: AxiosResponse<CartAPIResponse, any> | null
  loading: boolean
  subtotal: number | undefined
  tax: string | 0 | undefined
  discount: string | 0 | undefined
  total: number | undefined
}

const OrderSummary = ({
  cart,
  data,
  discount,
  loading,
  session,
  subtotal,
  tax,
  total,
}: OrderSummaryProps) => {
  const { toast } = useToast()

  // Conditionals for simplified rendering
  const isLoading = session.status === "loading" || loading
  const authCart = session.status === "authenticated" && cart.length > 0
  const unauthCart = session.status === "unauthenticated" && cart.length > 0
  const emptyCart =
    (session.status === "unauthenticated" && cart.length === 0) ||
    (session.status === "authenticated" && cart.length === 0)
  const cartExists = authCart || unauthCart

  return (
    <>
      <div className="flex justify-between">
        <h2 className="col-start-3 col-end-3 inline-block whitespace-nowrap pb-5 text-lg font-semibold tracking-wide">
          Order Summary
        </h2>
        <p>Progress</p>
      </div>
      <div className="rounded-md border bg-white shadow-sm">
        {isLoading &&
          [...Array(3)].map((_, idx) => (
            <div key={idx} className="flex flex-col items-end p-5 align-middle">
              <div className="w-full">
                <div className="flex justify-between pb-1">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-5 w-1/6" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="shadow-ms-px ml-2 mt-2 flex h-8 w-1/4 items-center justify-evenly rounded-md p-2 align-middle" />
            </div>
          ))}
        {/* {authCart && (
          <div className="p-5">
            {countDuplicates(cart).map((item: CartItems, idx: number) => (
              <div>
                <CartItem
                  key={(item.id, idx)}
                  item={item}
                  quantity={item.quantity}
                />
                <div
                  className={cn(
                    "px-4",
                    countDuplicates(cart).length - 1 !== idx ? "py-5" : "pt-5"
                  )}
                >
                  <Separator className="h-[2px]" />
                </div>
              </div>
            ))}
          </div>
        )} */}
        {cartExists && (
          <div className="p-5">
            {countDuplicates(cart).map((item: CartItems, idx: number) => (
              <>
                <CartItem
                  key={(item.id, idx)}
                  item={item}
                  quantity={item.quantity}
                />
                <div
                  className={cn(
                    "px-4",
                    countDuplicates(cart).length - 1 !== idx ? "py-5" : "pt-5"
                  )}
                >
                  <Separator className="h-[2px]" />
                </div>
              </>
            ))}
          </div>
        )}
        {emptyCart && (
          <div>
            <div className="container relative w-10/12 p-5">
              <Image
                alt="Empty cart"
                draggable={false}
                src={EmptyCartImage}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <Link href="/menu">
                <p className="text-center tracking-wider hover:underline">
                  Your cart is empty :&#40;
                </p>
              </Link>
            </div>
          </div>
        )}
        {cartExists && (
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
              <p className="text-md font-semibold">${total?.toFixed(2)}</p>
            </div>
          </div>
        )}

        {cartExists && (
          <div className="p-5">
            <Button
              loading={false}
              size="wide"
              className="w-full"
              form="details"
              type="submit"
            >
              Submit Order
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default OrderSummary
