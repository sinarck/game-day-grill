"use client"

import { useState } from "react"

const Page = () => {
  const [data, setData] = useState(null)

  return (
    <div className="flex flex-col">
      Here is my example page with example menu fetching:
      <button
        onClick={async () => {
          const response = await fetch("/api/menu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              restaurantId: "1",
            }),
          })
          const data = await response.json()
          setData(data)
        }}
      >
        Click here to test
      </button>
    </div>
  )
}

export default Page
