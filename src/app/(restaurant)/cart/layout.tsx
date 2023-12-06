import { Metadata } from "next"

interface OrderLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Order Food",
  description: "Order food from the Game Day Grill",
}

export default function OrderLayout({ children }: Readonly<OrderLayoutProps>) {
  return <div className="min-h-screen">{children}</div>
}
