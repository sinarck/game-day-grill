import { AnimatePresence, motion } from "framer-motion"
import {
  ContactIcon,
  CornerDownLeft,
  Home,
  Menu,
  SettingsIcon,
  ShoppingCartIcon,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { Button } from "../ui/button"

const MobileNav = () => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Call setOpen(false) when a click event occurs outside of the element with ref
  // useClickAway(ref, () => setOpen(false))

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
              className="fixed bottom-0 left-0 top-0 z-50 h-screen w-full max-w-xs border-r-2 border-zinc-800 bg-neutral-300"
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between border-b-2 border-zinc-800 p-5">
                <span>Welcome</span>
                <button
                  onClick={toggleSidebar}
                  className="rounded-xl border-2 border-zinc-800 p-3"
                  aria-label="close sidebar"
                >
                  <CornerDownLeft />
                </button>
              </div>
              <ul>
                {items.map((item, idx) => {
                  const { title, href, Icon } = item
                  return (
                    <li key={title}>
                      <a
                        onClick={toggleSidebar}
                        href={href}
                        className="flex items-center justify-between gap-5 border-b-2 border-zinc-800 p-5 transition-all hover:bg-zinc-900"
                      >
                        <motion.span {...framerText(idx)}>{title}</motion.span>
                        <motion.div {...framerIcon}>
                          <Icon className="text-2xl" />
                        </motion.div>
                      </a>
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
  { title: "About", Icon: User },
  { title: "Contact", Icon: ContactIcon, href: "/" },
  { title: "Settings", Icon: SettingsIcon, href: "/" },
  { title: "Shop", Icon: ShoppingCartIcon, href: "/" },
]

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
}

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
}

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
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
    delay: 1.5,
  },
}

export default MobileNav
