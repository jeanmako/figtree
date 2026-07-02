import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { serviceRepository, ServiceService } from "@figtree/modules/service"
import {
  createServiceSchema,
  CreateServiceResponseSchema,
} from "@figtree/shared/schemas/services"

export const serviceRoutes: FastifyPluginAsyncZod = async (fastify) => {
  const repo = serviceRepository(fastify.prisma)
  const service = ServiceService(repo)

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: createServiceSchema,
      response: {
        201: CreateServiceResponseSchema,
      },
    },
    handler: async (req, reply) => {
      const response = await service.create(
        req.workspace?.id as string,
        req.body
      )
      return reply.status(201).send(response)
    },
  })
}
