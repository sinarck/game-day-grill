import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form"
import Input from "./input"
import { enrollForm } from "@/types/auth"
import Button from "../ui/Button"

interface FormProps {
  onSubmit: ({ username, password }: enrollForm) => Promise<void>
  handleSubmit: UseFormHandleSubmit<enrollForm>
  register: UseFormRegister<enrollForm>
  loading: boolean
  heading: string
  errors: FieldErrors<enrollForm>
}

const Form = ({
  onSubmit,
  handleSubmit,
  register,
  loading,
  heading,
  errors,
}: FormProps) => {
  return (
    <>
      <h1 className="mb-4 font-bold text-lg">{heading}</h1>
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
          <Button loading={loading} label="Create Account" type="submit" />
        </div>
      </form>
    </>
  )
}

export default Form
