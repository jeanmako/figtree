import {
  CreateServicePayload,
  CreateServiceResponse,
} from "@figtree/shared/schemas/services"
import { fetcher } from "@figtree/lib/fetcher"
import { API_BASE } from "@/lib/api"

export const servicesApi = {
  create: async (workspaceSlug: string, payload: CreateServicePayload) =>
    fetcher<CreateServiceResponse>(
      `${API_BASE}/v1/workspaces/${workspaceSlug}/services`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    ),
}
