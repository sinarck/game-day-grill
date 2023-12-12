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
    <div className="flex items-center justify-between align-middle">
      <div>
        <p className="text-bold">{item.name}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
        <p>{item.price}</p>
      </div>
      <div className="shadow-ms-px flex h-1/4 items-center justify-evenly border p-1 align-middle">
        <Button
          loading={false}
          variant="ghost"
          onClick={() => remove(item)}
          size="icon"
        >
          -
        </Button>
        <p>{quantity < 9 ? "0" + quantity : quantity}</p>
        <Button
          loading={false}
          variant="ghost"
          onClick={() => add(item)}
          size="icon"
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default CartItem
