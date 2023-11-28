"use client"

import { useState } from "react"

const Page = () => {
  const [data, setData] = useState(null)

  return (
    <div className="flex flex-col">
      <p>Here is my example page with example menu fetching:</p>
      <button
        onClick={async () => {
          const response = await fetch("/api/menu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              restaurantId: "1",
            }),
          })
          const responseData = await response.json()
          setData(responseData)
          console.log("inside client", responseData)
        }}
      >
        Click here to test
      </button>
    </div>
  )
}

export default Page
