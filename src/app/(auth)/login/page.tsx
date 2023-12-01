"use client"

import Form from "@/components/auth/form"
import { useToast } from "@/components/ui/use-toast"
import { authForm, loginSchema } from "@/schema/form"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Page = () => {
  // State management
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(0)

  // Hooks
  const router = useRouter()
  const { toast } = useToast()

  const onSubmit = async (values: authForm) => {
    setLoading(true)
    const loginData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      callbackUrl: "/",
      redirect: false,
    })

    setLoading(false)

    if (loginData?.error) {
      console.error("error occured:", loginData.error)
      setUpdate(update + 1)
    } else {
      toast({
        title: "Welcome Back",
        description: "Login successfully completed",
        variant: "default",
      })
      router.back()
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Form
          schema={loginSchema}
          shake={update}
          heading="Welcome Back!"
          buttonText="Log in"
          loading={loading}
          onSubmit={onSubmit}
        />
        <Link href="/signup" className="pt-5 underline">
          <p>Don't have an account?</p>
        </Link>
      </div>
    </div>
  )
}

export default Page
