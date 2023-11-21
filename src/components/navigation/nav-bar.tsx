"use client"

import NavLinks from "@/components/navigation/nav-menu"
import { siteConfig } from "@/config/site"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Button from "../button"
import Profile from "./profile"

const NavBar = () => {
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur-md">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <NavLinks items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4 pr-6">
          {status === "authenticated" ? (
            <Profile />
          ) : (
            <Button loading={false} type="button" variant="outline">
              <Link
                href="/login"
                className="flex items-center text-lg font-semibold text-muted-foreground sm:text-sm"
              >
                Log in
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
