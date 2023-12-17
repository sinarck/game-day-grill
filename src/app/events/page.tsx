import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Page = () => {
  const events = [
    {
      date: "February 14, 2023",
      description: "Romantic Valentine's Day Dinner with Live Music",
    },
    {
      date: "March 17, 2023",
      description: "St. Patrick's Day Special: Traditional Irish Cuisine",
    },
    {
      date: "July 4, 2023",
      description: "Independence Day BBQ Bash with Fireworks Viewing",
    },
    {
      date: "October 31, 2023",
      description: "Halloween Spooktacular: Themed Menu and Costume Contest",
    },
    {
      date: "November 24, 2023",
      description: "Thanksgiving Feast: Traditional Turkey Dinner and Pies",
    },
    {
      date: "December 31, 2023",
      description:
        "New Year's Eve Gala: Five-Course Meal and Champagne Toast at Midnight",
    },
    {
      date: "January 26, 2024",
      description: "Australia Day: Special Australian Cuisine",
    },
    {
      date: "February 16, 2024",
      description: "Chinese New Year: Special Chinese Cuisine",
    },
  ]
  return (
    <div className="min-h-screen p-28">
      <h1 className="pb-5 text-center text-2xl font-bold tracking-wide">
        Events
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {events.map((event) => (
          <Card
            className="duration-200 ease-in hover:shadow-md"
            key={event.description}
          >
            <CardHeader>
              <CardTitle className="text-md whitespace-nowrap">
                {event.date}
              </CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Page
