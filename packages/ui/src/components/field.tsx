"use client"

import { Field as FieldPrimitive } from "@base-ui/react/field"

import { cn } from "@figtree/ui/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const fieldVariants = cva(
  "group/field flex w-full gap-1.5 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive:
          "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: FieldPrimitive.Root.Props & VariantProps<typeof fieldVariants>) {
  return (
    <FieldPrimitive.Root
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      data-slot="field"
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      className={cn(
        "inline-flex w-full items-center gap-2 text-tiny/none! font-medium text-quiet",
        className
      )}
      data-slot="field-label"
      {...props}
    />
  )
}

function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      className={cn("text-tiny/tight font-medium text-quiet!", className)}
      data-slot="field-description"
      {...props}
    />
  )
}

function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      className={cn(
        "text-xs/tight font-medium text-destructive-foreground!",
        className
      )}
      data-slot="field-error"
      {...props}
    />
  )
}

const FieldControl = FieldPrimitive.Control
const FieldValidity = FieldPrimitive.Validity

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldControl,
  FieldValidity,
}
