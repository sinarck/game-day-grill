"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Input from "@/components/form/input"
import { loginSchema } from "@/schema/form"
import { loginForm } from "@/types/auth"
import { useWindowDimensions } from "@/lib/dimensions"
import { useRouter } from "next/navigation"
import { getSession, signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

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
        <h1 className="mb-4 font-bold text-lg">Welcome Back!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Input
              fieldName="username"
              labelName="Username"
              type=""
              placeholderText="Username"
              register={register}
            />
            {errors?.username && <p>{errors.username.message}</p>}
            <Input
              fieldName="password"
              labelName="Password"
              type="password"
              placeholderText="Password"
              register={register}
            />
            {errors?.password && <p>{errors.password.message}</p>}
          </div>
          <div className="pt-5">
            <button
              type="submit"
              className="rounded-lg bg-black text-white p-2 px-11"
            >
              Log In
            </button>
          </div>
        </form>
        <Link href="/signup">
          <p>Or create an account</p>
        </Link>
      </div>
    </div>
  )
}

export default Page
