"use client"

import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import {
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormPasswordInput,
  FormOTPField,
  FormSlugInput,
  FormCountrySelector,
  FormToggleGroupSelector,
  FormMultiToggleGroupSelector,
  FormCurrencySelector,
} from "@figtree/ui/components/shared/form"

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Textarea: FormTextarea,
    Select: FormSelect,
    Checkbox: FormCheckbox,
    Password: FormPasswordInput,
    OTP: FormOTPField,
    SlugInput: FormSlugInput,
    CountrySelector: FormCountrySelector,
    ToggleGroupSelector: FormToggleGroupSelector,
    MultiToggleGroupSelector: FormMultiToggleGroupSelector,
    CurrencySelector: FormCurrencySelector,
  },
  formComponents: {},
  fieldContext,
  formContext,
})

export { useAppForm, useFieldContext, useFormContext }
