import { cn } from "@/lib/merge"
import { Icons } from "../icons"
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react"
import { Transition } from "@headlessui/react"
import { motion } from "framer-motion"
import { cva } from "class-variance-authority"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean
  label?: string
  shake?: number
  children?: ReactNode
}

const buttonVariants = cva(
  "p-2 w-[171px] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all disabled:pointer-events-none disabled:opacity-50 duration-200",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white focus:bg-black hover:bg-black ease-in",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
  }
)
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, shake, label, children, loading, ...props }, ref) => {
    return (
      <motion.div
        animate={
          shake && shake > 0 ? { x: [-15, 15, -15, 15, -15, 15, 0] } : { x: 0 }
        }
        transition={{ type: "spring", stiffness: 700, damping: 10 }}
      >
        <button className={""} {...props} ref={ref}>
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
)
export default Button
