"use client"

import { Header } from "@figtree/ui/components/shared/section-layout"
import { WorkspaceGeneralSettings } from "./components/workspace-general-settings"
import { WorkspaceTimeLocaleSettings } from "./components/workspace-time-locale-settings"
import { WorkspaceBusinessSettings } from "./components/workspace-business-settings"
import { useWorkspaceQuery } from "@/modules/workspace/hooks/workspace-query"
import { WorkspaceResponse } from "@figtree/shared/schemas/workspace"

export const SettingsPageClient = () => {
  const workspace = useWorkspaceQuery()

  return (
    <div className="mx-8 flex flex-col items-center">
      <div className="flex w-full max-w-210 flex-col items-center py-15">
        <Header
          title="General"
          description="Change the settings for your current workspace. Learn more"
        />
        <div className="flex w-full flex-initial flex-col gap-y-8">
          <WorkspaceGeneralSettings
            workspace={workspace as WorkspaceResponse}
          />
          <WorkspaceTimeLocaleSettings
            workspace={workspace as WorkspaceResponse}
          />
          <WorkspaceBusinessSettings
            workspace={workspace as WorkspaceResponse}
          />
        </div>
      </div>
    </div>
  )
}
