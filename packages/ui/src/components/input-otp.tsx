"use client"

import { OTPFieldPreview as OTPFieldPrimitive } from "@base-ui/react/otp-field"
import type * as React from "react"
import { cn } from "@figtree/ui/lib/utils"
import { Separator } from "@figtree/ui/components/separator"

export function OTPField({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Root> & {
  size?: "default" | "lg"
}): React.ReactElement {
  return (
    <OTPFieldPrimitive.Root
      className={cn(
        "flex items-center gap-2 has-disabled:opacity-64 has-disabled:**:data-[slot=otp-field-input]:shadow-none has-disabled:**:data-[slot=otp-field-input]:before:shadow-none!",
        "has-aria-invalid:**:data-[slot=[otp-field-input]::placeholder]:text-destructive/70 has-aria-invalid:**:data-[slot=otp-field-input]:border-destructive-chill has-aria-invalid:**:data-[slot=otp-field-input]:text-destructive has-focus-visible:has-aria-invalid:**:data-[slot=otp-field-input]:ring-destructive/40 dark:has-focus-visible:has-aria-invalid:**:data-[slot=otp-field-input]:ring-destructive-foreground/50",
        className
      )}
      data-size={size}
      data-slot="otp-field"
      {...props}
    />
  )
}

export function OTPFieldInput({
  className,
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Input>): React.ReactElement {
  return (
    <OTPFieldPrimitive.Input
      className={cn(
        "relative size-9 min-w-0 rounded-md bg-quietest text-center text-base leading-9 text-foreground ring-ring transition-shadow outline-none not-dark:bg-clip-padding placeholder:text-quieter focus-visible:z-10 focus-visible:shadow-none focus-visible:ring-1 focus-visible:placeholder:text-transparent in-[[data-slot=otp-field][data-size=lg]]:size-9 in-[[data-slot=otp-field][data-size=lg]]:text-lg in-[[data-slot=otp-field][data-size=lg]]:leading-10 aria-invalid:shadow-none sm:size-8 sm:text-sm sm:leading-8 sm:in-[[data-slot=otp-field][data-size=lg]]:size-11 sm:in-[[data-slot=otp-field][data-size=lg]]:text-base sm:in-[[data-slot=otp-field][data-size=lg]]:leading-9",

        className
      )}
      data-slot="otp-field-input"
      spellCheck={false}
      {...props}
    />
  )
}

export function OTPFieldSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>): React.ReactElement {
  return (
    <OTPFieldPrimitive.Separator
      render={
        <Separator
          className={cn(
            "rounded-full bg-input data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-3",
            className
          )}
          orientation="horizontal"
          {...props}
        />
      }
    />
  )
}

export { OTPFieldPrimitive }
