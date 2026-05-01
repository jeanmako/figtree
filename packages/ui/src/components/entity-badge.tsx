"use client";

import { type ReactNode } from "react";
import { Badge } from "@figtree/ui/components/badge";
import { Icons } from "@figtree/ui/components/icons";
import { cn } from "@figtree/ui/lib/utils";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@figtree/ui/components/popover";
import { Button } from "@figtree/ui/components/button";

interface EntityBadgeProps {
  name: string;
  onRemove?: () => void;
  href?: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
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
              "flex items-center gap-1.5 cursor-pointer h-5.5 data-popup-open:ring-0!",
              // disabled && "cursor-not-allowed opacity-50",
              className,
            )}
          />
        }
        disabled={disabled}
      >
        <span className="truncate max-w-30">{name}</span>

        {href && (
          <a
            href={href}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-foreground text-quiet  duration-300 transition-colors"
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
          className="p-2.5 w-80 **:data-[slot=popover-popup]:min-w-full"
          side="bottom"
          align="center"
          sideOffset={4}
        >
          <div className="flex items-center justify-between mb-3 w-full">
            <span className="text-sm font-medium text-foreground">{name}</span>
            {onRemove && (
              <Button
                type="button"
                onClick={onRemove}
                size="icon-xs"
                variant="ghost"
              >
                <Icons.x className="size-3.5 text-quiet" />
              </Button>
            )}
          </div>
          {children}
        </PopoverPopup>
      )}
    </Popover>
  );
}
