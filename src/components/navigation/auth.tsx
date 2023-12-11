import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import Profile from "./profile"

const Auth = () => {
  const { status, data } = useSession()

  return (
    <>
      {status === "loading" && !data && (
        <Skeleton className="hidden h-9 w-16 rounded-md px-3 sm:block" />
      )}
      {status === "loading" && data && (
        <Skeleton className="hidden h-9 w-28 rounded-md px-3 sm:block" />
      )}
      {status === "authenticated" && <Profile />}
      {status === "unauthenticated" && (
        <Link
          href="/login"
          className="hidden text-lg font-semibold text-gray-600 sm:block sm:text-sm"
        >
          <Button
            loading={false}
            type="button"
            variant="outline"
            className="flex flex-1 items-center"
            size={"sm"}
          >
            Log in
          </Button>
        </Link>
      )}
    </>
  )
}

export default Auth
