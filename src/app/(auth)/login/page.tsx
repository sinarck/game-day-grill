"use client"

import Form from "@/components/auth/form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { authForm, loginSchema } from "@/schema/form"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Page = () => {
  // State management
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

    if (loginData && !loginData?.error) {
      router.back()

      toast({
        title: "Welcome Back",
        description: "Login successfully completed",
        variant: "default",
      })
    } else if (loginData) {
      setError(loginData.error)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Form
          apiError={error}
          schema={loginSchema}
          heading="Welcome Back!"
          buttonText="Log in"
          loading={loading}
          onSubmit={onSubmit}
        />
        <Button loading={false} variant="link">
          <Link href="/signup" className="pt-5">
            <p>Don't have an account?</p>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Page
