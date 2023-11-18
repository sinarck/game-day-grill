import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import "@/styles/globals.css"
import { fontSans } from "@/lib/fonts"
import { SiteHeader } from "@/components/site-header"

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
    // apple: "/apple-touch-icon.png",
  },
}

export const runtime = "edge"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={fontSans.variable}>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
