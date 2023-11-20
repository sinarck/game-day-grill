"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

import Form from "@/components/form/form"
import useFetch from "@/hooks/useFetch"
import { enrollSchema } from "@/schema/form"
import { Response, enrollForm } from "@/types/auth"
import { useRouter } from "next/navigation"

const Page = () => {
  const { data, error, errorMessage, loading, fetch } = useFetch<Response>()
  const router = useRouter()

  const onSubmit = async ({ username, password }: enrollForm) => {
    await fetch({
      endpoint: "/api/user",
      password: password,
      username: username,
    })
  }

  useEffect(() => {
    if (data?.status === 201) {
      router.push("/")
    }
  }, [data])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<enrollForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(enrollSchema),
  })

  return (
    <div className="flex items-center justify-center max-h-screen mt-28">
      <Form
        errors={errors}
        handleSubmit={handleSubmit}
        loading={loading}
        buttonText="Create Account"
        heading="Ready to join the family?"
        onSubmit={onSubmit}
        register={register}
      />
    </div>
  )
}

export default Page
