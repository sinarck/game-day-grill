import { authForm } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormHTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { ZodType } from "zod"
import Button from "../button"
import Input from "./input"

interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit: (data: authForm) => Promise<void>
  schema: ZodType<any, any, any>
  apiError?: string | null
  loading: boolean
  heading: string
  buttonText: string
  shake?: number
}

const Form = ({
  onSubmit,
  loading,
  heading,
  schema,
  apiError,
  buttonText,
  shake,
  ...props
}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),
  })

  return (
    <div className="align-middle justify-center items-center flex flex-col bg-gray-100 rounded-xl max-h-80 w-50 p-10 shadow-lg">
      <h1 className="mb-4 font-bold text-lg">{heading}</h1>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        <div className="flex flex-col">
          <Input
            apiError={apiError}
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
