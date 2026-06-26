"use client"

import { Input as InputPrimitive } from "@base-ui/react/input"
import type * as React from "react"

import { cn } from "@figtree/ui/lib/utils"

type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "sm" | "default" | "lg" | number
  unstyled?: boolean
}

function Input({
  className,
  size = "default",
  unstyled = false,
  ...props
}: InputProps) {
  return (
    <span
      className={
        cn(
          !unstyled &&
            "relative inline-flex w-full rounded-md bg-quietest text-sm font-medium ring ring-border transition-shadow has-focus-visible:ring-1 has-focus-visible:ring-ring has-disabled:opacity-64 has-aria-invalid:bg-destructive-chill has-aria-invalid:text-destructive has-focus-visible:has-aria-invalid:ring-destructive/40 has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none dark:not-in-data-[slot=group]:bg-clip-border dark:has-aria-invalid:ring-destructive-foreground/50 has-aria-invalid:[&_[data-slot=input]::placeholder]:text-destructive/70",
          className
        ) || undefined
      }
      data-size={size}
      data-slot="input-control"
    >
      <InputPrimitive
        className={cn(
          "h-7.5 w-full min-w-0 rounded-[inherit] px-2 outline-none placeholder:text-quieter",
          size === "sm" && "h-7 text-sm",
          size === "lg" && "h-9",
          props.type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          props.type === "file" &&
            "text-quiet file:me-3 file:bg-transparent file:text-sm file:font-normal file:text-foreground",
          className
        )}
        data-slot="input"
        size={typeof size === "number" ? size : undefined}
        {...props}
      />
    </span>
  )
}

export { Input, type InputProps }
