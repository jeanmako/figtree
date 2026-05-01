"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";

import { cn } from "@figtree/ui/lib/utils";

type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "sm" | "default" | "lg" | number;
  unstyled?: boolean;
};

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
            "relative inline-flex w-full rounded-md bg-quietest text-tiny font-medium transition-shadow has-aria-invalid:bg-destructive-chill has-aria-invalid:text-destructive has-focus-visible:has-aria-invalid:ring-destructive/40 has-aria-invalid:[&_[data-slot=input]::placeholder]:text-destructive/70 has-focus-visible:ring-1 has-focus-visible:ring-ring has-disabled:opacity-64 has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none dark:not-in-data-[slot=group]:bg-clip-border dark:has-aria-invalid:ring-destructive-foreground/50",
          className,
        ) || undefined
      }
      data-size={size}
      data-slot="input-control"
    >
      <InputPrimitive
        className={cn(
          "w-full min-w-0 px-2 h-8 outline-none placeholder:text-quieter rounded-[inherit]",
          size === "sm" && "h-7",
          size === "lg" && "h-9 text-sm",
          // size === "xl" && "h-11 text-base",
          props.type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          props.type === "file" &&
            "text-quiet file:me-3 file:bg-transparent file:font-normal file:text-foreground file:text-sm",
          className,
        )}
        data-slot="input"
        size={typeof size === "number" ? size : undefined}
        {...props}
      />
    </span>
  );
}

export { Input, type InputProps };
