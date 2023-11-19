import { cn } from "@/lib/merge"
import { Icons } from "../icons"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps {
  loading: boolean
  label: string
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

const Button = ({ loading, label, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "rounded-md bg-black text-white p-2 px-8 flex gap-2 items-center align-middle justify-center outline-none focus:bg-gray-800 hover:bg-gray-800 ease-in transition-colors duration-200",
        loading && "px-[19px]"
      )}
    >
      {loading && <Icons.Spinner />}
      <p>{label}</p>
    </button>
  )
}

export default Button
