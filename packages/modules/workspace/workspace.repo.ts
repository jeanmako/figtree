import { Prisma, PrismaClient } from "@figtree/prisma/client"
import { WorkspaceUpdateToOneWithWhereWithoutInvitesInput } from "../../prisma/generated/prisma/models/Workspace"

export const workspaceRepository = (prisma: PrismaClient) => {
  const create = async (
    profileId: string,
    payload: Prisma.WorkspaceCreateWithoutInvitesInput
  ) => {
    const workspace = await prisma.workspace.create({
      data: payload,
      select: {
        id: true,
        slug: true,
        name: true,
        country: true,
        currency: true,
        plan: true,
        vertical: true,
        logoIconUrl: true,
        workspaceUrl: true,
        logoWordmarkUrl: true,
        inviteCode: true,
        headcount: true,
        billingCycleStart: true,
        trialEndsAt: true,
        createdAt: true,
        members: {
          where: { profileId },
          select: {
            role: true,
            canManageBilling: true,
            canManageTeam: true,
            canManageStore: true,
            canViewIntelligence: true,
          },
        },
      },
    })

    return workspace
  }

  const update = async (
    id: string,
    profileId: string,
    payload:
      | Prisma.WorkspaceUpdateWithoutInvitesInput
      | Prisma.WorkspaceUpdateWithoutMembersInput
  ) => {
    return await prisma.workspace.update({
      where: { id },
      data: payload,
      select: {
        id: true,
        slug: true,
        name: true,
        country: true,
        currency: true,
        plan: true,
        vertical: true,
        logoIconUrl: true,
        workspaceUrl: true,
        logoWordmarkUrl: true,
        inviteCode: true,
        headcount: true,
        billingCycleStart: true,
        trialEndsAt: true,
        createdAt: true,
        members: {
          where: { profileId },
          select: {
            role: true,
            canManageBilling: true,
            canManageTeam: true,
            canManageStore: true,
            canViewIntelligence: true,
          },
        },
      },
    })
  }

  // <QUERIES>

  // TODO: Reduce the response since this will be mostly used for check ups.
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
  const findById = async (id: string, profileId: string) => {
    return await prisma.workspace.findUnique({
      where: {
        id,
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

  const findBySlugWithMinimalPayload = async (slug: string) => {
    return await prisma.workspace.findUnique({
      where: { slug },
      select: {
        slug: true,
        name: true,
        id: true,
        plan: true,
        vertical: true,
        headcount: true,
      },
    })
  }

  // </QUERIES>

  return {
    findBySlug,
    findById,
    findBySlugWithMember,
    findBySlugWithMinimalPayload,
    create,
    update,
  }
}

export type WorkspaceRepositoryParams = ReturnType<typeof workspaceRepository>
