import { Prisma, PrismaClient } from "@figtree/prisma/client"

export const serviceRepository = (prisma: PrismaClient) => {
  const create = async (
    workspaceId: string,
    payload: Omit<Prisma.ServiceUncheckedCreateInput, "workspaceId">
  ) => {
    const service = await prisma.service.create({
      data: {
        ...payload,
        workspaceId,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        status: true,
        visibility: true,
        featured: true,
      },
    })
    return service
  }

  return {
    create,
  }
}

export type ServiceRepositoryParams = ReturnType<typeof serviceRepository>
