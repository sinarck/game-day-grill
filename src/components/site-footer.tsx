import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Logo from "../app/icon.png"

export const Footer = () => {
  return (
    <div className="mx-auto mt-16 px-4 pt-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
      <div className="row-gap-6 mb-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Link
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <Image height={42} alt="Logo" src={Logo} />
            <span className="ml-2 text-xl font-bold uppercase tracking-wide text-gray-800">
              Game Day Grill
            </span>
          </Link>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-gray-800">
              The Game Day Grill is a restaurant that offers a comfortable and
              friendly atmosphere perfect for both game days and family dinners.
              We pride ourselves on our diverse menu that caters to all tastes,
              with a special focus on grilled dishes. Whether you&apos;re here
              to catch the game or enjoy a meal with loved ones, Game Day Grill
              promises a memorable dining experience.
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-900">
            Contact Us
          </p>
          <div className="flex">
            <p className="mr-1 text-gray-800">Phone:</p>
            <Link
              href="tel:850-123-5021"
              aria-label="Our phone"
              title="Our phone"
              className="text-deep-purple-accent-400 hover:text-deep-purple-800 transition-colors duration-300"
            >
              +1 (850) 123-5021
            </Link>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Email:</p>
            <Link
              href="mailto:support@game-day-grill.com"
              aria-label="Our email"
              title="Our email"
              className="text-deep-purple-accent-400 hover:text-deep-purple-800 transition-colors duration-300"
            >
              support@game-day-grill.com
            </Link>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Address:</p>
            <Link
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Our address"
              title="Our address"
              className="text-deep-purple-accent-400 hover:text-deep-purple-800 transition-colors duration-300"
            >
              312 Lovely Street, NY
            </Link>
          </div>
        </div>
        <div>
          <span className="text-base font-bold tracking-wide text-gray-900">
            Social
          </span>
          <div className="mt-1 flex items-center space-x-3">
            <Link
              target="_blank"
              href="https://x.com"
              className="hover:text-deep-purple-accent-400 text-gray-500 transition-colors duration-300"
            >
              <TwitterIcon className="h-6 w-6" />
            </Link>
            <Link
              target="_blank"
              href="https://instagram.com"
              className="hover:text-deep-purple-accent-400 text-gray-500 transition-colors duration-300"
            >
              <InstagramIcon className="h-6 w-6" />
            </Link>
            <Link
              target="_blank"
              href="https://facebook.com"
              className="hover:text-deep-purple-accent-400 text-gray-500 transition-colors duration-300"
            >
              <FacebookIcon className="h-6 w-6" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Follow us on all of our social media platforms to stay up to date
            with the latest grill news
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between border-t pb-10 pt-5 lg:flex-row">
        <p className="text-sm text-gray-600">
          © Copyright {new Date().getFullYear()} Game Day Grill. All rights
          reserved.
        </p>
        <Link href={"/credits"} className="text-sm text-gray-600">
          Credits
        </Link>
      </div>
    </div>
  )
}
