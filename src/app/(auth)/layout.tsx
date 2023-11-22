import { Icons } from "@/components/icons"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <Link
        href="/"
        className="flex items-center align-middle justify-center absolute left-4 top-4 md:left-8 md:top-8"
      >
        <div className="items-center align-middle justify-center flex">
          <Icons.ChevronLeft className="h-4 w-4" />
          Back
        </div>
      </Link>
      {children}
    </div>
  )
}
