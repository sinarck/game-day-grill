"use client"

import { Button } from "@/components/ui/button"
import { ParallaxText } from "@/components/ui/parallax-text"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <Image
          alt="Gift cards"
          src="/restaurant.jpg"
          fill
          draggable={false}
          placeholder="blur"
          blurDataURL="/restaurant.jpg"
          className="w-full object-contain"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 flex pb-16">
          <main className="flex w-full items-center justify-center p-24 sm:w-1/2">
            <div className="pt-5">
              <h1 className="flex-1 pb-5 text-4xl font-extrabold text-black sm:text-7xl">
                Join now for 20&#37; off
              </h1>
              <div>
                <Link href="/signup">
                  <Button
                    loading={false}
                    type="button"
                    variant="default"
                    size={"lg"}
                  >
                    Make an account
                  </Button>
                </Link>
              </div>
            </div>
          </main>
          <div className="relative flex w-3/4 items-center justify-center">
            <Image
              alt="Gift cards"
              src="/discount.jpg"
              fill
              draggable={false}
              placeholder="blur"
              blurDataURL="/discount.jpg"
              className="hidden w-full object-contain sm:block"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="absolute bottom-0 select-none pt-10">
          <ParallaxText
            baseVelocity={1.25}
            text="new york · los angeles · chicago · houston · phoenix · philadelphia · "
          />
        </div>
      </div>
    </>
  )
}
