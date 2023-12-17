/**
 * Site configuration for modular use throughout
 *
 * @property name - The name of the site
 * @property description - The description of the site
 * @property mainNav - The main navigation links
 * @property links - Links to social media and other sites
 *
 */

export const siteConfig = {
  name: "Game Day Grill",
  description: "BPA Website Design Team 2023",
  mainNav: [
    {
      title: "Menu",
      href: "/menu",
    },
    {
      title: "Locations",
      href: "/locations",
    },
    {
      title: "Reservations",
      href: "/reservations",
    },
    {
      title: "Events",
      href: "/events",
    },
  ],
  links: {
    github: "https://github.com/aadisanghvii/gt-hsa",
  },
}
