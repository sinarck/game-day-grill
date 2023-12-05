"use client"

import MenuItem from "@/components/menu-item"
import { Button } from "@/components/ui/button"
import useAxios from "@/hooks/useAxios"
import { menuSchema } from "@/schema/api"
import { MenuAPIResponse } from "@/types/api"
import { z } from "zod"

export const runtime = "edge"

const Page = () => {
  const { data, error, errorMessage, fetch, loading } =
    useAxios<MenuAPIResponse>()

  const getMenu = async () => {
    await fetch<z.infer<typeof menuSchema>>({
      endpoint: "/api/menu",
      body: {
        restaurantId: 1,
      },
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
