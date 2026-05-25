"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@figtree/ui/lib/utils";
import { NavItem as NavItemType } from "./nav-areas";

export function NavItem({ item }: { item: NavItemType }): React.ReactElement {
  const pathname = usePathname();

  const isActive = item.isActive
    ? item.isActive(pathname, item.href)
    : item.exact
      ? pathname === item.href
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      data-active={isActive}
      className={cn(
        "flex h-7.5 items-center gap-2 rounded-md px-2 text-sm font-medium",
        "text-sidebar-foreground transition-colors duration-100",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
      )}
    >
      {item.icon && (
        <span className="size-3.5 shrink-0 [&>svg]:size-full text-duper">
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
  );
}
