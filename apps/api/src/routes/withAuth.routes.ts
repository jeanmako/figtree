import { FastifyInstance } from "fastify"
import { workspaceRoutes } from "./workspaces/route"
import { withWorkspaceRoutes } from "./withWorkspace.routes"

export async function protectedRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", fastify.authenticate)

  await fastify.register(workspaceRoutes, { prefix: "/workspaces" })

  await fastify.register(withWorkspaceRoutes, {
    prefix: "/workspaces/:workspaceSlug",
  })
}
