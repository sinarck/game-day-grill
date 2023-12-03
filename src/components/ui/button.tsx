import { cn } from "@/lib/merge"
import { VariantProps, cva } from "class-variance-authority"
import { motion } from "framer-motion"
import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading: boolean
  label?: string
  children?: ReactNode
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:bg-black ease-in",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        wide: "h-10 p-2 w-[171px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = ({
  className,
  label,
  children,
  loading,
  size,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <motion.div
      // animate={
      //   shake && shake > 0 ? { x: [-15, 15, -15, 15, -15, 15, 0] } : { x: 0 }
      // }
      transition={{ type: "spring", stiffness: 700, damping: 10 }}
    >
      <button
        {...props}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading}
      >
        {loading && (
          <motion.svg
            className="h-6 w-6"
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
        {label && !loading && <p>{label}</p>}
        {!loading && children}
      </button>
    </motion.div>
  )
}
export default Button
