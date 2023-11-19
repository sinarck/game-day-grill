import Image from "next/image"
import React from "react"

const NotFound = () => {
  return (
    <div className="flex justify-center align-middle items-center">
      <div className="bottom-10 relative">
        <h1 className="font-extrabold text-[192px]">404</h1>
        <p className="ml-5 text-3xl bottom-7 relative">Something went wrong!</p>
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
