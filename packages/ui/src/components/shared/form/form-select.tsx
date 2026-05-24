"use client"

import {
  FormBase,
  FormControlProps,
} from "@figtree/ui/components/shared/form/form-base"
import { useFieldContext } from "@figtree/ui/hooks/form-hook"
import { ReactNode } from "react"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@figtree/ui/components/select"

export function FormSelect({
  children,
  ...props
}: FormControlProps & { children: ReactNode }) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <Select
        onValueChange={(e) => field.handleChange(e ?? "")}
        value={field.state.value}
        name={field.name}
      >
        <SelectTrigger
          aria-invalid={isInvalid}
          id={props.id ?? field.name}
          onBlur={field.handleBlur}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </FormBase>
  )
}
