import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import {
  workspaceRepository,
  WorkspaceService,
} from "@figtree/modules/workspace"
import { profileRepository } from "@figtree/modules/identity/profile"
import {
  createWorkspaceSchema,
  CreateWorkspaceResponseSchema,
  workspaceQueryWithSlug,
  WorkspaceSchema,
  updateWorkspaceSchema,
} from "@figtree/shared/schemas/workspace"

export const workspaceRoutes: FastifyPluginAsyncZod = async (fastify) => {
  const repo = workspaceRepository(fastify.prisma)
  const profileRepo = profileRepository(fastify.prisma)
  const service = WorkspaceService(repo, profileRepo)

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: createWorkspaceSchema,
      response: {
        201: CreateWorkspaceResponseSchema,
      },
    },
    handler: async (req, reply) => {
      const workspace = await service.create(req.user!.id, {
        ...req.body,
      })
      return reply.status(201).send(workspace)
    },
  })
}

export const workspaceRoutesWithContext: FastifyPluginAsyncZod = async (
  fastify
) => {
  const repo = workspaceRepository(fastify.prisma)
  const profileRepo = profileRepository(fastify.prisma)
  const service = WorkspaceService(repo, profileRepo)

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      params: workspaceQueryWithSlug,
      response: {
        200: WorkspaceSchema,
      },
    },
    handler: async (req, reply) => {
      const workspace = await service.findBySlug(
        req.params.workspaceSlug,
        req.user?.id as string
      )
      return reply.status(200).send(workspace)
    },
  })

  fastify.route({
    method: "PATCH",
    url: "/",
    schema: {
      params: workspaceQueryWithSlug,
      body: updateWorkspaceSchema,
      response: {
        201: CreateWorkspaceResponseSchema,
      },
    },
    handler: async (req, reply) => {
      const workspace = await service.update({
        slug: req.params.workspaceSlug,
        userId: req.user!.id,
        payload: req.body,
      })

      return reply.status(201).send(workspace)
    },
  })
}
