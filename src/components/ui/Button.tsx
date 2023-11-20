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
        "rounded-md bg-gray-900 text-white p-2 w-[171px] flex gap-2 items-center align-middle justify-center outline-none focus:bg-black hover:bg-black ease-in transition-all duration-200"
      )}
    >
      {loading && <Icons.Spinner />}
      <p>{label}</p>
    </button>
  )
}

export default Button
