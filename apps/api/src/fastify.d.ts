import { Session, User } from "@figtree/features/auth/types"
import { PrismaClient } from "@figtree/prisma/client"

declare module "fastify" {
  export interface FastifyRequest {
    session: Session | null
    user: User | null
  }

  export interface FastifyInstance {
    prisma: PrismaClient
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>
    requireAdmin: (req: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}
