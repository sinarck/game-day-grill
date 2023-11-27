import Provider from "@/components/provider"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
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

export default function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen antialiased">
        <Provider>{children}</Provider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
