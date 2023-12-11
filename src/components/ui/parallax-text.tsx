import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion"
import { useRef } from "react"

interface ParallaxProps {
  text: string
  baseVelocity: number
}

export const ParallaxText = ({ text, baseVelocity = 100 }: ParallaxProps) => {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 750)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="m-0 flex flex-nowrap overflow-hidden whitespace-nowrap leading-3 tracking-wide">
      <motion.div
        className="flex flex-nowrap whitespace-nowrap text-5xl font-semibold uppercase"
        style={{ x }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <span
          className="mr-4 block"
          style={{
            WebkitTextFillColor: "transparent",
            WebkitTextStrokeColor: "black",
            WebkitTextStrokeWidth: "1px",
          }}
        >
          {text}
        </span>
        <span
          className="mr-4 block"
          style={{
            WebkitTextFillColor: "transparent",
            WebkitTextStrokeColor: "black",
            WebkitTextStrokeWidth: "1px",
          }}
        >
          {text}
        </span>
        <span
          className="mr-4 block"
          style={{
            WebkitTextFillColor: "transparent",
            WebkitTextStrokeColor: "black",
            WebkitTextStrokeWidth: "1px",
          }}
        >
          {text}
        </span>
        <span
          className="mr-4 block"
          style={{
            WebkitTextFillColor: "transparent",
            WebkitTextStrokeColor: "black",
            WebkitTextStrokeWidth: "1px",
          }}
        >
          {text}
        </span>
      </motion.div>
    </div>
  )
}
