import { WorkspaceRepositoryParams } from "./workspace.repo"
import { ProfileRepositoryParams as IdRepoParams } from "../identity/profile/profile.repo"
import { FigtreeApiError } from "@figtree/lib/errors"

export const WorkspaceService = (
  repo: WorkspaceRepositoryParams,
  IdRepo?: IdRepoParams
) => {
  const findBySlug = async (slug: string, userId: string) => {
    const existingProfile = await IdRepo?.findByUserId(userId)
    const foundWorkspace = await repo.findBySlug(
      slug,
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
  }
}
