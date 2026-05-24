"use client"

import {
  FormBase,
  type FormControlProps,
} from "@figtree/ui/components/shared/form/form-base"

import {
  MultiToggleGroupSelector,
  type Option,
} from "@figtree/ui/components/toggle-group-selector"

import { useFieldContext } from "@figtree/ui/hooks/form-hook"

import { VariantProps } from "class-variance-authority"

import { toggleVariants } from "@figtree/ui/components/toggle"

type Props = FormControlProps &
  VariantProps<typeof toggleVariants> & {
    options: Option[]

    max?: number
  }

export function FormMultiToggleGroupSelector({
  options,
  size,
  variant,
  max,
  ...props
}: Props) {
  const field = useFieldContext<string[]>()

  return (
    <FormBase {...props}>
      <MultiToggleGroupSelector
        options={options}
        value={field.state.value ?? []}
        onValueChange={field.handleChange}
        size={size}
        variant={variant}
        max={max}
      />
    </FormBase>
  )
}
