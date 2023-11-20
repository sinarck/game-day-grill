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
        className="pl-5 items-center space-x-2 flex align-middle justify-center"
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
                    "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                    disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}

export default NavLinks
