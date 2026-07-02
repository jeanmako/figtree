import { CreateServicePayload } from "@figtree/shared/schemas/services"
import { ServiceRepositoryParams } from "./service.repo"
import { createId } from "@figtree/utils/functions/id-factory"
import { Prisma } from "@figtree/prisma/client"
import { FigtreeApiError } from "@figtree/lib/errors"

export const ServiceService = (repo: ServiceRepositoryParams) => {
  const create = async (workspaceId: string, payload: CreateServicePayload) => {
    const { slug } = payload
    try {
      const service = await repo.create(workspaceId, {
        id: createId({ prefix: "svc_" }),
        ...payload,
        status: "draft",
      })
      return service
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new FigtreeApiError({
            code: "conflict",
            message: `A workspace with the slug "${slug}" already exists.`,
          })
        }
      }
      throw error
    }
  }

  return {
    create,
  }
}
