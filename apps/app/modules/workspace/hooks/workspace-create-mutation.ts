import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateWorkspacePayload } from "@figtree/shared/schemas/workspace"
import { workspaceKeys } from "@/modules/workspace/lib/keys"
import { toastManager } from "@figtree/ui/components/toast"
import { workspacesApi } from "../lib/api"

export const useCreateWorkspaceMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateWorkspacePayload) => workspacesApi.create(data),

    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: workspaceKeys.userWorkspaces(),
        }),
        queryClient.invalidateQueries({
          queryKey: workspaceKeys.list(),
        }),
      ])

      queryClient.setQueryData(workspaceKeys.detail(data.slug), data)

      toastManager.add({ title: `${data.name} was created successfully.` })
    },

    onError: (error: Error) => {
      toastManager.add({
        title: error.message ?? "Something went wrong",
        type: "error",
      })
    },
  })
}
