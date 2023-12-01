"use client"

const Page = () => {
  navigator.permissions
    .query({ name: "geolocation" })
    .then((p) => {
      console.log(p.state)
    })
    .catch((e) => {
      console.log(e)
    })

  return (
    <div>
      <p>Example text right here</p>
    </div>
  )
}

export default Page
