import { Form } from "@/types/auth"
import { UseFormRegister } from "react-hook-form"

interface InputProps {
  fieldName: keyof Form
  labelName?: string
  placeholderText: string
  type: React.HTMLInputTypeAttribute
  register: UseFormRegister<any>
}
import { useState } from "react"
import { cn } from "@/lib/merge"

// ...

const Input = ({
  fieldName,
  labelName,
  type,
  placeholderText,
  register,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    setHasValue(e.target.value !== "")
  }

  return (
    <div className="relative flex flex-col">
      {labelName && (
        <label
          className={`absolute top-0 left-0 transition-all duration-200 pointer-events-none focus:text-xs focus:text-gray-500 focus:mt-2 ${
            isFocused || hasValue
              ? "text-xs text-gray-500 mt-2"
              : "text-base text-black mt-7"
          }`}
        >
          {labelName}
        </label>
      )}
      <input
        type={type}
        {...register(fieldName)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          fontSize: 14,
        }}
        className="border-gray-300 border-b-2 pt-8 outline-none focus:border-gray-600 transition-all duration-200"
      />
    </div>
  )
}

export default Input
