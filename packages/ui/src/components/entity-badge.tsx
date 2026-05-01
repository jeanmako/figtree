"use client"

import { type ReactNode } from "react"
import { Badge } from "@figtree/ui/components/badge"
import { Icons } from "@figtree/ui/components/icons"
import { cn } from "@figtree/ui/lib/utils"
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@figtree/ui/components/popover"
import { Button } from "@figtree/ui/components/button"

interface EntityBadgeProps {
  name: string
  onRemove?: () => void
  href?: string
  disabled?: boolean
  children?: ReactNode
  className?: string
}

export function EntityBadge({
  name,
  onRemove,
  href,
  disabled = false,
  children,
  className,
}: EntityBadgeProps) {
  return (
    <Popover>
      <PopoverTrigger
        nativeButton={false}
        render={
          <Badge
            variant="ghost"
            className={cn(
              "flex h-5.5 cursor-pointer items-center gap-1.5 data-popup-open:ring-0!",
              // disabled && "cursor-not-allowed opacity-50",
              className
            )}
          />
        }
        disabled={disabled}
      >
        <span className="max-w-30 truncate">{name}</span>

        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${name} in new tab`}
            onClick={(e) => e.stopPropagation()}
            className="text-quiet transition-colors duration-300 hover:text-foreground"
          >
            <Icons.linkExternal className="size-3" />
          </a>
        )}

        {/* {onRemove && !disabled && (
          <Icons.xFill
            className="size-3 hover:text-destructive transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          />
        )} */}
      </PopoverTrigger>

      {children && (
        <PopoverPopup
          className="w-80 p-2.5 **:data-[slot=popover-popup]:min-w-full"
          side="bottom"
          align="center"
          sideOffset={4}
        >
          <div className="mb-3 flex w-full items-center justify-between">
            <span className="text-sm font-medium text-foreground">{name}</span>
            {onRemove && (
              <Button
                type="button"
                onClick={onRemove}
                size="icon-xs"
                variant="ghost"
              >
                <Icons.x className="text-quiet size-3.5" />
              </Button>
            )}
          </div>
          {children}
        </PopoverPopup>
      )}
    </Popover>
  )
}
