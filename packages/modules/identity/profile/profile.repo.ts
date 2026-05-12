import { PrismaClient } from "@figtree/prisma/client"

export const profileRepository = (prisma: PrismaClient) => {
  const findByUserId = async (userId: string) => {
    return await prisma.profile.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        locale: true,
        timezone: true,
        weekStartsOnMonday: true,
        dateFormat: true,
      },
    })
  }

  const findById = async (id: string) => {
    return await prisma.profile.findUnique({
      where: { id },
    })
  }

  return {
    findByUserId,
    findById,
  }
}

export type ProfileRepositoryParams = ReturnType<typeof profileRepository>
