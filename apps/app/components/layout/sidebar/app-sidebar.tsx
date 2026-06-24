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
  SidebarFooter,
} from "@figtree/ui/components/sidebar"
import Link from "next/link"
import { Button, buttonVariants } from "@figtree/ui/components/button"
import { Icons } from "@figtree/ui/components/icons"
import { cn } from "../../../../../packages/ui/src/lib/utils"

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
    <Sidebar
      collapsible="none"
      className="fixed inset-y-0 top-14 h-[calc(100%-3.5rem)] rounded-ss-[12px] group-data-[side=left]:border-r-0"
    >
      {isSettings && (
        <SidebarHeader>
          <div className="inline-flex h-12 items-center px-3">
            <div className="flex flex-initial flex-row"></div>
            <Link
              href={area.backHref as string}
              className={cn(
                buttonVariants({ size: "sm", variant: "ghost" }),
                "hover:bg-sidebar-primary"
              )}
            >
              <Icons.chevronLeft />
              <span className="truncate font-semibold">{area.title}</span>
            </Link>
          </div>
        </SidebarHeader>
      )}

      <SidebarContent>
        {area.content.map((group, i) => (
          <SidebarGroup key={i}>
            {group.name && <SidebarGroupLabel>{group.name}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <div className="flex w-full px-3">
                      <NavItem item={item} />
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <div className="sticky bottom-0 z-1 bg-sidebar py-3">
        <SidebarFooter className="gap-0 p-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex w-full px-3">
                <NavItem
                  item={{
                    name: "Settings",
                    icon: <Icons.settings />,
                    href: `/${slug}/settings`,
                  }}
                />
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <div className="flex w-full px-3">
                <NavItem
                  item={{
                    name: "Invite your team",
                    icon: <Icons.users />,
                    href: `/${slug}/members`,
                  }}
                />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  )
}
