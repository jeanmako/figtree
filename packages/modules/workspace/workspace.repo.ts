import { PrismaClient } from "@figtree/prisma/client"

export const workspaceRepository = (prisma: PrismaClient) => {
  const findBySlug = async (slug: string, profileId: string) => {
    return await prisma.workspace.findUnique({
      where: {
        slug,
        deletedAt: null,
        members: {
          some: { profileId }, // only returns if requesting user is a member
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    })
  }

  const findBySlugWithMember = async (slug: string, profileId: string) => {
    const workspaceWithMember = await prisma.workspace.findUnique({
      where: {
        slug,
        deletedAt: null,
      },
      include: {
        members: {
          where: { profileId },
          select: {
            role: true,
            title: true,
            canManageBilling: true,
            canManageStore: true,
            canManageTeam: true,
            canViewIntelligence: true,
          },
        },
      },
    })

    return workspaceWithMember
  }

  return {
    findBySlug,
    findBySlugWithMember,
  }
}

export type WorkspaceRepositoryParams = ReturnType<typeof workspaceRepository>
