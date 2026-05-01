import fp from "fastify-plugin"
import { Prisma } from "@figtree/prisma/client"
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod"
import { ErrorCodeKey, FigtreeApiError } from "@figtree/utils/functions/errors"
import { serverEnv } from "@figtree/shared/env/server"

function mapPrismaError(error: Prisma.PrismaClientKnownRequestError): {
  code: ErrorCodeKey
  statusCode: number
  message: string
} {
  switch (error.code) {
    case "P2002":
      return {
        code: "conflict",
        statusCode: 409,
        message: "A record with this value already exists.",
      }
    case "P2025":
      return {
        code: "not_found",
        statusCode: 404,
        message: "Record not found.",
      }
    case "P2003":
      return {
        code: "bad_request",
        statusCode: 400,
        message: "Related record not found.",
      }
    case "P2014":
      return {
        code: "conflict",
        statusCode: 409,
        message: "This operation would violate a required relation.",
      }
    default:
      return {
        code: "internal_server_error",
        statusCode: 500,
        message: "Database error.",
      }
  }
}

export const errorHandlerPlugin = fp(async (fastify) => {
  fastify.setErrorHandler((error, _request, reply) => {
    // Zod schema validation — body, params, querystring, headers
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.status(400).send({
        error: "bad_request",
        message: "Invalid request data",
        fields: error.validation,
      })
    }

    // Figtree semantic errors — thrown from services
    if (error instanceof FigtreeApiError) {
      return reply.status(error.statusCode).send({
        error: error.code,
        message: error.message,
      })
    }

    // Prisma known request errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const mapped = mapPrismaError(error)
      return reply.status(mapped.statusCode).send({
        error: mapped.code,
        message: mapped.message,
      })
    }

    // Prisma validation errors — invalid data passed to Prisma
    if (error instanceof Prisma.PrismaClientValidationError) {
      return reply.status(400).send({
        error: "bad_request",
        message:
          serverEnv.NODE_ENV === "production"
            ? "Invalid data provided"
            : error.message,
      })
    }

    // Prisma initialization errors — connection issues
    if (error instanceof Prisma.PrismaClientInitializationError) {
      fastify.log.error(error, "Prisma initialization error")
      return reply.status(500).send({
        error: "internal_server_error",
        message: "Database connection error",
      })
    }

    // Unknown — log and hide internals in production
    const err = error instanceof Error ? error : new Error(String(error))
    fastify.log.error(err)
    return reply.status(500).send({
      error: "internal_server_error",
      message:
        serverEnv.NODE_ENV === "production"
          ? "An unexpected error occurred"
          : err.message,
    })
  })
})
