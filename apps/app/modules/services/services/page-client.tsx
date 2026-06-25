"use client"

import { PageContent } from "@/components/layout/page-content"
import { useWorkspaceSlug } from "@/modules/workspace/hooks/workspace-slug"
import { buttonVariants } from "@figtree/ui/components/button"
import { Icons } from "@figtree/ui/components/icons"
import { Monochromes } from "@figtree/ui/components/monochromes"
import { cn } from "@figtree/ui/lib/utils"
import Link from "next/link"
import React from "react"

export const ServicesPageClient = () => {
  const slug = useWorkspaceSlug()
  return (
    <PageContent title="Services" icon={<Icons.briefcase2 />}>
      <div className="w-full rounded-xl bg-surface p-20 shadow-square">
        <div className="flex flex-col items-center">
          <div className="flex w-full max-w-sm flex-initial flex-col items-center gap-y-6">
            <div className="flex justify-start">
              <Monochromes.briefcase className="size-24 shrink-0" />
            </div>
            <div className="flex flex-initial flex-col items-center gap-y-6">
              <div className="flex flex-col items-center gap-y-2">
                <span className="text-left text-sm leading-6 font-semibold">
                  Build your service catalog
                </span>
                <p className="text-center text-tiny font-medium tracking-snug text-duper">
                  Package your expertise into clear, repeatable offerings. Every
                  service becomes a reusable foundation for proposals,
                  contracts, projects, and client onboarding.
                </p>
              </div>
              <div className="flex items-center gap-x-4">
                <Link
                  href={`/${slug}/services/new`}
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  Create service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  )
}
