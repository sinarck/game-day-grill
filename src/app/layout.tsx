import NavBar from "@/components/navigation/nav-bar"
import Provider from "@/components/provider"
import { siteConfig } from "@/config/site"
import "@/styles/globals.css"
import { Metadata } from "next"

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
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased h-screen">
        <Provider>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
