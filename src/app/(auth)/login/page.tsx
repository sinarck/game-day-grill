"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import Form from "@/components/form/Form"
import { authOptions } from "@/lib/auth"
import { loginSchema } from "@/schema/form"
import { loginForm } from "@/types/auth"
import { getServerSession } from "next-auth"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Page = () => {
  const onLogin = async () => {
    const session = await getServerSession(authOptions)
  }

  const router = useRouter()

  const onSubmit = async (values: loginForm) => {
    const loginData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      callbackUrl: "/",
      redirect: false,
    })

    if (loginData?.error) {
      console.error(loginData.error)
    } else {
      console.log("SUCCESSFUL SIGNIN!!!")
      // onLogin()
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
          className="object-cover sm:block hidden"
          fill
          priority
        />
      </div>

      <div className="flex flex-col items-center sm:w-1/2 w-full">
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
