import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// stolen from shadcn taxomony's utils.ts file
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
