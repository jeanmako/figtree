import { Session, User } from "@figtree/features/auth/types"
import { PrismaClient, Workspace } from "@figtree/prisma/client"
import { WorkspaceMemberParams } from "@figtree/shared/schemas/workspace"
import { ProfileParams } from "@figtree/shared/schemas/profile"

// TODO: Implement Typescript types instead of Prisma

declare module "fastify" {
  export interface FastifyRequest {
    session: Session | null
    user: User | null
    workspace: Workspace | null
    workspaceMembership: WorkspaceMemberParams | null
    profile: ProfileParams | null
  }

  export interface FastifyInstance {
    prisma: PrismaClient
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>
    requireAdmin: (req: FastifyRequest, reply: FastifyReply) => Promise<void>
    resolveWorkspace: (
      req: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>
  }
}
