import { Prisma } from "@prisma/client"
import { User } from "./user"

export interface FormAPIResponse {
  user: User | null
  message: string
}
export interface FetchError {
  response: {
    data: {
      message: {
        user: FormAPIResponse
        message: FormAPIResponse
      }
    }
  }
}
export interface MenuAPIResponse {
  menu: Prisma.MenuGetPayload<{
    select: {
      [K in keyof Required<Prisma.MenuSelect>]: true
    }
  }>
  message: string
}
