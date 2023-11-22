"use client"

import Form from "@/components/auth/form"
import { Icons } from "@/components/icons"
import { loginSchema } from "@/schema/form"
import { authForm } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

const Page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(0)

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
      console.log("Login successfully completed")
      router.push("/")
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="flex items-center align-middle justify-center absolute left-4 top-4 md:left-8 md:top-8"
      >
        <div className="items-center align-middle justify-center flex">
          <Icons.ChevronLeft className="h-4 w-4" />
          Back
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center">
        <Form
          schema={loginSchema}
          shake={update}
          heading="Welcome Back!"
          buttonText="Log in"
          loading={loading}
          onSubmit={onSubmit}
        />
        <Link href="/signup" className="underline pt-5">
          <p>Don't have an account?</p>
        </Link>
      </div>
    </div>
  )
}

export default Page
