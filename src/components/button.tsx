import { motion } from "framer-motion"
import { ButtonHTMLAttributes, ReactNode } from "react"

const buttonVariants = {
  default:
    "rounded-md bg-gray-900 text-white p-2 w-[171px] flex gap-2 items-center align-middle justify-center outline-none focus:bg-black hover:bg-black transition-all duration-200",
  outline:
    "hover:border-gray-300 rounded-md border-[1px] hover:border-[1px]  text-gray-600 p-2 flex gap-2 items-center align-middle justify-center outline-none transition-all duration-200",
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
        {loading && (
          <motion.svg
            className="h-5 w-5"
            height="24"
            viewBox="0 0 50 50"
            width="24"
            animate={{ rotate: 360, opacity: [0.5, 1] }}
            transition={{
              ease: "linear",
              repeat: Infinity,
              duration: 2,
              opacity: { ease: "easeIn", duration: 0.25 },
            }}
            style={{ originX: "center", originY: "center" }}
          >
            <circle
              className="bg-pink-900 opacity-40"
              cx="25"
              cy="25"
              fill="none"
              r="20"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <motion.circle
              cx="25"
              cy="25"
              fill="none"
              r="20"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              animate={{
                strokeDasharray: ["1, 150", "90, 150", "90, 150"],
                strokeDashoffset: [0, -35, -125],
              }}
              transition={{ ease: "easeInOut", repeat: Infinity, duration: 2 }}
            />
          </motion.svg>
        )}
        {label && <p>{label}</p>}
        {children}
      </button>
    </motion.div>
  )
}
export default Button
