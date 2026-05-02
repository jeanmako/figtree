/* eslint-disable @typescript-eslint/no-unused-vars */
import fp from "fastify-plugin"
import { FastifyRequest, FastifyReply } from "fastify"
import { FigtreeApiError } from "@figtree/utils/functions/errors"
import { auth } from "@figtree/features/auth/auth"

export const authPlugin = fp(async (fastify) => {
  fastify.decorateRequest("user", null)
  fastify.decorateRequest("session", null)

  fastify.addHook("preHandler", async (request: FastifyRequest) => {
    try {
      const session = await auth.api.getSession({
        headers: new Headers(request.headers as Record<string, string>),
      })

      if (session?.user) {
        request.user = session.user
        request.session = session.session
      }
    } catch (err) {
      fastify.log.warn({ err }, "Session retrieval failed")
    }
  })

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, _reply: FastifyReply) => {
      if (!request.user) {
        throw new FigtreeApiError({
          code: "unauthorized",
          message: "Authentication required",
        })
      }
    }
  )
  fastify.decorate(
    "requireAdmin",
    async (request: FastifyRequest, _reply: FastifyReply) => {
      if (!request.user) {
        throw new FigtreeApiError({
          code: "unauthorized",
          message: "Authentication required",
        })
      }
      if (request.user.role !== "admin") {
        throw new FigtreeApiError({
          code: "forbidden",
          message: "Admin access required",
        })
      }
    }
  )
})
