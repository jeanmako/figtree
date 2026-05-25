"use client"

import { useQuery } from "@tanstack/react-query"
import { useWorkspaceSlug } from "./workspace-slug"
import { workspacesApi } from "@/modules/workspace/lib/api"
import { WorkspaceResponse } from "@figtree/shared/schemas/workspace"
import { workspaceKeys } from "../lib/keys"
import { useSession } from "@figtree/features/auth/auth-client"

export const useWorkspaceQuery = () => {
  const slug = useWorkspaceSlug()

  const {
    data: workspace,
    error,
    isLoading: loading,
    refetch,
  } = useQuery<WorkspaceResponse>({
    queryKey: workspaceKeys.detail(slug as string),
    queryFn: () => workspacesApi.get(slug as string),
    enabled: !!slug,
  })

  return {
    ...workspace,
    role: (workspace?.members && workspace.members[0]?.role) || "member",
    isOwner: workspace?.members && workspace.members[0]?.role === "owner",
    isAdmin: workspace?.members && workspace.members[0]?.role === "admin",
    plan: workspace?.plan,
    vertical: workspace?.vertical,
    loading,
    error,
    refetch,
  }
}

export const useWorkspacesQuery = () => {
  const { data: session } = useSession()

  const {
    data: workspaces,
    error,
    isLoading: loading,
    refetch,
  } = useQuery<WorkspaceResponse[]>({
    queryKey: workspaceKeys.list(),
    queryFn: () => workspacesApi.list(),
    enabled: !!session && !!session.user.id,
  })
  return {
    workspaces,
    loading,
    refetch,
    error,
  }
}
