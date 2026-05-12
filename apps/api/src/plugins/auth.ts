/* eslint-disable @typescript-eslint/no-unused-vars */
import fp from "fastify-plugin"
import { FastifyRequest, FastifyReply } from "fastify"
import { FigtreeApiError } from "@figtree/lib/errors"
import { auth } from "@figtree/features/auth/auth"
import { isPublicRoute } from "./misc"

export const authPlugin = fp(
  async (fastify) => {
    fastify.decorateRequest("user", null)
    fastify.decorateRequest("session", null)

    fastify.addHook("preHandler", async (request: FastifyRequest) => {
      const url = request.url

      // Skip session retrieval for public routes
      if (isPublicRoute(url)) {
        return
      }

      try {
        const session = await auth.api.getSession({
          headers: new Headers(request.headers as Record<string, string>),
        })

        if (session?.user) {
          request.user = session.user
          request.session = session.session

          request.log = request.log.child({
            userId: session.user.id,
            userEmail: session.user.email,
            userRole: request.user.role,
            url,
          })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // Only log non-401 errors to avoid noise
        if (err.status !== 401) {
          fastify.log.warn({ err, url }, "Session retrieval failed")
        }
      }
    })

    // Authentication guard
    fastify.decorate(
      "authenticate",
      async (request: FastifyRequest, _reply: FastifyReply) => {
        if (!request.user) {
          const hadSession = !!(
            request.headers.authorization || request.headers.cookie
          )

          throw new FigtreeApiError({
            code: hadSession ? "session_expired" : "unauthorized",
            message: hadSession
              ? "Your session has expired. Please log in again."
              : "Authentication required. Please log in.",
          })
        }
      }
    )

    // Admin guard
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
          fastify.log.warn(
            {
              userId: request.user.id,
              userRole: request.user.role,
            },
            "Non-admin attempted to access admin route"
          )

          throw new FigtreeApiError({
            code: "forbidden",
            message: "Admin access required",
          })
        }
      }
    )

    // Role-based guard (factory)
    fastify.decorate("requireRole", (allowedRoles: string[]) => {
      return async (request: FastifyRequest, _reply: FastifyReply) => {
        if (!request.user) {
          throw new FigtreeApiError({
            code: "unauthorized",
            message: "Authentication required",
          })
        }

        if (!allowedRoles.includes(request.user.role as string)) {
          throw new FigtreeApiError({
            code: "forbidden",
            message: `This action requires one of these roles: ${allowedRoles.join(", ")}`,
          })
        }
      }
    })

    // Decorator to check if user is authenticated for conditional logic
    fastify.decorate("isAuthenticated", (request: FastifyRequest): boolean => {
      return !!request.user
    })
  },
  {
    name: "auth-plugin",
  }
)
