import useAxios from "@/hooks/useAxios"
import { useCartStore } from "@/lib/store"
import { OrderAPIResponse } from "@/types/api"
import { MenuItem } from "@prisma/client"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"

interface MenuItemProps {
  menuItem: MenuItem
}

const MenuItem = ({ menuItem }: MenuItemProps) => {
  const store = useCartStore()
  const { status, data } = useSession()
  const { fetch, loading } = useAxios<OrderAPIResponse>()

  // TODO: strongly type the fetch function
  const handleOrder = async (menuItem: MenuItemProps["menuItem"]) => {
    if (status === "authenticated") {
      await fetch({
        endpoint: "/api/cart",
        body: {
          restaurantId: 1,
          menuItemId: menuItem.id,
          total: menuItem.price,
          userId: data?.user.id,
        },
      })
    } else {
      store.add(menuItem)
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
          handleOrder(menuItem)
        }}
      >
        Add to cart
      </Button>
    </div>
  )
}

export default MenuItem
