import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { NavItem } from "@/types/navigation"
import Link from "next/link"
import { Icons } from "../icons"

interface MainNavProps {
  items?: NavItem[]
}

const NavLinks = ({ items }: MainNavProps) => {
  return (
    <div className="flex md:gap-5">
      <Link
        href="/"
        className="flex items-center justify-center space-x-2 align-middle"
      >
        <Icons.Logo className="h-8 w-8 md:h-6 md:w-6" />
        <span className="text-md font-bold sm:text-lg">{siteConfig.name}</span>
      </Link>
      {/* TODO: Make Mobile NavBar */}

      {items?.length ? (
        <nav className="hidden gap-4 md:flex">
          {items?.map(
            ({ href, title, disabled }) =>
              href && (
                <Link
                  key={title}
                  href={href}
                  className={cn(
                    "group flex items-center font-semibold text-gray-600 transition-all duration-200 ease-in hover:text-gray-900 sm:text-sm",
                    disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <span className="text-md bg-gradient-to-l from-gray-700 to-gray-700 bg-[length:0%_2px] bg-bottom bg-no-repeat transition-all duration-200 ease-in group-hover:bg-[length:100%_2px]">
                    {title}
                  </span>
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}

export default NavLinks
