import Fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod"
import fastifyCors from "@fastify/cors"
import { prismaPlugin } from "./plugins/prisma"
import { errorHandlerPlugin } from "./plugins/error-handler"
import { serverEnv } from "@figtree/shared/env/server"

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

  await fastify.register(fastifyCors, {
    origin: [serverEnv.CLIENT_ORIGIN],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    maxAge: 86400,
  })

  return fastify
}
