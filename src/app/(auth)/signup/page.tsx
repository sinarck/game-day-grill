"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import Form from "@/components/auth/form"
import useFetch from "@/hooks/useFetch"
import { enrollSchema } from "@/schema/form"
import { Response, authForm } from "@/types/auth"
import { useRouter } from "next/navigation"

const Page = () => {
  const { data, error, errorMessage, loading, fetch, status } =
    useFetch<Response>()
  const [shake, setShake] = useState(0)
  const router = useRouter()

  const onSubmit = async ({ username, password }: authForm) => {
    await fetch({
      endpoint: "/api/user",
      password: password,
      username: username,
    })
  }

  useEffect(() => {
    if (data?.status === 409) {
      console.log("error")
    }
    if (data?.status === 201) {
      router.push("/")
    }
  }, [data, router])

  useEffect(() => {
    if (error && errorMessage !== null) {
      setShake(shake + 1)
    }
  }, [error, errorMessage])

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Form
        apiError={errorMessage}
        schema={enrollSchema}
        shake={shake}
        loading={loading}
        buttonText="Create Account"
        heading="Ready to join the family?"
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Page
