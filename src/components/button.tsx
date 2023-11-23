import { Transition } from "@headlessui/react"
import { motion } from "framer-motion"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { Icons } from "./icons"
import { cn } from "@/lib/merge"

const buttonVariants = {
  default:
    "rounded-md bg-gray-900 text-white p-2 w-[171px] flex gap-2 items-center align-middle justify-center outline-none focus:bg-black hover:bg-black transition-all duration-200",
  secondary:
    "rounded-md bg-gray-300 text-gray-600 hover:bg-gray-400 p-2 flex gap-2 items-center align-middle justify-center outline-none transition-all duration-200",
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean
  label?: string
  shake?: number
  children?: ReactNode
  variant: keyof typeof buttonVariants
}

const Button = ({
  className,
  shake,
  label,
  children,
  loading,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <motion.div
      animate={
        shake && shake > 0 ? { x: [-15, 15, -15, 15, -15, 15, 0] } : { x: 0 }
      }
      transition={{ type: "spring", stiffness: 700, damping: 10 }}
    >
      <button {...props} className={buttonVariants[variant]}>
        <Transition
          show={loading}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Icons.Spinner />
        </Transition>
        {label && <p>{label}</p>}
        {children}
      </button>
    </motion.div>
  )
}
export default Button
