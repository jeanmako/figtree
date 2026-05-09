import { FastifyPluginAsync } from "fastify"
import { auth } from "@figtree/features/auth/auth"

const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: ["GET", "POST"],
    url: "/*",
    async handler(request, reply) {
      try {
        const rawUrl = request.raw.url || request.url || "/"
        const url = new URL(rawUrl, `http://${request.headers.host}`)

        const headers = new Headers()
        Object.entries(request.headers).forEach(([key, value]) => {
          if (value) headers.append(key, String(value))
        })

        const req = new Request(url.toString(), {
          method: request.method,
          headers,
          ...(request.body ? { body: JSON.stringify(request.body) } : {}),
        })

        const response = await auth.handler(req)

        reply.status(response.status)
        response.headers.forEach((value, key) => reply.header(key, value))
        reply.send(response.body ? await response.text() : null)
      } catch (error) {
        fastify.log.error({ err: error }, "Authentication Error:")
        reply.status(500).send({
          error: "Internal authentication error",
          code: "AUTH_FAILURE",
        })
      }
    },
  })
}

export default authRoutes
