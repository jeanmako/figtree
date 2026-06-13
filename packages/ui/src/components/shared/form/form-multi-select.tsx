"use client"

import {
  FormBase,
  FormControlProps,
} from "@figtree/ui/components/shared/form/form-base"
import { useFieldContext } from "@figtree/ui/hooks/form-hook"
import { ReactNode } from "react"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@figtree/ui/components/multi-select"

type Props = FormControlProps & {
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff"
  children: ReactNode
}

export function FormMultiSelect({
  children,
  className,
  overflowBehavior = "cutoff",
  ...props
}: Props) {
  const field = useFieldContext<string[]>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <MultiSelect
        onValuesChange={field.handleChange}
        values={field.state.value ?? []}
      >
        <MultiSelectTrigger
          aria-invalid={isInvalid}
          id={props.id ?? field.name}
          onBlur={field.handleBlur}
          className={className}
          name={field.name}
          size={props.size as "sm" | "default" | "lg"}
        >
          <MultiSelectValue
            overflowBehavior={overflowBehavior}
            placeholder={props.placeholder}
          />
        </MultiSelectTrigger>
        <MultiSelectContent>{children}</MultiSelectContent>
      </MultiSelect>
    </FormBase>
  )
}
