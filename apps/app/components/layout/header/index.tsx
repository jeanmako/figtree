import { Icons } from "@figtree/ui/components/icons"
import React from "react"
import { WorkspaceMenu } from "./workspace-menu"
import { ActivityControl } from "./activity-control"
import { Button } from "@figtree/ui/components/button"

export const DashboardHeader = () => {
  return (
    <div className="inset-s-0 fixed top-0 z-10 h-14 w-full bg-super">
      <div className="flex h-full w-full items-center justify-start">
        <div className="flex h-full flex-1 items-center">
          <div className="h-full w-60">
            <div className="flex h-full items-center px-6">
              <Icons.logoWithText className="h-6 w-auto text-foreground-inverse" />
            </div>
          </div>
        </div>
        <div className="flex h-full flex-1 items-center justify-center">
          <ActivityControl />
        </div>
        <div className="flex h-full flex-1 items-center justify-end gap-x-2">
          <Button size="icon-xl" variant="inverse">
            <Icons.leaf className="size-4!" />
            <span className="sr-only">Ask Fig</span>
          </Button>
          <WorkspaceMenu />
        </div>
      </div>
    </div>
  )
}
