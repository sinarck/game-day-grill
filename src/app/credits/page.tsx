"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col p-28">
      <Button loading={false} variant={"link"}>
        <Link href="https://www.freepik.com/free-vector/man-thinking-concept-illustration_20824309.htm#query=thinking&position=2&from_view=search&track=sph&uuid=db06f3e7-fdb4-486b-9807-8cc109c189a7">
          - Image by storyset on Freepik
        </Link>
      </Button>
      <Button loading={false} variant={"link"}>
        <Link href="https://www.freepik.com/free-vector/empty-shopping-basket-concept-illustration_42110454.htm#query=cart&position=18&from_view=search&track=sph&uuid=27f7572c-5d7d-4fbb-b5c9-344a5fc009ad">
          - Image by storyset on Freepik
        </Link>
      </Button>
      <Button loading={false} variant={"link"}>
        <Link href="https://www.freepik.com/free-vector/couple-winning-prize-man-woman-holding-gift-box-flat-vector-illustration-lottery-present-birthday-party_10172549.htm#page=4&query=lottery%20winner&position=38&from_view=search&track=ais">
          - Image by pch.vector on Freepik
        </Link>
      </Button>
    </div>
  )
}

export default Page
