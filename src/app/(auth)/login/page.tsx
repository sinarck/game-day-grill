"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { loginSchema } from "@/schema/form"
import { loginForm } from "@/types/auth"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Form from "@/components/auth/form"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  const [update, setUpdate] = useState(0)

  const onSubmit = async (values: loginForm) => {
    const loginData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      callbackUrl: "/",
      redirect: false,
    })

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
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <Form
          errors={errors}
          shake={update}
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
      <div className="relative w-1/2 h-full hidden sm:block">
        <Image
          alt="Barbeque Stock image"
          src="/barbeque.jpg"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  )
}

export default Page
