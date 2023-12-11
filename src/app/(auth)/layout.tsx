import { Icons } from "@/components/icons"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen overflow-hidden">
      <Link
        href="/"
        className="absolute left-0 mt-4 flex items-center justify-center align-middle md:left-8 md:mt-8"
      >
        <div className="flex items-center justify-center align-middle">
          <Icons.ChevronLeft className="h-4 w-4" />
          Back
        </div>
      </Link>
      {children}
    </div>
  )
}
