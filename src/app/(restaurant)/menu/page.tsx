"use client"

import Button from "@/components/button"
import MenuItem from "@/components/menu-item"
import useAxios from "@/hooks/useAxios"
import { MenuAPIResponse } from "@/types/api"

const Page = () => {
  const { data, error, errorMessage, fetch, loading } =
    useAxios<MenuAPIResponse>()

  const getMenu = async () => {
    await fetch({
      endpoint: "/api/menu",
      body: JSON.stringify({
        restaurantId: 1,
      }),
    })
  }

  return (
    <>
      <p>Here is my example page with example menu fetching:</p>
      <Button
        onClick={() => {
          getMenu()
        }}
        loading={loading}
        variant="default"
      >
        Click here to test
      </Button>
      <div className="flex gap-3">
        {data &&
          data.data.menu?.items.map((item, i) => (
            <MenuItem key={i} menuItem={item} />
          ))}
      </div>
    </>
  )
}

export default Page
