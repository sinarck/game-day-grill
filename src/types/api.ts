import { Prisma } from "@prisma/client"
import { User } from "./user"

export interface APIError {
  response: {
    data: {
      message: {
        user: AuthAPIResponse
        message: AuthAPIResponse
      }
    }
  }
}
export interface APIResponse {
  message: string
}

export interface AuthAPIResponse extends APIResponse {
  user: User | null
}

export interface MenuAPIResponse extends APIResponse {
  menu: Prisma.MenuGetPayload<{
    select: {
      [K in keyof Required<Prisma.MenuSelect>]: true
    }
  }>
}

export interface OrderAPIResponse extends APIResponse {
  order: Prisma.MenuGetPayload<{
    select: {
      [K in keyof Required<Prisma.MenuSelect>]: true
    }
  }>
}
