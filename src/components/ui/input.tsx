import { cn } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"
import { InputHTMLAttributes, forwardRef, useState } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const controls = useAnimation()

    return (
      <motion.div className="relative flex flex-col" animate={controls}>
        <motion.label
          className={cn(
            "pointer-events-none absolute mt-3 transition-all duration-200 ease-in",
            "text-gray-500"
          )}
          style={{
            scale: isFocused || hasValue ? 0.75 : 1,
            translateX: isFocused || hasValue ? "-12%" : "0%",
            translateY: isFocused || hasValue ? "-50%" : "0%",
          }}
        >
          {label}
        </motion.label>
        <div className="flex">
          <input
            {...props}
            ref={ref}
            onFocus={() => {
              setIsFocused(true)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              setHasValue(e.target.value !== "")
            }}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            aria-autocomplete="none"
            className={cn(
              "border-b-2 border-gray-300 bg-white pt-5 text-sm outline-none transition-all duration-200 ease-in focus:border-gray-600"
            )}
          />
        </div>
      </motion.div>
    )
  }
)

Input.displayName = "Input"

export { Input }
