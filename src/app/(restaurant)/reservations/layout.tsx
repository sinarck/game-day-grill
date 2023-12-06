import { Metadata } from "next"

interface ReservationLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Reservations",
  description: "Book reservations for the Game Day Grill",
}

export default function ReservationLayout({
  children,
}: Readonly<ReservationLayoutProps>) {
  return <div className="min-h-screen">{children}</div>
}
