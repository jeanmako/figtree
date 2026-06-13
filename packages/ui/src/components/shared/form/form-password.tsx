"use client"

import {
  PasswordInput,
  PasswordInputStrengthChecker,
} from "@figtree/ui/components/password-input"
import {
  FormBase,
  FormControlProps,
} from "@figtree/ui/components/shared/form/form-base"
import { useFieldContext } from "@figtree/ui/hooks/form-hook"

export function FormPasswordInput(
  props: FormControlProps & { withChecker?: boolean }
) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      {props.withChecker ? (
        <PasswordInput
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
        >
          <PasswordInputStrengthChecker />
        </PasswordInput>
      ) : (
        <PasswordInput
          id={props.id ?? field.name}
          name={field.name}
          size={props.size ?? "default"}
          placeholder={props.placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          disabled={props.disabled}
          className={props.className}
        />
      )}
    </FormBase>
  )
}
