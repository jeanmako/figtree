import { Prisma, PrismaClient } from "@figtree/prisma/client"
import {
  CreateWorkspaceResponseSchema,
  WorkspaceSchema,
} from "@figtree/shared/schemas/workspace"

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
        website: true,
        plan: true,
        industry: true,
        logoIconUrl: true,
        workspaceUrl: true,
        logoWordmarkUrl: true,
        inviteCode: true,
        headcount: true,
        billingCycleStart: true,
        fiscalYearStartMonth: true,
        typicalClients: true,
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

    return CreateWorkspaceResponseSchema.parse(workspace)
  }

  const update = async (
    id: string,
    profileId: string,
    payload:
      | Prisma.WorkspaceUpdateWithoutInvitesInput
      | Prisma.WorkspaceUpdateWithoutMembersInput
  ) => {
    const workspace = await prisma.workspace.update({
      where: { id },
      data: payload,
      select: {
        id: true,
        slug: true,
        name: true,
        country: true,
        currency: true,
        plan: true,
        industry: true,
        logoIconUrl: true,
        workspaceUrl: true,
        website: true,
        logoWordmarkUrl: true,
        inviteCode: true,
        headcount: true,
        billingCycleStart: true,
        fiscalYearStartMonth: true,
        typicalClients: true,
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
    return CreateWorkspaceResponseSchema.parse(workspace)
  }

  // <QUERIES>

  // TODO: Reduce the response since this will be mostly used for check ups.
  const findBySlug = async (slug: string, profileId: string) => {
    const foundWorkspace = await prisma.workspace.findUnique({
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

    return WorkspaceSchema.parse(foundWorkspace)
  }
  const findById = async (id: string, profileId: string) => {
    const foundWorkspace = await prisma.workspace.findUnique({
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

    return WorkspaceSchema.parse(foundWorkspace)
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
        industry: true,
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
