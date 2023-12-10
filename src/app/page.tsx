"use client"

import { Button } from "@/components/ui/button"
import { ParallaxText } from "@/components/ui/parallax-text"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], [0, 1000])

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 flex">
        <main className="flex w-1/2 items-center justify-center p-24">
          <div className="pt-5">
            <motion.h1
              className="pb-5 text-7xl font-extrabold text-black"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              Join now for a free gift
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <Link href="/">
                <Button
                  loading={false}
                  type="button"
                  variant="default"
                  size={"lg"}
                >
                  Learn more
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <motion.div
          className="relative flex w-1/2 items-center justify-center p-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <Image
            alt="Gift cards"
            src="/restaurant.jpg"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </motion.div>
      </div>
      <div className="absolute bottom-0">
        <ParallaxText baseVelocity={5} text="FRISCO DALLAS PLANO" />
      </div>
    </div>
  )
}
