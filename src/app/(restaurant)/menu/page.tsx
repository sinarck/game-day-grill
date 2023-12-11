"use client"

import MenuItem from "@/components/menu-item"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useAxios from "@/hooks/useAxios"
import { menuSchema } from "@/schema/api"
import { MenuAPIResponse } from "@/types/api"
import { useEffect } from "react"
import { z } from "zod"

export const runtime = "edge"

const Page = () => {
  const { data, fetch, loading } = useAxios<MenuAPIResponse>()

  const getMenu = async () => {
    await fetch<z.infer<typeof menuSchema>>({
      endpoint: "/api/menu",
      body: {
        restaurantId: 1,
      },
      method: "POST",
    })
  }

  useEffect(() => {
    getMenu()
  }, [])

  return (
    <div className="min-h-screen gap-3 p-28 pb-0">
      <h1 className="text-center text-2xl font-bold">Menu</h1>
      <Tabs defaultValue="appetizers" className="w-full">
        <div className="flex w-full justify-center">
          <TabsList className="">
            <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
            <TabsTrigger value="else">Everything else</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="appetizers" className="grid grid-cols-2 gap-4">
          {data && (
            <>
              <Separator className="col-span-1" />
              <Separator className="col-start-2 col-end-2" />{" "}
            </>
          )}
          {data &&
            data.data.menu?.items.map(
              (item, i) =>
                item.category === "APPETIZERS" && (
                  <MenuItem key={i} menuItem={item} />
                )
            )}
        </TabsContent>
        <TabsContent value="else" className="grid grid-cols-2 gap-4">
          {data && (
            <>
              <Separator className="col-span-1" />
              <Separator className="col-start-2 col-end-2" />{" "}
            </>
          )}
          {data &&
            data.data.menu?.items.map(
              (item, i) =>
                item.category !== "APPETIZERS" && (
                  <MenuItem key={i} menuItem={item} />
                )
            )}
        </TabsContent>
      </Tabs>
      {!data && (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex h-full flex-col justify-between rounded-md border bg-neutral-100 p-5 shadow-sm"
            >
              <div>
                <div className="flex justify-between">
                  <Skeleton className="mb-2 h-4 w-1/2 bg-neutral-300" />
                  <Skeleton className="mb-2 h-4 w-1/12 bg-neutral-300" />
                </div>
                <Skeleton className="mb-1 h-3 w-3/4 bg-neutral-300" />
                <Skeleton className="h-3 w-1/4 bg-neutral-300" />
              </div>
              <Skeleton className="h-7 w-7 self-end rounded-md bg-neutral-300" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
