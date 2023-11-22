import { NavItem } from "@/types/navigation"
import Link from "next/link"
import { Icons } from "../icons"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/merge"

interface MainNavProps {
  items?: NavItem[]
}

const NavLinks = ({ items }: MainNavProps) => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href="/"
        className="items-center space-x-2 flex align-middle justify-center"
      >
        <Icons.Logo className="h-8 w-8 md:h-6 md:w-6" />
        <span className="text-md font-bold sm:text-lg">{siteConfig.name}</span>
      </Link>
      {/* TODO: Make Mobile NavBar */}

      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            ({ href, title, disabled }) =>
              href && (
                <Link
                  key={title}
                  href={href}
                  className={cn(
                    "group flex items-center font-semibold text-gray-600 sm:text-sm hover:text-gray-900 ease-in duration-200 transition-all",
                    disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <span className="text-md bg-bottom bg-gradient-to-l from-gray-700 to-gray-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-200 ease-in">
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
