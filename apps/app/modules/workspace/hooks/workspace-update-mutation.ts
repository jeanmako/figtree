import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  UpdateWorkspacePayload,
  WorkspaceCreateResponse,
  WorkspaceResponse,
} from "@figtree/shared/schemas/workspace"
import { workspaceKeys } from "@/modules/workspace/lib/keys"
import { toastManager } from "@figtree/ui/components/toast"
import { workspacesApi } from "../lib/api"
import { useWorkspaceQuery } from "./workspace-query"

export const useUpdateWorkspaceMutation = () => {
  const queryClient = useQueryClient()
  const { slug: workspaceSlug } = useWorkspaceQuery()

  return useMutation({
    mutationFn: ({
      slug = workspaceSlug as string,
      data,
    }: {
      slug?: string
      data: UpdateWorkspacePayload
    }) => workspacesApi.update(slug, data),

    onSuccess: (updatedWorkspace: WorkspaceCreateResponse, { slug }) => {
      // Update detail cache
      queryClient.setQueryData(
        workspaceKeys.detail(slug),
        (old: WorkspaceResponse | undefined) => ({
          ...old,
          ...updatedWorkspace, // Only updates the fields we returned
        })
      )

      // Invalidate lists if name or slug changed
      if (updatedWorkspace.name || updatedWorkspace.slug) {
        queryClient.invalidateQueries({
          queryKey: workspaceKeys.userWorkspaces(),
        })
      }

      toastManager.add({ title: "Workspace updated." })
    },

    onError: (error: Error) => {
      toastManager.add({
        title: error.message ?? "Something went wrong",
        type: "error",
      })
    },
  })
}
