"use client"

import Form from "@/components/auth/form"
import { loginSchema } from "@/schema/form"
import { loginForm } from "@/types/auth"
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

  const onSubmit = async (values: loginForm) => {
    setLoading(true)
    const loginData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      callbackUrl: "/",
      redirect: true,
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
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <Form
          errors={errors}
          shake={update}
          handleSubmit={handleSubmit}
          heading="Welcome Back!"
          buttonText="Log in"
          loading={loading}
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
