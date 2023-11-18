"use client"

import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"

import Input from "@/components/form/input"
import { formSchema } from "@/schema/form"
import { Form } from "@/types/auth"
import { useWindowDimensions } from "@/lib/dimensions"
import { useRouter } from "next/navigation"
import Image from "next/image"

const SignUp = () => {
  const [isAdvanced, setIsAdvanced] = useState(false)
  const { height, width } = useWindowDimensions()
  const router = useRouter()

  const onSubmit: SubmitHandler<Form> = async ({
    username,
    password,
  }: Form) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })

    if (response.ok) {
      router.push("/")
    } else {
      console.error("Registration failed")
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  })

  return (
    <motion.div
      className="flex justify-center pt-10 h-screen"
      animate={isAdvanced && { x: -width }}
    >
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
        <form onSubmit={handleSubmit(onSubmit)} className="inline-block text">
          <div className="flex flex-col">
            <Input
              fieldName="username"
              labelName="Username"
              type=""
              placeholderText="john.doe@example.com"
              register={register}
            />
            {errors?.username && <p>{errors.username.message}</p>}
            <Input
              fieldName="password"
              labelName="Password"
              type="password"
              placeholderText="John Doe"
              register={register}
            />
            {errors?.password && <p>{errors.password.message}</p>}
            <Input
              fieldName="confirmPassword"
              labelName="Confirm Password"
              type="password"
              placeholderText="John Doe"
              register={register}
            />
            {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="rounded bg-black text-white p-2">
            Create Account
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default SignUp
