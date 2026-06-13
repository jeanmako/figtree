import { PageContent } from "@/components/layout/page-content"
import { SettingsPageClient } from "@/modules/workspace/settings/general/page-client"
import { Icons } from "@figtree/ui/components/icons"

const WorkspaceSettingsPage = () => {
  return (
    <PageContent title="General" icon={<Icons.layout />}>
      <SettingsPageClient />
    </PageContent>
  )
}

export default WorkspaceSettingsPage
