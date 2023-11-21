import NavBar from "@/components/navigation/nav-bar"
import { Metadata } from "next"

interface MenuLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Menu",
  description: "The Game Day Grill's menu",
}

export default function MenuLayout({ children }: Readonly<MenuLayoutProps>) {
  return (
    <div className="min-h-screen">
      <NavBar />
      {children}
    </div>
  )
}
