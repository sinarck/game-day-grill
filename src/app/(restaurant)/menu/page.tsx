"use client"

import MenuItem from "@/components/menu-item"
import useAxios from "@/hooks/useAxios"
import { MenuAPIResponse } from "@/types/api"

const Page = () => {
  const { data, error, errorMessage, fetch, loading } =
    useAxios<MenuAPIResponse>()

  return (
    <>
      <p>Here is my example page with example menu fetching:</p>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={async () => {
          await fetch({
            endpoint: "/api/menu",
            body: JSON.stringify({
              restaurantId: 1,
            }),
          })
        }}
      >
        Click here to test
      </button>
      {data &&
        data.data.menu.items.map((item, i) => (
          <MenuItem key={i} menuItem={item} />
        ))}
    </>
  )
}

export default Page
