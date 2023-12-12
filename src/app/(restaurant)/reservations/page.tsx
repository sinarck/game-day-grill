"use client"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/components/ui/use-toast"
import useAxios from "@/hooks/useAxios"
import { useForm } from "react-hook-form"

import Input from "@/components/auth/input"
import { reservationsSchema } from "@/schema/api"
import { ReservationsAPIResponse } from "@/types/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { z } from "zod"

const Page = () => {
  const [date, setDate] = useState<Date | null>(null)
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
  }, [data, toast])

  const onSubmit = async ({
    name,
    restaurantId,
    size,
  }: Omit<z.infer<typeof reservationsSchema>, "date">) => {
    // Check if date is not null to make typescript happy
    if (date) {
      await fetch<z.infer<typeof reservationsSchema>>({
        endpoint: "/api/reservations",
        body: {
          name: name,
          date: date,
          restaurantId: restaurantId,
          size: size,
        },
        method: "POST",
      })
    }
  }

  const handleDateChange = (date: Date) => {
    setDate(date)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<z.infer<typeof reservationsSchema>, "date">>({
    defaultValues: {
      restaurantId: undefined,
      name: "",
      size: undefined,
    },
    resolver: zodResolver(reservationsSchema.omit({ date: true })),
  })

  // TODO: migrate to Form component and use it here
  // TODO: make Form component generic
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container flex w-96 flex-col items-center justify-center rounded-xl bg-gray-100 p-10 align-middle shadow-lg"
    >
      <Input<z.infer<typeof reservationsSchema>>
        fieldName="name"
        labelName="Name"
        register={register}
        errors={errors}
      />
      <Input<z.infer<typeof reservationsSchema>>
        type="number"
        fieldName="restaurantId"
        labelName="Restaurant ID"
        register={register}
        errors={errors}
      />
      <Input<z.infer<typeof reservationsSchema>>
        type="number"
        fieldName="size"
        labelName="Party Size"
        register={register}
        errors={errors}
      />
      <DatePicker onDateChange={handleDateChange} />
      <Button loading={loading} variant="default" size="lg" type="submit">
        Make a reservation
      </Button>
    </form>
  )
}

export default Page
