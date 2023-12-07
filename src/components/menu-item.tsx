import useAxios from "@/hooks/useAxios"
import { useCartStore } from "@/lib/store"
import { MenuAPIResponse, OrderAPIResponse } from "@/types/api"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"

interface MenuItemProps {
  menuItem: NonNullable<MenuAPIResponse["menu"]>["items"][0]
}

const MenuItem = ({ menuItem }: MenuItemProps) => {
  const store = useCartStore()
  const { status } = useSession()
  const { data, error, errorMessage, fetch, loading } =
    useAxios<OrderAPIResponse>()

  // TODO: strongly type the fetch function
  const handleOrder = async (name: string) => {
    store.add(name)

    if (status === "authenticated") {
      await fetch({
        endpoint: "/api/order",
        body: {
          restaurantId: 1,
          menuItemId: menuItem.id,
        },
      })
    }
  }

  return (
    <div className="rounded-md border-[1px] border-neutral-100 shadow-sm">
      <div className="text-lg text-black">{menuItem.name}</div>
      <div>{menuItem.description}</div>
      <div>{menuItem.price}</div>
      <div>{menuItem.category}</div>
      <Button
        variant="default"
        loading={loading}
        onClick={() => {
          handleOrder(menuItem.name)
        }}
      >
        Add to cart
      </Button>
    </div>
  )
}

export default MenuItem
