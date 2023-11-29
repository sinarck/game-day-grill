"use client"

import NavLinks from "@/components/navigation/nav-menu"
import { siteConfig } from "@/config/site"
import { ShoppingCart } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Button from "../button"
import Profile from "./profile"

const NavBar = () => {
  const { status } = useSession()
  const router = useRouter()

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b px-3 backdrop-blur-md">
      <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <NavLinks items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {status === "authenticated" ? (
            <Profile />
          ) : (
            <Button loading={false} type="button" variant="outline">
              <Link
                href="/login"
                className="flex items-center text-lg font-semibold text-gray-600 sm:text-sm"
              >
                Log in
              </Link>
            </Button>
          )}
          <ShoppingCart
            onClick={() => {
              router.push("/cart")
            }}
            className="cursor-pointer"
          />
        </div>
      </div>
    </header>
  )
}

export default NavBar
