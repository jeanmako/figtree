"use client"

import { useParams, usePathname } from "next/navigation"
import { NAV_AREAS, NavAreaKey } from "@/components/layout/sidebar/nav-areas"
import { NavItem } from "@/components/layout/sidebar/nav-item"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from "@figtree/ui/components/sidebar"
import { WorkspaceMenu } from "@/components/layout/sidebar/workspace-menu"
import { SidebarBtnTrigger } from "@/components/layout/sidebar/sidebar-trigger"
import Link from "next/link"
import { Button } from "@figtree/ui/components/button"
import { Icons } from "@figtree/ui/components/icons"

export function AppSidebar(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>()
  const pathname = usePathname()

  const isSettings = pathname.startsWith(`/${slug}/settings`)
  const currentArea: NavAreaKey = isSettings ? "settings" : "main"

  const area = NAV_AREAS[currentArea]({
    slug,
    pathname,
  })

  return (
    <Sidebar collapsible={isSettings ? "none" : "offcanvas"}>
      <SidebarHeader>
        {isSettings ? (
          <div className="inline-flex h-12 items-center px-3">
            <Link href={`/${slug}`}>
              <Button variant="ghost" size="icon-sm">
                <Icons.chevronLeft />
              </Button>
            </Link>
            <span className="ml-3 truncate text-base font-semibold">
              Settings
            </span>
          </div>
        ) : (
          <>
            <WorkspaceMenu />
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <SidebarBtnTrigger isOutside={false} />
            </div>
          </>
        )}
      </SidebarHeader>

      <SidebarContent>
        {area.content.map((group, i) => (
          <SidebarGroup key={i}>
            {group.name && <SidebarGroupLabel>{group.name}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <NavItem item={item} />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
