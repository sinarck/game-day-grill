import { enrollForm } from "@/types/auth"
import { AnimatePresence, motion } from "framer-motion"
import { EyeIcon, EyeOffIcon, LucideIcon } from "lucide-react"
import { FieldErrors, UseFormRegister } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldName: keyof enrollForm
  labelName?: string
  errors: FieldErrors<enrollForm>
  register: UseFormRegister<any>
}

import { cn } from "@/lib/merge"
import { InputHTMLAttributes, forwardRef, useState } from "react"

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ fieldName, labelName, errors, register, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)
    const [inputType, setInputType] =
      useState<React.HTMLInputTypeAttribute>("password")
    const [iconType, setIconType] = useState<LucideIcon>(EyeOffIcon)

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = (e) => {
      setIsFocused(false)
      setHasValue(e.target.value !== "")
    }

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
              "absolute top-0 left-0 ease-in transition-all duration-200 pointer-events-none focus:text-xs focus:text-gray-500 focus:mt-2",
              isFocused || hasValue
                ? "text-xs text-gray-500 mt-4"
                : "text-base text-black mt-7"
            )}
          >
            {labelName}
          </label>
        )}
        <div className="flex">
          <input
            // {...props}
            type={props.type === "password" ? inputType : "text"}
            {...register(fieldName)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              fontSize: 14,
            }}
            className={cn(
              "bg-gray-100 border-gray-300 border-b-2 pt-8 outline-none ease-in transition-all duration-200",
              errors?.[fieldName] && "border-red-300",
              errors?.[fieldName] && isFocused && "border-red-600",
              !errors?.[fieldName] && "focus:border-gray-600"
            )}
          />
          {fieldName === "password" && (
            <span className="flex justify-around items-center">
              {iconType === EyeOffIcon ? (
                <EyeOffIcon
                  className="mt-7 absolute mr-4 cursor-pointer"
                  size={18}
                  onClick={handleVisibility}
                />
              ) : (
                <EyeIcon
                  className="mt-7 absolute mr-4 cursor-pointer"
                  size={18}
                  onClick={handleVisibility}
                />
              )}
            </span>
          )}
        </div>
        <AnimatePresence>
          {errors?.[fieldName] && (
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.2 }}
              className="w-full"
            >
              <p className="text-[10px] text-red-600">
                {errors?.[fieldName]?.message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
export default Input
