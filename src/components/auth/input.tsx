import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon, LucideIcon } from "lucide-react"
import { InputHTMLAttributes, useState } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps<T extends FieldValues = FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "register"> {
  fieldName: keyof T
  labelName?: string
  apiError?: string | null
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
    <div className="relative flex flex-col">
      {labelName && (
        <label
          className={cn(
            "pointer-events-none absolute left-0 top-0 transition-all duration-200 ease-in focus:mt-2 focus:text-xs focus:text-gray-500",
            isFocused || hasValue
              ? "mt-4 text-xs text-gray-500"
              : "mt-7 text-base text-black"
          )}
        >
          {labelName}
        </label>
      )}
      <div className="flex">
        <input
          {...props}
          type={props.type === "password" ? inputType : "text"}
          {...register(String(fieldName))}
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
          autoComplete="off"
          autoCorrect="off"
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
    </div>
  )
}
export default Input
