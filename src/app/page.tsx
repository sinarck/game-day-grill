import Image from "next/image"

export default function Home() {
  return (
    <div className="relative">
      <Image
        alt="Barbeque"
        src={"/restaurant.jpg"}
        width={0}
        height={0}
        sizes="100vw"
        priority
        className="absolute z-0 h-full w-full opacity-75 contrast-100"
      />
      <main className="relative z-10 m-0 flex min-h-screen w-full items-center justify-center">
        <h1 className="text-7xl text-neutral-100">Game Day Grill</h1>
      </main>
    </div>
  )
}
