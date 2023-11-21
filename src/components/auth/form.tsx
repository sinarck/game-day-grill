import { enrollForm } from "@/types/auth"
import { FormHTMLAttributes } from "react"
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form"
import Button from "../button"
import Input from "./input"

interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit: (data: enrollForm) => Promise<void>
  handleSubmit: UseFormHandleSubmit<enrollForm>
  register: UseFormRegister<enrollForm>
  loading: boolean
  heading: string
  buttonText: string
  shake?: number
  errors: FieldErrors<enrollForm>
}

const Form = ({
  onSubmit,
  handleSubmit,
  register,
  loading,
  heading,
  buttonText,
  shake,
  errors,
  ...props
}: FormProps) => {
  return (
    <div className="align-middle justify-center items-center flex flex-col bg-gray-100 rounded-xl max-h-80 w-50 p-10 shadow-lg">
      <h1 className="mb-4 font-bold text-lg">{heading}</h1>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        <div className="flex flex-col">
          <Input
            fieldName="username"
            labelName="Username"
            type="text"
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
          <Button
            variant="default"
            key={shake}
            loading={loading}
            label={buttonText}
            type="submit"
            shake={shake}
          />
        </div>
      </form>
    </div>
  )
}
export default Form
