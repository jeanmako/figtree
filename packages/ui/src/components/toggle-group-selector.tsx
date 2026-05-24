"use client"

import { cn } from "@figtree/ui/lib/utils"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@figtree/ui/components/toggle-group"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { VariantProps } from "class-variance-authority"
import { toggleVariants } from "@figtree/ui/components/toggle"

export type Option = {
  name: string
  slug: string
}

type Props = Omit<ToggleGroupPrimitive.Props, "value" | "onChange"> &
  VariantProps<typeof toggleVariants> & {
    options: Option[]
    value?: string | null
    onChange: (slug: string | null) => void
    allowDeselect?: boolean
  }

export function ToggleGroupSelector({
  options,
  value,
  onChange,
  className,
  size = "default",
  variant = "default",
  allowDeselect = false,
}: Props) {
  return (
    <ToggleGroup
      value={value ? [value] : []}
      onValueChange={(next) => {
        if (!next || next.length === 0) {
          if (allowDeselect) onChange(null)
          return
        }
        onChange(next[0]!)
      }}
      className={cn("flex-wrap gap-1.25", className)}
      size={size}
      variant={variant}
    >
      {options.map((option) => (
        <ToggleGroupItem
          className="tracking-snug sm:text-tiny"
          key={option.slug}
          value={option.slug}
        >
          {option.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

type MultipleProps = Omit<ToggleGroupPrimitive.Props, "onValueChange"> &
  VariantProps<typeof toggleVariants> & {
    options: Option[]
    value?: string[]
    onValueChange: (value: string[]) => void
    max?: number
  }

export function MultiToggleGroupSelector({
  options,
  value = [],
  onValueChange,
  className,
  size = "default",
  variant = "default",
  max,
}: MultipleProps) {
  return (
    <ToggleGroup
      multiple
      value={value}
      onValueChange={(next) => {
        if (max && next.length > max) {
          return
        }

        onValueChange(next)
      }}
      className={cn("flex-wrap gap-1.25", className)}
      size={size}
      variant={variant}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.slug}
          value={option.slug}
          className="tracking-snug sm:text-tiny"
        >
          {option.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
