const Page = () => {
  return (
    <div className="flex min-h-screen p-28">
      <div className="w-3/4 space-y-10">
        <p className="text-4xl font-bold uppercase tracking-wide">
          The Game Day Grill began in the heart of New York, the sports capital
          of the world.
        </p>
        <div className="flex gap-2">
          <p className="w-1/2 text-gray-500">
            Ever since then, we&apos;ve been focusing on spreading our love for
            game day across the country.
          </p>
          <p className="w-1/2 text-gray-500">
            So far, we&apos;ve been successful in doing so, and we&apos;re
            looking on opening more locations in the near future.
          </p>
        </div>
      </div>
      <div className="w-1/4">Current locations in:</div>
    </div>
  )
}

export default Page
