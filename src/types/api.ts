import { Prisma } from "@prisma/client"
import { User } from "./user"

export type APIError<T> = {
  [K in keyof T]: T[K] | null
} & {
  message: string
}

export interface AuthAPIError {
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
  }> | null
}

export interface OrderAPIResponse extends APIResponse {
  order: Prisma.MenuGetPayload<{
    select: {
      [K in keyof Required<Prisma.MenuSelect>]: true
    }
  }> | null
}

export interface ReservationsAPIResponse extends APIResponse {
  reservations: Prisma.ReservationsGetPayload<{
    select: {
      [K in keyof Required<Omit<Prisma.ReservationsSelect, "restaurant">>]: true
    }
  }> | null
}
