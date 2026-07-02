"use client"

import { PageContent } from "@/components/layout/page-content"
import { Icons } from "@figtree/ui/components/icons"
import EmptyState from "./components/table/empty-state"

export const ServicesPageClient = () => {
  return (
    <PageContent title="Services" icon={<Icons.briefcase2 />}>
      <div className="w-full rounded-xl bg-background p-20 shadow-square">
        <EmptyState />
      </div>
    </PageContent>
  )
}
