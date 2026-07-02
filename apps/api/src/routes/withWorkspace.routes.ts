import { FastifyInstance } from "fastify"
import { workspaceRoutesWithContext } from "./workspaces/route"
import { serviceRoutes } from "./services/route"

/*
  - Routes that live within the workspace context
  - Workspace slug resolved to the worskpace ID
  - Workspace member authenticated and authorized
*/

export async function withWorkspaceRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", fastify.resolveWorkspace)

  await fastify.register(workspaceRoutesWithContext)
  await fastify.register(serviceRoutes, { prefix: "/services" })
}
