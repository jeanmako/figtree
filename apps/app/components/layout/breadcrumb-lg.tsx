"use client"

import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@figtree/ui/components/breadcrumb"
import { useWorkspaceSlug } from "@/modules/workspace/hooks/workspace-slug"
import { buttonVariants } from "@figtree/ui/components/button"
import { cn } from "@figtree/ui/lib/utils"

type Props = {
  icon: React.ReactNode
  href: string
  backTo: string
  label: string
}

export const BreadcrumbLg = ({ icon, href, backTo, label }: Props) => {
  const slug = useWorkspaceSlug()
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-foreground [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5"
            aria-label={backTo}
            render={
              <Link
                href={`/${slug}${href}`}
                className={cn(
                  buttonVariants({ size: "icon-xs", variant: "ghost" }),
                  "-me-1"
                )}
              />
            }
          >
            {icon}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-lg leading-5.5 font-semibold">
            {label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
