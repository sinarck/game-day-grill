import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import "@/styles/globals.css"
import NavBar from "@/components/navigation/nav-bar"

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

// export const runtime = "edge"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased h-screen">
        <NavBar />
        {children}
      </body>
    </html>
  )
}
