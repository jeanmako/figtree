"use client"

import {
  FormBase,
  type FormControlProps,
} from "@figtree/ui/components/shared/form/form-base"

import {
  ToggleGroupSelector,
  type Option,
} from "@figtree/ui/components/toggle-group-selector"

import { useFieldContext } from "@figtree/ui/hooks/form-hook"
import { VariantProps } from "class-variance-authority"
import { toggleVariants } from "@figtree/ui/components/toggle"

type Props = FormControlProps &
  VariantProps<typeof toggleVariants> & {
    options: Option[]
    allowDeselect?: boolean
  }

export function FormToggleGroupSelector({
  options,
  allowDeselect,
  size,
  variant,
  ...props
}: Props) {
  const field = useFieldContext<string | null>()

  return (
    <FormBase {...props}>
      <ToggleGroupSelector
        options={options}
        value={field.state.value}
        onChange={field.handleChange}
        allowDeselect={allowDeselect}
        size={size}
        variant={variant}
        className={props.className}
      />
    </FormBase>
  )
}
