"use client"

import {
  FormBase,
  FormControlProps,
} from "@figtree/ui/components/shared/form/form-base"

import { CountrySelector } from "@figtree/ui/components/country-selector"

import { useFieldContext } from "@figtree/ui/hooks/form-hook"

import type { CountryCode } from "@figtree/utils/constants/countries"

type CountrySelectorProps = FormControlProps & {
  searchPlaceholder?: string
  emptyMessage?: string
}

export function FormCountrySelector(props: CountrySelectorProps) {
  const field = useFieldContext<CountryCode>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <CountrySelector
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
