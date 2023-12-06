import { Metadata } from "next"

interface LocationsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Locations",
  description: "The Game Day Grill's locations",
}

export default function LocationsLayout({
  children,
}: Readonly<LocationsLayoutProps>) {
  return <div className="min-h-screen">{children}</div>
}
