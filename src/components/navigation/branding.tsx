import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import Logo from "../../app/icon.png"

interface BrandingProps {
  start: "start" | "center"
}

const Branding = ({ start }: BrandingProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-lg font-bold tracking-wide text-black",
        start ? "justify-start" : "justify-center"
      )}
    >
      <Image height={42} alt="Logo" src={Logo} />
      {siteConfig.name}
    </Link>
  )
}

export default Branding
