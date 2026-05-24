"use client"

import {
  FormBase,
  FormControlProps,
} from "@figtree/ui/components/shared/form/form-base"

import { CurrencySelector } from "@figtree/ui/components/currency-selector"

import { useFieldContext } from "@figtree/ui/hooks/form-hook"
import { CurrencyCode } from "@figtree/utils/constants/currencies"

export function FormCurrencySelector(props: FormControlProps) {
  const field = useFieldContext<CurrencyCode>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <CurrencySelector
        name={field.name}
        id={props.id ?? field.name}
        disabled={props.disabled}
        isInvalid={isInvalid}
        value={field.state.value}
        onValueChange={field.handleChange}
        onBlur={field.handleBlur}
      />
    </FormBase>
  )
}
