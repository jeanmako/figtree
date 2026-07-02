"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateServicePayload } from "@figtree/shared/schemas/services"
import { serviceKeys } from "@/modules/services/lib/keys"
import { toastManager } from "@figtree/ui/components/toast"
import { servicesApi } from "@/modules/services/lib/api"
import { useWorkspaceSlug } from "@/modules/workspace/hooks/workspace-slug"

export const useServiceCreateMutation = () => {
  const queryClient = useQueryClient()
  const workspaceSlug = useWorkspaceSlug()

  return useMutation({
    mutationFn: (data: CreateServicePayload) =>
      servicesApi.create(workspaceSlug as string, data),

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: serviceKeys.all(),
      })

      toastManager.add({ title: `Service ${data.name} created.` })
    },

    onError: (error: Error) => {
      toastManager.add({
        title: error.message ?? "Something went wrong",
        type: "error",
      })
    },
  })
}
