import NavBar from "@/components/navigation/nav-bar"
import Provider from "@/components/provider"
import { Footer } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import "@/styles/globals.css"
import { Metadata } from "next"
import { ReactNode } from "react"

interface RootLayoutProps {
  children: ReactNode
  params?: boolean
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: {
      url: "/favicon.ico",
      type: "image/ico",
    },
    shortcut: { url: "/favicon.png", type: "image/png" },
  },
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen antialiased">
        {/* Firefox FOUC Workaround */}
        <script>0</script>
        <Provider>
          <NavBar />
          {children}
        </Provider>
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
