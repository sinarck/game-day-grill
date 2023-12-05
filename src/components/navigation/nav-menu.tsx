import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { NavItem } from "@/types/navigation"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Icons } from "../icons"
import { Button } from "../ui/button"

interface MainNavProps {
  items?: NavItem[]
}

const NavMenu = ({ items }: MainNavProps) => {
  const router = useRouter()

  return (
    <div className="flex w-full items-center justify-between align-middle sm:w-auto sm:gap-5">
      <Link href="/">
        <Icons.Logo className="h-8 w-8 md:h-6 md:w-6" />
      </Link>
      <Link href="/">
        <span className="text-md text-center font-bold tracking-wide sm:block sm:text-left sm:text-lg">
          {siteConfig.name}
        </span>
      </Link>
      <Button
        loading={false}
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          router.push("/cart")
        }}
        className="block sm:hidden"
      >
        <Menu className="inline-block cursor-pointer sm:hidden" />
      </Button>

      {items?.length ? (
        <nav className="hidden gap-1 sm:flex sm:gap-4">
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
                  <span className="bg-gradient-to-l from-gray-700 to-gray-700 bg-[length:0%_2px] bg-bottom bg-no-repeat text-xs transition-all duration-200 ease-in group-hover:bg-[length:100%_2px] sm:text-xs md:text-sm">
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

export default NavMenu
