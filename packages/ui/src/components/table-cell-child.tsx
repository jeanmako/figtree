"use client";

import React from "react";
import { cn } from "@figtree/ui/lib/utils";
import { Badge } from "@figtree/ui/components/badge";

type TableCellChildState = {
  variant?: "profile" | "button" | "badge";
};

type HTMLProps<T extends React.ElementType = "span"> =
  React.ComponentPropsWithoutRef<T>;

type RenderProp<T extends React.ElementType = "span"> = (
  props: HTMLProps<T>,
  state: TableCellChildState,
) => React.ReactElement;

type Props<T extends React.ElementType = "span"> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "as"
> & {
  variant?: "profile" | "button" | "badge";
  className?: string;
  children?: React.ReactNode;

  // ✅ Addons
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;

  // ✅ Render wrapper
  render?: RenderProp<T>;

  // ✅ Polymorphic
  as?: T;
};

export function TableCellChild<T extends React.ElementType = "span">({
  variant,
  className,
  children,
  render,
  as: As = "span" as T,
  leftAddon,
  rightAddon,
  ...props
}: Props<T>) {
  const state: TableCellChildState = { variant };

  /**
   * ✅ Step 1: Core content (shared everywhere)
   */
  const content = (
    <span className="flex items-center gap-2 min-w-0 w-full">
      {leftAddon && <span className="shrink-0">{leftAddon}</span>}

      <span className="truncate min-w-0">{children}</span>

      {rightAddon && <span className="shrink-0 ml-auto">{rightAddon}</span>}
    </span>
  );

  /**
   * ✅ Step 2: Apply variant UI FIRST
   */
  const baseElement = (() => {
    switch (variant) {
      case "profile":
        return (
          <Badge
            variant="ghost"
            className={cn(
              "flex items-center gap-2 min-w-0 hover:bg-secondary/60",
              className,
            )}
          >
            {content}
          </Badge>
        );

      case "button":
        return (
          <button
            {...props}
            className={cn(
              "text-sm font-medium leading-5 text-left w-full hover:bg-muted transition-colors",
              className,
            )}
          >
            {content}
          </button>
        );

      default:
        return (
          <span
            {...props}
            className={cn(
              "text-sm font-medium leading-5 text-left w-full",
              className,
            )}
          >
            {content}
          </span>
        );
    }
  })();

  /**
   * ✅ Step 3: Wrap with render (Link, etc.)
   */
  if (render) {
    return render(
      {
        ...(props as HTMLProps<T>),
        className,
        children: baseElement, // 👈 wraps variant
      },
      state,
    );
  }

  /**
   * ✅ Step 4: Support polymorphic `as`
   */
  if (As !== "span") {
    return React.createElement(
      As,
      {
        ...props,
        className,
      },
      baseElement,
    );
  }

  /**
   * ✅ Step 5: Default return
   */
  return baseElement;
}
