import { Prisma } from "@prisma/client"

export type User = Partial<
  Prisma.UserGetPayload<{
    select: { [K in keyof Required<Prisma.UserSelect>]: true }
  }>
>
