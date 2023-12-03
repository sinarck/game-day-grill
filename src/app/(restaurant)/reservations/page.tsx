"use client"

import Button from "@/components/button"
import useAxios from "@/hooks/useAxios"
import { reservationsSchema } from "@/schema/api"
import { ReservationsAPIResponse } from "@/types/api"
import { z } from "zod"

const Page = () => {
  const { data, error, errorMessage, fetch, loading } =
    useAxios<ReservationsAPIResponse>()

  const handleReservation = async () => {
    await fetch<z.infer<typeof reservationsSchema>>({
      endpoint: "/api/reservations",
      body: {
        name: "John Doe",
        date: new Date(),
        restaurantId: 1,
        size: 2,
      },
    })
  }

  return (
    <div>
      <Button
        loading={loading}
        variant="default"
        onClick={() => handleReservation}
      >
        Make a reservation
      </Button>
    </div>
  )
}

export default Page
