"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import Form from "@/components/form/Form"
import { useWindowDimensions } from "@/lib/dimensions"
import { loginSchema } from "@/schema/form"
import { loginForm } from "@/types/auth"
import { getSession, signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Page = () => {
  const [isAdvanced, setIsAdvanced] = useState(false)
  const { height, width } = useWindowDimensions()
  const router = useRouter()

  const onSubmit = async (values: loginForm) => {
    const loginData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      callbackUrl: "/",
      redirect: false,
    })
    const session = await getSession()
    if (!session) {
      console.error("Sign in failed")
    }

    if (loginData?.error) {
      console.error(loginData.error)
    } else {
      router.push("/")
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })

  return (
    <div className="flex justify-center pt-10 h-screen items-center align-middle">
      {/* attribution to macrovector on FreePik (will be added in footer later) */}
      <div className="relative w-1/2 h-full">
        <Image
          alt="Barbeque Stock image"
          src="/barbeque.jpg"
          className="object-cover"
          fill
          priority
        />
      </div>

      <div className="flex flex-col items-center w-1/2">
        <Form
          errors={errors}
          handleSubmit={handleSubmit}
          heading="Welcome Back!"
          buttonText="Log in"
          loading={false}
          onSubmit={onSubmit}
          register={register}
        />
        <Link href="/signup">
          <p>Or create an account</p>
        </Link>
      </div>
    </div>
  )
}

export default Page
