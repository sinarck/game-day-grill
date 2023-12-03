import { authForm } from "@/schema/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormHTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { ZodType } from "zod"
import { Button } from "../ui/button"
import Input from "./input"

interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit: (data: authForm) => Promise<void>
  schema: ZodType<any, any, any>
  apiError?: string | null
  loading: boolean
  heading: string
  buttonText: string
}

const Form = ({
  onSubmit,
  loading,
  heading,
  schema,
  apiError,
  buttonText,
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
    <div className="w-50 flex max-h-80 flex-col items-center justify-center rounded-xl bg-gray-100 p-10 align-middle shadow-lg">
      <h1 className="mb-4 text-lg font-bold">{heading}</h1>
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
          <Button variant="default" size="wide" loading={loading} type="submit">
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  )
}
export default Form
