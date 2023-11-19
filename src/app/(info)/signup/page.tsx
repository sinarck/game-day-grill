"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"

import Form from "@/components/form/form"
import { enrollSchema } from "@/schema/form"
import { enrollForm } from "@/types/auth"
import { useRouter } from "next/navigation"

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
    <div className="flex items-center justify-center max-h-screen mt-28">
      <motion.div
        className="align-middle justify-center items-center flex flex-col bg-gray-100 rounded-xl max-h-80 w-50 p-10 shadow-lg"
        // animate={{ y: -100 }}
      >
        <Form
          errors={errors}
          handleSubmit={handleSubmit}
          loading={loading}
          heading="Ready to join the family?"
          onSubmit={onSubmit}
          register={register}
        />
      </motion.div>
    </div>
  )
}

export default Page
