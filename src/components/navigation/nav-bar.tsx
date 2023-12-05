"use client"

import NavMenu from "@/components/navigation/nav-menu"
import { siteConfig } from "@/config/site"
import { ShoppingCart } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import Profile from "./profile"

const NavBar = () => {
  const { status } = useSession()
  const router = useRouter()

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b px-3 backdrop-blur-md">
      <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
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
            className="hidden sm:inline-block"
          >
            <ShoppingCart className="hidden cursor-pointer sm:inline-block" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default NavBar
