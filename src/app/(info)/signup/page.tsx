"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"

import Input from "@/components/form/input"
import { enrollSchema } from "@/schema/form"
import { enrollForm } from "@/types/auth"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/merge"

const Page = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async ({ username, password }: enrollForm) => {
    setLoading(true)

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

    setLoading(false)

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
  } = useForm<enrollForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(enrollSchema),
  })

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="align-middle justify-center items-center flex flex-col overscroll-none bg-gray-100 rounded-xl max-h-80 w-50 p-10 shadow-lg">
        <h1 className="mb-4 font-bold text-lg">Ready to join the family?</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Input
              fieldName="username"
              labelName="Username"
              type=""
              errors={errors}
              register={register}
            />
            <Input
              fieldName="password"
              labelName="Password"
              type="password"
              errors={errors}
              register={register}
            />
          </div>
          <div className="pt-8">
            <button
              type="submit"
              className={cn(
                "rounded-md bg-black text-white p-2 px-8 flex gap-2 items-center align-middle justify-center ",
                loading && "px-[19px]"
              )}
            >
              {loading && <Icons.spinner />}
              <p>Create Account</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
