import Provider from "@/components/provider"
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

export default function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className="antialiased h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
