import Fastify from "fastify"
import { serverEnv } from "@figtree/shared/env/server"
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod"
import fastifyCors from "@fastify/cors"
import { prismaPlugin } from "./plugins/prisma"
import { errorHandlerPlugin } from "./plugins/error-handler"
import authRoutes from "./routes/auth/route"

export async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: serverEnv.NODE_ENV === "production" ? "info" : "debug",
    },
  }).withTypeProvider<ZodTypeProvider>()

  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)

  // Layer 1 — Infrastructure
  await fastify.register(prismaPlugin)

  await fastify.register(errorHandlerPlugin)

  console.log(serverEnv.CLIENT_ORIGIN)

  await fastify.register(fastifyCors, {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    maxAge: 86400,
  })

  // Layer 4 — Public routes
  await fastify.register(authRoutes, { prefix: "/api/auth" })

  return fastify
}
