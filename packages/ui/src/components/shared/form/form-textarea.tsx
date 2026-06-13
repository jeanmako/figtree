"use client"

import { Textarea } from "@figtree/ui/components/textarea"
import {
  FormBase,
  FormControlProps,
} from "@figtree/ui/components/shared/form/form-base"
import { useFieldContext } from "@figtree/ui/hooks/form-hook"

export function FormTextarea(props: FormControlProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <Textarea
        id={props.id ?? field.name}
        name={field.name}
        placeholder={props.placeholder}
        size={props.size ?? "default"}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        disabled={props.disabled}
        className={props.className}
      />
    </FormBase>
  )
}
