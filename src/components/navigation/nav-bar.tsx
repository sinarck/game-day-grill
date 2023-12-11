"use client"

import NavMenu from "@/components/navigation/nav-menu"
import { siteConfig } from "@/config/site"
import { ShoppingCart } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Logo from "../../app/icon.png"
import { Button } from "../ui/button"
import MobileNav from "./mobile-nav"
import Profile from "./profile"

const NavBar = () => {
  const { status } = useSession()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white px-3 shadow-sm">
      <div className="flex h-16 items-center space-x-4 sm:space-x-0">
        <MobileNav />
        <Link
          href="/"
          className="flex items-center justify-center gap-2 whitespace-nowrap pr-4 align-middle text-lg font-bold tracking-wide text-black"
        >
          <Image height={42} width={42} alt="Logo" src={Logo} />
          {siteConfig.name}
        </Link>
        <NavMenu items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {status === "authenticated" ? (
            <Profile />
          ) : (
            <Link
              href="/login"
              className="hidden text-lg font-semibold text-gray-600 sm:block sm:text-sm"
            >
              <Button
                loading={false}
                type="button"
                variant="outline"
                className="flex flex-1 items-center"
                size={"sm"}
              >
                Log in
              </Button>
            </Link>
          )}
          <Button
            loading={false}
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              router.push("/cart")
            }}
          >
            <ShoppingCart className="h-8 w-8 cursor-pointer sm:h-6 sm:w-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default NavBar
