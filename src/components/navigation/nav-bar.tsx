"use client"

import { siteConfig } from "@/config/site"
import Auth from "./auth"
import Branding from "./branding"
import Cart from "./cart"
import MobileNav from "./mobile-nav"
import NavMenu from "./nav-menu"

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white p-3 shadow-sm sm:px-6">
      <div className="flex w-full items-center justify-between sm:hidden">
        <MobileNav />
        <Branding start="center" />
        <Cart />
      </div>
      <div className="hidden w-full items-center justify-between sm:flex">
        <Branding start="start" />
        <NavMenu items={siteConfig.mainNav} />
        <div className="flex items-center space-x-4">
          <Auth />
          <Cart />
        </div>
      </div>
    </header>
  )
}

export default NavBar
