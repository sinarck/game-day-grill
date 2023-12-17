const Page = () => {
  const locations = [
    "123 Broadway St, New York, NY, 10001",
    "456 Hollywood Blvd, Los Angeles, CA, 90028",
    "789 Michigan Ave, Chicago, IL, 60611",
    "321 Main St, Houston, TX, 77002",
    "654 Central Ave, Phoenix, AZ, 85004",
    "987 Market St, Philadelphia, PA, 19107",
  ]
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
      <div className="w-1/4 pl-10">
        <p className="mb-4 text-2xl font-bold uppercase tracking-wide">
          Current locations in:
        </p>
        {locations.map((loc, idx) => (
          <p className="font-gray-400 mb-2 text-sm" key={loc}>
            {loc}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Page
