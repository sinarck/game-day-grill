import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// stolen from shadcn taxomony's utils.ts file
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const countDuplicates = (items) => {
  const count = items.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1
    return acc
  }, {})

  return items
    .filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    )
    .map((item) => ({ ...item, quantity: count[item.id] }))
}
