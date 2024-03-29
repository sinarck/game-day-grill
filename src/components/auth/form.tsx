import { authForm } from "@/schema/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { SignInResponse } from "next-auth/react"
import { FormHTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { ZodType } from "zod"
import { Button } from "../ui/button"
import Input from "./input"

interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit: (data: authForm) => Promise<void>
  schema: ZodType<any, any, any>
  apiError?: SignInResponse | null
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

  console.log(apiError)

  return (
    <div className="w-50 flex max-h-80 flex-col items-center justify-center rounded-xl bg-gray-100 p-10 align-middle shadow-lg">
      <h1 className="mb-4 text-lg font-bold">{heading}</h1>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        <div className="flex flex-col">
          <Input
            apiError={
              apiError && ("" + apiError.error).length > 25 ? null : apiError
            }
            fieldName="username"
            labelName="Username"
            type="text"
            errors={errors}
            register={register}
          />
          <Input
            apiError={apiError}
            fieldName="password"
            labelName="Password"
            type="password"
            errors={errors}
            register={register}
          />
        </div>
        <div className="pt-3">
          <AnimatePresence>
            {apiError && (
              <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.2 }}
                className="w-full text-center"
              >
                <p className="w-full pb-2 text-center text-[10px] text-red-400">
                  {apiError.error === "CredentialsSignin" &&
                    "Username or password is incorrect"}
                  {("" + apiError.error).length > 25
                    ? "Something went wrong"
                    : String(apiError).replace("[object Object]", "")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <Button variant="default" size="wide" loading={loading} type="submit">
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  )
}
export default Form
