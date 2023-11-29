import { MenuAPIResponse } from "@/types/api"

interface MenuItemProps {
  menuItem: MenuAPIResponse["menu"]["items"][0]
}

const MenuItem = ({ menuItem }: MenuItemProps) => {
  return <div>{menuItem.name}</div>
}

export default MenuItem
