import { Prisma } from "@prisma/client"

/**
 * Interface extended by all APIResponses returned by the API
 * @property message - String returned by the API to be displayed to user
 */
export interface APIResponse {
  message: string
}

/**
 * Generic type for APIErrors
 *
 * @template T - Type of the data returned by the API
 */
export type APIError<T> = {
  [K in keyof T]: T[K] | null
} & APIResponse

/**
 * Response interface for the Auth API Flow
 *
 * @extends APIResponse
 */
export interface AuthAPIResponse extends APIResponse {
  user: Partial<
    Prisma.UserGetPayload<{
      select: {
        [K in keyof Required<Prisma.UserSelect>]: true
      }
    }>
  > | null
}

/**
 * Custom interface (outside of flow) for Auth API Errors
 */
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

/**
 * Response interface for the Menu API Flow
 *
 * @extends APIResponse
 */
export interface MenuAPIResponse extends APIResponse {
  menu: Prisma.MenuGetPayload<{
    select: {
      [K in keyof Required<Prisma.MenuSelect>]: true
    }
  }> | null
}

/**
 * Response interface for the Order API Flow
 *
 * @extends APIResponse
 */
export interface OrderAPIResponse extends APIResponse {
  order: Prisma.MenuGetPayload<{
    select: {
      [K in keyof Required<Prisma.MenuSelect>]: true
    }
  }> | null
}

/**
 * Response interface for the Reservations API Flow
 *
 * @extends APIResponse
 */
export interface ReservationsAPIResponse extends APIResponse {
  reservations: Prisma.ReservationsGetPayload<{
    select: {
      [K in keyof Required<Omit<Prisma.ReservationsSelect, "restaurant">>]: true
    }
  }> | null
}
