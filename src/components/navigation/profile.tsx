import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Avvvatars from "avvvatars-react"
import { LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useToast } from "../ui/use-toast"

const Profile = () => {
  // Session data
  const { data: session, status } = useSession()

  const { toast } = useToast()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {status === "authenticated" && (
          <Avvvatars
            value={session.user.username}
            shadow
            style={"character"}
            size={36}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            toast({
              title: "Welcome to the family",
              description: "Account successfully created and activated",
            })
          }}
        >
          Toast
        </DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            signOut()
          }}
        >
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-red-500">Log out</p>
            </div>
            <div>
              <LogOut color="#CC3333" size={20} />
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile
