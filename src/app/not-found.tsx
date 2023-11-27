import Image from "next/image"
import React from "react"

const NotFound = () => {
  return (
    <div className="flex items-center justify-center align-middle">
      <div className="relative bottom-10">
        <h1 className="text-[192px] font-extrabold">404</h1>
        <p className="relative bottom-7 ml-5 text-3xl">Something went wrong!</p>
      </div>

      {/*  Image by storyset on Freepik  */}
      <Image
        alt="Man thinking"
        src="/404.jpg"
        width={500}
        height={500}
        className="left-0"
      />
    </div>
  )
}

export default NotFound
