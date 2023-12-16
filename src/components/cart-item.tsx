import { useCartStore } from "@/lib/store"
import { CartAPIResponse } from "@/types/api"
import { Button } from "./ui/button"

export type CartItems = NonNullable<
  NonNullable<CartAPIResponse["cart"]>["items"]
>[0]

interface CartItemProps {
  item: CartItems
  quantity: number
}

const CartItem = ({ item, quantity }: CartItemProps) => {
  const { add, remove } = useCartStore()

  return (
    <div className="flex flex-col items-end align-middle">
      <div className="w-full">
        <div className="flex justify-between pb-1">
          <p className="whitespace-nowrap font-semibold">{item.name}</p>
          <p className="font-semibold">${item.price}</p>
        </div>
        <p className="text-xs text-gray-400">{item.description}</p>
      </div>
      <div className="shadow-ms-px ml-2 flex h-1/4 items-center justify-evenly rounded-md border p-2 align-middle">
        <Button
          loading={false}
          variant="ghost"
          className="p-1"
          onClick={() => remove(item)}
          size="tiny"
        >
          -
        </Button>
        <p>{quantity < 9 ? "0" + quantity : quantity}</p>
        <Button
          loading={false}
          variant="ghost"
          onClick={() => add(item)}
          size="tiny"
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default CartItem
