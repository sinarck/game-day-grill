import { Prisma } from "@prisma/client"

type Menu = Prisma.MenuGetPayload<{
  select: { [K in keyof Required<Prisma.MenuSelect>]: true }
}>

export interface MenuAPIResponse {
  menu: Menu | null
  message: string
}
