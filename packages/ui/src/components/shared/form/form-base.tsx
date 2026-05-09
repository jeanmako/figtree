import { ReactNode } from "react"
import { useFieldContext } from "@figtree/ui/hooks/form-hook"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@figtree/ui/components/field"

export type FormControlProps = {
  label?: string
  description?: string
  id?: string
  size?: "default" | "sm" | "lg" | number
  disabled?: boolean
  placeholder?: string
}

type FormBaseProps = FormControlProps & {
  children: ReactNode
  horizontal?: boolean
  controlFirst?: boolean
}

export function FormBase({
  children,
  label,
  description,
  controlFirst,
  horizontal,
}: FormBaseProps) {
  const field = useFieldContext()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  )

  const normalizeFieldErrors = (errors: unknown) => {
    if (typeof errors === "string") {
      return errors
    }

    if (Array.isArray(errors) && errors.length > 0) {
      const firstError = errors[0]
      if (typeof firstError === "string") {
        return firstError
      }

      if (
        firstError &&
        typeof firstError === "object" &&
        "message" in firstError
      ) {
        return String((firstError as { message?: unknown }).message)
      }

      return String(firstError)
    }

    if (errors && typeof errors === "object" && "message" in errors) {
      return String((errors as { message?: unknown }).message)
    }

    return String(errors)
  }

  const errorContent = normalizeFieldErrors(field.state.meta.errors)
  const errorElem = isInvalid && (
    <FieldError match={isInvalid}>{errorContent}</FieldError>
  )

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : "vertical"}
    >
      {controlFirst ? (
        <>
          {children}
          <div>
            {labelElement}
            {errorElem}
          </div>
        </>
      ) : (
        <>
          {label && labelElement}
          {children}
          {errorElem}
        </>
      )}
    </Field>
  )
}
