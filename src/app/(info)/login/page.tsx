import Link from "next/link"
import React from "react"

const page = () => {
  return (
    <div>
      <p>Login or</p>
      <Link href="/signup">
        <p>signup</p>
      </Link>
    </div>
  )
}

export default page
