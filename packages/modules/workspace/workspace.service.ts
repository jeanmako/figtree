import { WorkspaceRepositoryParams } from "./workspace.repo"
import { ProfileRepositoryParams as IdRepoParams } from "../identity/profile/profile.repo"
import { FigtreeApiError } from "@figtree/lib/errors"
import {
  CreateWorkspacePayload,
  UpdateWorkspacePayload,
} from "@figtree/shared/schemas/workspace"
import { createId } from "@figtree/utils/functions/id-factory"
import { nanoid } from "@figtree/utils/functions/nanoid"
import { serverEnv } from "@figtree/shared/env/server"
import { generateRandomString } from "@figtree/utils/functions/generate-random-string"

export const WorkspaceService = (
  repo: WorkspaceRepositoryParams,
  IdRepo?: IdRepoParams
) => {
  const create = async (userId: string, payload: CreateWorkspacePayload) => {
    const { slug } = payload

    const foundProfile = await IdRepo?.findByUserId(userId)

    if (!foundProfile) {
      throw new FigtreeApiError({
        code: "not_found",
        message: "No existing profile found for the logged in user.",
      })
    }

    const foundWorkspace = await repo.findBySlugWithMinimalPayload(slug)

    if (foundWorkspace) {
      throw new FigtreeApiError({
        code: "conflict",
        message: `A workspace with the slug "${slug}" already exists.`,
      })
    }

    // TODO: add additional guards for workspace limits, etc

    const workspace = await repo.create(foundProfile.id, {
      id: createId(),
      name: payload.name,
      slug,
      currency: payload.currency,
      country: payload.country,
      billingCycleStart: new Date().getDate(),
      inviteCode: nanoid(20),
      invoicePrefix: generateRandomString(8),
      workspaceUrl: `${serverEnv.CLIENT_ORIGIN}/${slug}`,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      members: {
        create: {
          profileId: foundProfile.id,
          role: "owner",
          canManageBilling: true,
          canManageTeam: true,
          canManageStore: true,
          canViewIntelligence: true,
        },
      },
    })

    return workspace
  }
  // TODO: Add a userId prop and connect it to the membership repo.
  const update = async (params: {
    slug: string
    userId: string
    payload: UpdateWorkspacePayload
  }) => {
    const { slug, userId, payload } = params

    const foundProfile = await IdRepo?.findByUserId(userId)

    if (!foundProfile) {
      throw new FigtreeApiError({
        code: "not_found",
        message: "No existing profile found for the logged in user.",
      })
    }

    const foundWorkspace = await repo.findBySlugWithMinimalPayload(slug)

    if (!foundWorkspace) {
      throw new FigtreeApiError({
        code: "not_found",
        message: "Workspace not found.",
      })
    }

    const workspace = await repo.update(
      foundWorkspace.id,
      foundProfile.id,
      payload
    )

    return workspace
  }

  const findBySlug = async (id: string, userId: string) => {
    const existingProfile = await IdRepo?.findByUserId(userId)
    const foundWorkspace = await repo.findBySlug(
      id,
      existingProfile?.id as string
    )

    if (!foundWorkspace) {
      throw new FigtreeApiError({
        code: "not_found",
        message: "You do not have access to this workspace.",
      })
    }

    return foundWorkspace
  }

  const findBySlugWithMember = async (slug: string, userId: string) => {
    const existingProfile = await IdRepo?.findByUserId(userId)
    const foundWorkspaceWithMember = await repo.findBySlugWithMember(
      slug,
      existingProfile?.id as string
    )

    if (!foundWorkspaceWithMember) {
      throw new FigtreeApiError({
        code: "not_found",
        message: "Workspace not found.",
      })
    }
  }

  return {
    findBySlug,
    findBySlugWithMember,
    create,
    update,
  }
}
