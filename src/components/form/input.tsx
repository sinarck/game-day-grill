import { Form } from "@/types/auth"
import { UseFormRegister } from "react-hook-form"

interface InputProps {
  fieldName: keyof Form
  labelName: string
  placeholderText: string
  type: React.HTMLInputTypeAttribute
  register: UseFormRegister<any>
}

const Input = ({
  fieldName,
  labelName,
  type,
  placeholderText,
  register,
}: InputProps) => {
  return (
    <>
      <label className="text-left text-base font-bold text-gray-800 pb-1">
        {labelName}
      </label>
      <input
        type={type}
        {...register(fieldName)}
        placeholder={placeholderText}
        style={{
          fontSize: 14,
        }}
        className="border-2 rounded border-gray-300 p-2"
      />
    </>
  )
}

export default Input
