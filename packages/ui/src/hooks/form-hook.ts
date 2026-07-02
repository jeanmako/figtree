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
  FormTimezoneSelector,
  FormMultiSelect,
  FormSwitch,
} from "@figtree/ui/components/shared/form"

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Textarea: FormTextarea,
    Select: FormSelect,
    Switch: FormSwitch,
    MultiSelect: FormMultiSelect,
    Checkbox: FormCheckbox,
    Password: FormPasswordInput,
    OTP: FormOTPField,
    SlugInput: FormSlugInput,
    CountrySelector: FormCountrySelector,
    ToggleGroupSelector: FormToggleGroupSelector,
    MultiToggleGroupSelector: FormMultiToggleGroupSelector,
    CurrencySelector: FormCurrencySelector,
    TimezoneSelector: FormTimezoneSelector,
  },
  formComponents: {},
  fieldContext,
  formContext,
})

export { useAppForm, withForm, useFieldContext, useFormContext }
