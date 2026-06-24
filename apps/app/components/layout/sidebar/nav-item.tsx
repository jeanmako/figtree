"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@figtree/ui/lib/utils"
import { NavItem as NavItemType } from "./nav-areas"

export function NavItem({ item }: { item: NavItemType }): React.ReactElement {
  const pathname = usePathname()

  const isActive = item.isActive
    ? item.isActive(pathname, item.href)
    : item.exact
      ? pathname === item.href
      : pathname.startsWith(item.href)

  return (
    <Link
      href={item.href}
      data-active={isActive}
      className={cn(
        "flex h-7 w-full items-center gap-2 rounded-md ps-2 pe-1 text-tiny! leading-tight font-semimedium tracking-normal",
        "text-sidebar-foreground transition-colors duration-300",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive &&
          "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
      )}
    >
      {item.icon && (
        <span className="size-4 shrink-0 text-duper [&>svg]:size-4">
          {item.icon}
        </span>
      )}
      <span className="truncate">{item.name}</span>
      {item.badge !== undefined && item.badge !== 0 && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums">
          {typeof item.badge === "number" && item.badge > 99
            ? "99+"
            : item.badge}
        </span>
      )}
    </Link>
  )
}
