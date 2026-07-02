import { Prisma, PrismaClient } from "@figtree/prisma/client"

export const serviceRepository = (prisma: PrismaClient) => {
  const create = async (
    workspaceId: string,
    payload: Prisma.ServiceCreateWithoutPurchasesInput
  ) => {}
}
