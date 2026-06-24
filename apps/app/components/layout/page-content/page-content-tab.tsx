"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@figtree/ui/lib/utils"
import { usePathname } from "next/navigation"

export type PageContentTabItem = {
  label: string
  icon?: React.ReactNode
  href: string
  count?: number
}

type Props = {
  tabs: PageContentTabItem[]
}

const PageContentTab = ({ tabs }: Props) => {
  const pathname = usePathname()

  return (
    <nav className="flex min-w-0 flex-row items-center gap-1">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "relative inline-flex shrink-0 items-center justify-center rounded-md bg-clip-padding text-sm font-medium tracking-snug whitespace-nowrap transition-all duration-300 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.75",
              "h-7 gap-1.5 px-1.5 py-1",
              isActive
                ? "bg-surface/70 text-foreground shadow-square"
                : "text-quiet hover:bg-surface/70 hover:text-foreground hover:shadow-square"
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="relative inline-flex h-3.5 items-center justify-center rounded-[4px] bg-accent px-1 text-[10px] leading-3.5 font-medium tracking-snug tabular-nums">
                {tab.count}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export default PageContentTab
