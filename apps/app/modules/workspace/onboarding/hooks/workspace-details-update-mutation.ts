"use client"

// Tied to onboarding, that is why we created it here instead of the workspace's hook folder

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { WorkspaceBusinessSetupPayload } from "@figtree/shared/schemas/workspace"
import { workspaceKeys } from "@/modules/workspace/lib/keys"
import { toastManager } from "@figtree/ui/components/toast"
import { workspacesApi } from "@/modules/workspace/lib/api"
import { useWorkspaceQuery } from "@/modules/workspace/hooks/workspace-query"

export const useUpdateWorkspaceDetailsMutation = () => {
  const queryClient = useQueryClient()
  const { slug: workspaceSlug } = useWorkspaceQuery()

  return useMutation({
    mutationFn: (data: WorkspaceBusinessSetupPayload) =>
      workspacesApi.updateDetails(workspaceSlug as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceKeys.userWorkspaces(),
      })
      toastManager.add({ title: `Workspace business details set!` })
    },
    onError: (error) => {
      toastManager.add({
        title: error.message ?? "Something went wrong",
        type: "error",
      })
    },
  })
}
