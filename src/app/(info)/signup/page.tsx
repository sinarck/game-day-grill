"use client"

import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"

import Input from "@/components/form/input"
import { formSchema } from "@/schema/form"
import { Form } from "@/types/auth"
import { useWindowDimensions } from "@/lib/dimensions"

const SignUp = () => {
  const [isAdvanced, setIsAdvanced] = useState(false)
  const { width } = useWindowDimensions()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit: SubmitHandler<Form> = (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <motion.div
      className="block text-center pt-10"
      animate={isAdvanced && { x: -width }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="inline-block ml-auto mr-auto text"
      >
        <div className="flex flex-col">
          <Input
            fieldName="email"
            labelName="Email"
            type="email"
            placeholderText="john.doe@example.com"
            register={register}
          />
          {errors?.email && <p>{errors.email.message}</p>}
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
        <button
          type="button"
          onClick={() => {
            setIsAdvanced(true)
          }}
          className={isAdvanced ? "hidden" : ""}
        >
          Next
        </button>
      </form>
    </motion.div>
  )
}

export default SignUp
