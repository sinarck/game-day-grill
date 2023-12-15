import { cn } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"
import { EyeIcon, EyeOffIcon, LucideIcon } from "lucide-react"
import { SignInResponse } from "next-auth/react"
import { InputHTMLAttributes, useEffect, useState } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps<T extends FieldValues = FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "register"> {
  fieldName: keyof T
  labelName?: string
  apiError?: SignInResponse | null
  errors: FieldErrors<T>
  register: UseFormRegister<any>
}

const Input = <K extends FieldValues>({
  fieldName,
  labelName,
  apiError,
  errors,
  register,
  ...props
}: InputProps<K>) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const [inputType, setInputType] =
    useState<React.HTMLInputTypeAttribute>("password")
  const [iconType, setIconType] = useState<LucideIcon>(EyeOffIcon)
  const [shake, setShake] = useState(false)

  const controls = useAnimation()

  useEffect(() => {
    if (apiError) {
      controls.start({
        x: [0, -15, 15, -15, 15, 0],
        y: [0, 0, 0, 0, 0, 0],
        transition: { duration: 0.5, stiffness: 100, damping: 10 },
      })
    } else {
      controls.start({
        x: 0,
        y: 0,
        transition: { duration: 0.5 },
      })
    }
  }, [apiError, controls])

  const handleVisibility = () => {
    if (props.type === "password") {
      setInputType("text")
      setIconType(EyeIcon)
    }

    if (inputType === "text") {
      setInputType("password")
      setIconType(EyeOffIcon)
    }
  }

  return (
    <motion.div className="relative flex flex-col" animate={controls}>
      {labelName && (
        <label
          className={cn(
            "pointer-events-none absolute left-0 top-0 transition-all duration-200 ease-in focus:mt-2 focus:text-xs focus:text-gray-500",
            isFocused || hasValue
              ? "mt-4 text-xs text-gray-500"
              : "mt-7 text-base text-black",
            apiError && "text-red-400"
          )}
        >
          {labelName}
        </label>
      )}
      <div className="flex">
        <input
          {...props}
          type={props.type === "password" ? inputType : "text"}
          {...register(
            String(fieldName),
            (props.type === "number" && { valueAsNumber: true }) || {}
          )}
          onFocus={() => {
            setIsFocused(true)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            setHasValue(e.target.value !== "")
          }}
          style={{
            fontSize: 14,
          }}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          aria-autocomplete="none"
          className={cn(
            "border-b-2 border-gray-300 bg-gray-100 pt-8 outline-none transition-all duration-200 ease-in",
            (errors?.[fieldName] || apiError) && "border-red-300",
            (errors?.[fieldName] || apiError) && isFocused && "border-red-600",
            !(errors?.[fieldName] ?? apiError) && "focus:border-gray-600"
          )}
        />
        {fieldName === "password" && (
          <span className="flex items-center justify-around">
            {iconType === EyeOffIcon ? (
              <EyeOffIcon
                className="absolute mr-4 mt-7 cursor-pointer"
                size={18}
                onClick={handleVisibility}
              />
            ) : (
              <EyeIcon
                className="absolute mr-4 mt-7 cursor-pointer"
                size={18}
                onClick={handleVisibility}
              />
            )}
          </span>
        )}
      </div>
    </motion.div>
  )
}
export default Input
