/* eslint-disable @typescript-eslint/no-unused-vars */
import fp from "fastify-plugin"
import { FigtreeApiError } from "@figtree/lib/errors"
import type { FastifyRequest, FastifyReply } from "fastify"
import { ProfileRepositoryParams } from "@figtree/modules/identity/profile"
import { WorkspaceRepositoryParams } from "@figtree/modules/workspace"
import { WorkspaceMemberParams } from "@figtree/shared/schemas/workspace"

export interface WorkspacePluginOptions {
  profileRepo: ProfileRepositoryParams
  workspaceRepo: WorkspaceRepositoryParams
}

export const workspacePlugin = fp<WorkspacePluginOptions>(
  async (fastify, opts) => {
    const { profileRepo, workspaceRepo } = opts

    // Decorate request with initial null values
    fastify.decorateRequest("workspace", null)
    fastify.decorateRequest("workspaceMembership", null)
    fastify.decorateRequest("profile", null)

    // Main workspace resolver
    fastify.decorate(
      "resolveWorkspace",
      async (req: FastifyRequest, _reply: FastifyReply) => {
        const { workspaceSlug } = req.params as { workspaceSlug: string }

        if (!workspaceSlug) {
          throw new FigtreeApiError({
            code: "bad_request",
            message: "Workspace slug required.",
          })
        }

        // 1. Get user's profile
        const profile = await profileRepo.findByUserId(req.user!.id)

        if (!profile) {
          throw new FigtreeApiError({
            code: "not_found",
            message: "Profile not found.",
          })
        }

        // 2. Get workspace with membership check
        const result = await workspaceRepo.findBySlugWithMember(
          workspaceSlug,
          profile.id
        )

        // 3. Handle case where user is not a member
        if (!result || !result.members) {
          // Check for pending invite
          const workspace = await workspaceRepo.findBySlug(
            workspaceSlug,
            profile.id
          )

          if (!workspace) {
            throw new FigtreeApiError({
              code: "not_found",
              message: "Workspace not found.",
            })
          }

          /* TODO: Add a pending invite check here when we have invites implemented.

          const pendingInvite = await inviteRepository.findPendingByEmail(
            req.user!.email,
            workspace.id
          )

          if (!pendingInvite) {
            // Don't reveal workspace exists to non-members
            throw new FigtreeApiError({
              code: "not_found",
              message: "Workspace not found.",
            })
          }

          if (pendingInvite.expiresAt < new Date()) {
            throw new FigtreeApiError({
              code: "invite_expired",
              message:
                "Your workspace invite has expired. Please request a new one.",
            })
          }

          throw new FigtreeApiError({
            code: "invite_pending",
            message: `You've been invited to join this workspace as a ${pendingInvite.role}. Please check your email to accept the invitation.`,
          })
        }
          */
        }

        // 4. Attach everything to request
        req.workspace = result
        req.workspaceMembership = result?.members[0] as WorkspaceMemberParams
        req.profile = profile

        // 5. Add workspace context to logger
        if (req.log) {
          req.log = req.log.child({
            workspaceId: result?.id,
            workspaceSlug: result?.slug,
            userRole: result?.members[0]?.role,
          })
        }
      }
    )
  },
  {
    name: "workspace-plugin",
    dependencies: ["auth-plugin"],
  }
)
