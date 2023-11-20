"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"

import { Icons } from "@/components/icons"
import MainNav from "@/components/main-nav"

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background backdrop-blur-md">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1"></nav>
        </div>
      </div>
    </header>
  )
}
