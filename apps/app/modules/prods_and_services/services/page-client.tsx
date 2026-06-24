"use client"

import { PageContent } from "@/components/layout/page-content"
import { Icons } from "@figtree/ui/components/icons"
import { Header } from "@figtree/ui/components/shared/section-layout"
import React from "react"
import { useWorkspaceSlug } from "@/modules/workspace/hooks/workspace-slug"

export const ServicesPageClient = () => {
  const workspaceSlug = useWorkspaceSlug()
  return (
    <PageContent
      tabs={[
        {
          label: "Overview",
          icon: <Icons.home2 />,
          href: `/${workspaceSlug}products/overview`,
          // count: 5,
        },
        {
          label: "Products",
          icon: <Icons.tag2 />,
          href: `/${workspaceSlug}products/products`,
        },
        {
          label: "Services",
          icon: <Icons.briefcase2 />,
          href: `/${workspaceSlug}products/services`,
        },
        {
          label: "Retainers",
          icon: <Icons.packages />,
          href: `/${workspaceSlug}products/retainers`,
        },
      ]}
    >
      <Header
        title="Good afternoon, Mike."
        className="[&_h2]:mt-0 [&_h2]:text-left"
      />
    </PageContent>
  )
}
