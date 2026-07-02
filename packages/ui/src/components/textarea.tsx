"use client"

import { Field as FieldPrimitive } from "@base-ui/react/field"
import { mergeProps } from "@base-ui/react/merge-props"
import type * as React from "react"

import { cn } from "@figtree/ui/lib/utils"

type TextareaProps = React.ComponentProps<"textarea"> & {
  size?: "sm" | "default" | "lg" | number
  unstyled?: boolean
}

function Textarea({
  className,
  size = "default",
  unstyled = false,
  ...props
}: TextareaProps) {
  return (
    <span
      className={
        cn(
          !unstyled &&
            "relative inline-flex w-full rounded-md bg-quietest bg-clip-padding text-tiny! font-medium shadow-xs ring ring-border transition-shadow has-focus-visible:ring-ring has-disabled:opacity-64 has-aria-invalid:border-destructive/80 has-aria-invalid:bg-destructive-chill! has-aria-invalid:text-destructive has-aria-invalid:ring-destructive/40 has-focus-visible:has-aria-invalid:border-destructive has-focus-visible:has-aria-invalid:ring-destructive/16 has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none dark:bg-clip-border dark:has-aria-invalid:ring-destructive/24 has-aria-invalid:[&_[data-slot=textarea]::placeholder]:text-destructive/70",
          className
        ) || undefined
      }
      data-size={size}
      data-slot="textarea-control"
    >
      <FieldPrimitive.Control
        render={(defaultProps) => (
          <textarea
            className={cn(
              "field-sizing-content max-h-28 min-h-20 w-full rounded-[inherit] px-2 py-1.5 outline-none placeholder:text-quieter",
              size === "sm" && "max-h-22 min-h-16 px-2.5 py-1",
              size === "lg" && "min-h-18.5 py-2"
            )}
            data-slot="textarea"
            {...mergeProps(defaultProps, props)}
          />
        )}
      />
    </span>
  )
}

export { Textarea, type TextareaProps }
