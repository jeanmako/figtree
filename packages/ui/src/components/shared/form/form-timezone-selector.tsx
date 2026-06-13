"use client"

import {
  FormBase,
  FormControlProps,
} from "@figtree/ui/components/shared/form/form-base"

import { TimezoneSelector } from "@figtree/ui/components/timezone-selector"

import { useFieldContext } from "@figtree/ui/hooks/form-hook"
import { Timezone } from "@figtree/utils/constants/timezones"

export function FormTimezoneSelector(
  props: FormControlProps & { popupClassName?: string }
) {
  const field = useFieldContext<Timezone>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <TimezoneSelector
        name={field.name}
        id={props.id ?? field.name}
        disabled={props.disabled}
        isInvalid={isInvalid}
        value={field.state.value}
        onValueChange={field.handleChange}
        onBlur={field.handleBlur}
        className={props.className}
        popupClassName={props.popupClassName}
      />
    </FormBase>
  )
}
