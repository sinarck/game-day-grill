"use client"

import { siteConfig } from "@/config/site"

import NavLinks from "@/components/navigation/NavLinks"

export const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur-md">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <NavLinks items={siteConfig.mainNav} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1"></nav>
        </div>
      </div>
    </header>
  )
}
