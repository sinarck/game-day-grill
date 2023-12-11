import { useClickAway } from "@uidotdev/usehooks"
import { AnimatePresence, motion } from "framer-motion"
import {
  Beef,
  CalendarRange,
  CalendarSearch,
  CornerDownLeft,
  Home,
  MapPinned,
  Menu,
  UtensilsCrossed,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RefObject, useState } from "react"
import { Button } from "../ui/button"

const MobileNav = () => {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  // Call setOpen(false) when a click event occurs outside of the element with ref
  const ref = useClickAway(() => setOpen(false)) as RefObject<HTMLDivElement>

  const toggleSidebar = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <Button
        loading={false}
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="sm:hidden"
      >
        <Menu className="h-8 w-8 cursor-pointer sm:h-6 sm:w-6" />
      </Button>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed bottom-0 left-0 top-0 z-50 h-screen w-64 max-w-xs border-r-2 border-zinc-800 bg-neutral-200"
              ref={ref}
              aria-label="Sidebar"
              drag="x"
              onDragEnd={(event, info) => {
                if (info.offset.x > 100) {
                  toggleSidebar()
                }
              }}
            >
              <div className="flex items-center justify-between border-b-2 border-zinc-800 p-5">
                <span>Welcome</span>
                <Button
                  loading={false}
                  variant="ghost"
                  type="button"
                  size="icon"
                  onClick={toggleSidebar}
                  aria-label="close sidebar"
                >
                  <CornerDownLeft />
                </Button>
              </div>
              <ul>
                {items.map((item, idx) => {
                  const { title, href, Icon } = item
                  return (
                    <li key={title}>
                      <Link
                        onClick={toggleSidebar}
                        href={href}
                        className="flex items-center justify-between gap-5 border-b-2 border-zinc-800 p-5 transition-all"
                      >
                        <motion.span {...framerText(idx)}>{title}</motion.span>
                        <motion.div {...framerIcon}>
                          <Icon className="text-2xl" />
                        </motion.div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const items = [
  { title: "Home", Icon: Home, href: "/" },
  { title: "Menu", Icon: UtensilsCrossed, href: "/menu" },
  { title: "Locations", Icon: MapPinned, href: "/locations" },
  { title: "Reservations", Icon: CalendarRange, href: "/reservations" },
  { title: "Our Story", Icon: Beef, href: "/" },
  { title: "Events", Icon: CalendarSearch, href: "/" },
]

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
}

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: -15 },
  exit: { x: "-100%", transition: { duration: 0.1 } },
  transition: { duration: 0.3 },
}

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.25 + delay / 10,
    },
  }
}

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: 0.75,
  },
}

export default MobileNav
