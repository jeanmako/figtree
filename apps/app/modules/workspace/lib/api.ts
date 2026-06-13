import { API_BASE } from "@/lib/api"
import { fetcher } from "@figtree/lib/fetcher"
import {
  CreateWorkspacePayload,
  WorkspaceResponse,
  WorkspaceCreateResponse,
  UpdateWorkspacePayload,
} from "@figtree/shared/schemas/workspace"
import { type FetchError } from "@figtree/lib/fetcher"

export const workspacesApi = {
  list: () => fetcher<WorkspaceResponse[]>(`${API_BASE}/v1/workspaces`),
  get: (workspaceSlug: string) =>
    fetcher<WorkspaceResponse>(
      `${API_BASE}/v1/workspaces/${workspaceSlug}`
    ).catch((error: FetchError) => {
      if (error && error.status === 404) {
        throw new Error("Workspace not found.")
      }
      throw error
    }),
  create: (payload: CreateWorkspacePayload) =>
    fetcher<WorkspaceCreateResponse>(`${API_BASE}/v1/workspaces`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (workspaceSlug: string, payload: UpdateWorkspacePayload) =>
    fetcher<WorkspaceCreateResponse>(
      `${API_BASE}/v1/workspaces/${workspaceSlug}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      }
    ),
}
