"use client"

import Form from "@/components/auth/form"
import useFetch from "@/hooks/useFetch"
import { enrollSchema } from "@/schema/form"
import { Response, authForm } from "@/types/auth"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Page = () => {
  const { data, error, errorMessage, loading, fetch, status } =
    useFetch<Response>()
  const [shake, setShake] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (data?.status === 409) {
      console.log("error")
    }
    if (data?.status === 201) {
      router.push("/")
    }
  }, [data, router])

  const onSubmit = useCallback(async ({ username, password }: authForm) => {
    await fetch({
      endpoint: "/api/user",
      password: password,
      username: username,
    })
  }, [])

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
