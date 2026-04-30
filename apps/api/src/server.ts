/* eslint-disable turbo/no-undeclared-env-vars */

import Fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod"
import fastifyCors from "@fastify/cors"

export async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
    },
  }).withTypeProvider<ZodTypeProvider>()

  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)

  await fastify.register(fastifyCors, {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    maxAge: 86400,
  })

  return fastify
}
