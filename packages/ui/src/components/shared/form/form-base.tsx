import { ReactNode, useEffect, useRef } from "react"

import { useFieldContext } from "@figtree/ui/hooks/form-hook"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@figtree/ui/components/field"

import { toastManager } from "../../toast"

export type FormControlProps = {
  label?: string
  description?: string
  id?: string
  size?: "default" | "sm" | "lg" | number
  disabled?: boolean
  placeholder?: string
  htmlFor?: string
  className?: string
  withToastError?: boolean
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
  htmlFor,
  withToastError = false,
}: FormBaseProps) {
  const field = useFieldContext()

  const previousErrorRef = useRef<string | null>(null)

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  const normalizeFieldErrors = (errors: unknown): string => {
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

  useEffect(() => {
    if (!withToastError) return

    if (!isInvalid) {
      previousErrorRef.current = null

      return
    }

    if (!errorContent) return

    // Prevent duplicate toasts
    if (previousErrorRef.current === errorContent) {
      return
    }

    previousErrorRef.current = errorContent

    toastManager.add({
      title: errorContent,
      type: "error",
    })
  }, [errorContent, isInvalid, withToastError])

  const labelElement = (
    <FieldLabel htmlFor={htmlFor ?? field.name}>{label}</FieldLabel>
  )

  const descriptionElement = <FieldDescription>{description}</FieldDescription>

  const errorElem =
    isInvalid && !withToastError ? (
      <FieldError match={isInvalid}>{errorContent}</FieldError>
    ) : null

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

          {description && descriptionElement}
        </>
      )}
    </Field>
  )
}
