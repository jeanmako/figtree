import { Header } from "@figtree/ui/components/shared/section-layout"
import React from "react"

export const SettingsPageClient = () => {
  return (
    <div className="mx-8 mb-12 flex flex-col items-center">
      <div className="flex w-full max-w-180 flex-col items-center py-15">
        <Header
          title="General"
          description="Change the settings for your current workspace. Learn more
"
        />
      </div>
    </div>
  )
}
