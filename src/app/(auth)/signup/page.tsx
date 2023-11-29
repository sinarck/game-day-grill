"use client"

import Form from "@/components/auth/form"
import { useToast } from "@/components/ui/use-toast"
import useAxios from "@/hooks/useAxios"
import { enrollSchema } from "@/schema/form"
import { FormAPIResponse, authForm } from "@/types/auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
  const { data, errorMessage, loading, fetch } = useAxios<FormAPIResponse>()
  const [shake, setShake] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (data?.status === 409) {
      console.log("error")
    }
    if (data?.status === 201) {
      router.push("/")
      toast({
        title: "Login successfully completed",
        description: "Welcome to the family",
        variant: "default",
      })
    }
  }, [data, router])

  const onSubmit = async ({ username, password }: authForm) => {
    await fetch({
      endpoint: "/api/user",
      body: {
        username: username,
        password: password,
      },
      callbackFunction: signIn("credentials", {
        username: username,
        password: password,
        callbackUrl: "/",
        redirect: false,
      }),
    })
  }

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
