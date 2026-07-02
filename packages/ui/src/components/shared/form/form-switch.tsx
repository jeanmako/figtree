"use client"

import {
  FormBase,
  FormControlProps,
} from "@figtree/ui/components/shared/form/form-base"
import { useFieldContext } from "@figtree/ui/hooks/form-hook"
import { Switch } from "@figtree/ui/components/switch"

export function FormSwitch(props: FormControlProps) {
  const field = useFieldContext<boolean>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props} controlFirst reversed horizontal>
      <Switch
        id={props.id ?? field.name}
        name={field.name}
        checked={field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={(e) => field.handleChange(e === true)}
        aria-invalid={isInvalid}
        disabled={props.disabled}
        className={props.className}
      />
    </FormBase>
  )
}
