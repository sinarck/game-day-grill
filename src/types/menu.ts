import { Prisma } from "@prisma/client"

export interface MenuAPIResponse {
  menu: Prisma.Menu_itemCountAggregateOutputType | null
  message: string
}
