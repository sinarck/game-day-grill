import useAxios from "@/hooks/useAxios"
import { useCartStore } from "@/lib/store"
import { OrderAPIResponse } from "@/types/api"
import { MenuItem } from "@prisma/client"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"

interface MenuItemProps {
  menuItem: MenuItem
}

const MenuItem = ({ menuItem }: MenuItemProps) => {
  const store = useCartStore()
  const { status, data } = useSession()
  let { fetch, loading } = useAxios<OrderAPIResponse>()

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
        method: "POST",
      })
    } else {
      store.add(menuItem)
    }
  }

  return (
    <div className="flex h-full flex-col justify-between rounded-md border bg-neutral-100 p-5 shadow-sm">
      <div>
        <div className="flex justify-between">
          <div className="text-md font-bold">{menuItem.name}</div>
          <p>${menuItem.price}</p>
        </div>
        <div className="text-sm text-gray-500">{menuItem.description}</div>
      </div>
      <Button
        variant="default"
        loading={loading}
        onClick={() => {
          handleOrder(menuItem)
        }}
        size="icon"
        className="h-7 w-7 self-end"
      >
        <Plus className="h-3 w-3 justify-end" />
      </Button>
    </div>
  )
}

export default MenuItem
