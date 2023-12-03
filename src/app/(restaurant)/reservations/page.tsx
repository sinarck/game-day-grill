"use client"

import Button from "@/components/button"
import { useToast } from "@/components/ui/use-toast"
import useAxios from "@/hooks/useAxios"
import { reservationsSchema } from "@/schema/api"
import { ReservationsAPIResponse } from "@/types/api"
import { useEffect } from "react"
import { z } from "zod"

const Page = () => {
  const { data, error, errorMessage, fetch, loading } =
    useAxios<ReservationsAPIResponse>()

  const { toast } = useToast()

  useEffect(() => {
    if (data) {
      toast({
        title: "Reservation made for " + data?.data.reservations?.name,
        description:
          "Party of " +
          data?.data.reservations?.size +
          " on  " +
          new Date(String(data?.data.reservations?.date)).toLocaleDateString() +
          " at " +
          new Date(String(data?.data.reservations?.date)).toLocaleTimeString(),
      })
    }
  }, [data])

  const handleReservation = async () => {
    await fetch<z.infer<typeof reservationsSchema>>({
      endpoint: "/api/reservations",
      body: {
        name: "John Doe",
        date: new Date(),
        restaurantId: 1,
        size: 3,
      },
    })
  }

  return (
    <div>
      <Button
        loading={loading}
        variant="default"
        onClick={() => handleReservation()}
      >
        Make a reservation
      </Button>
    </div>
  )
}

export default Page
