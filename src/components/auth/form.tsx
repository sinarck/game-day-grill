import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form"
import Input from "./input"
import { enrollForm } from "@/types/auth"
import Button from "../button"
import { FormHTMLAttributes, forwardRef } from "react"

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  _onsubmit: ({ username, password }: enrollForm) => Promise<void>
  handleSubmit: UseFormHandleSubmit<enrollForm>
  register: UseFormRegister<enrollForm>
  loading: boolean
  heading: string
  buttonText: string
  shake?: number
  errors: FieldErrors<enrollForm>
}

const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      onSubmit,
      handleSubmit,
      register,
      loading,
      heading,
      buttonText,
      shake,
      errors,
      ...props
    },
    ref
  ) => {
    return (
      <div className="align-middle justify-center items-center flex flex-col bg-gray-100 rounded-xl max-h-80 w-50 p-10 shadow-lg">
        <h1 className="mb-4 font-bold text-lg">{heading}</h1>
        <form onSubmit={handleSubmit(props._onsubmit)} {...props} ref={ref}>
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
)
Form.displayName = "Form"
export default Form
