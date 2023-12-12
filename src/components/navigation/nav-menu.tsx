import { cn } from "@/lib/utils"
import { NavItem } from "@/types/navigation"
import Link from "next/link"

interface MainNavProps {
  items?: NavItem[]
}

const NavMenu = ({ items }: MainNavProps) => {
  return (
    <div className="flex w-full items-center justify-between sm:w-auto">
      {items?.length && (
        <nav className="hidden gap-4 sm:flex">
          {items.map(
            ({ href, title, disabled }) =>
              href && (
                <Link
                  key={title}
                  href={href}
                  className={cn(
                    "group flex items-center font-bold text-black transition-all duration-200 ease-in sm:text-xl",
                    disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <span className="bg-gradient-to-l from-amber-900 to-amber-900 bg-[length:0%_2px] bg-bottom bg-no-repeat text-xs transition-all duration-200 ease-in group-hover:bg-[length:100%_2px] sm:text-xs md:text-sm">
                    {title}
                  </span>
                </Link>
              )
          )}
        </nav>
      )}
    </div>
  )
}

export default NavMenu
