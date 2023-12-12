"use client"

import Form from "@/components/auth/form"
import { useToast } from "@/components/ui/use-toast"
import useAxios from "@/hooks/useAxios"
import { authForm, enrollSchema, loginSchema } from "@/schema/form"
import { AuthAPIResponse } from "@/types/api"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { z } from "zod"

const Page = () => {
  const { data, errorMessage, loading, fetch } = useAxios<AuthAPIResponse>()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (data?.status === 201) {
      router.push("/")
      toast({
        title: "Login successfully completed",
        description: "Welcome to the family",
        variant: "default",
      })
    }
  }, [data, router, toast])

  const onSubmit = async ({ username, password }: authForm) => {
    await fetch<z.infer<typeof loginSchema>>({
      endpoint: "/api/user",
      body: {
        username: username,
        password: password,
      },
      method: "POST",
    })
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Form
        apiError={errorMessage}
        schema={enrollSchema}
        loading={loading}
        buttonText="Create Account"
        heading="Ready to join the family?"
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Page
