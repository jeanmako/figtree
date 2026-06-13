import { useCallback, useEffect, useRef, useState } from "react"
import { z } from "zod"

import { toastManager } from "@figtree/ui/components/toast"

type Props<T> = {
  initialValue: T
  schema: z.ZodType<T>
  onSave: (value: T) => Promise<void>
  validateAsync?: (value: T) => Promise<{
    valid: boolean
    error?: string
  }>
  debounceMs?: number
  onError?: (error: Error) => void
  onSuccess?: () => void
}

export function useEditableField<T>({
  initialValue,
  schema,
  onSave,
  validateAsync,
  debounceMs = 0,
  onError,
  onSuccess,
}: Props<T>) {
  const [value, setValue] = useState<T>(initialValue)

  const [error, setError] = useState<string | null>(null)

  const [isSaving, setIsSaving] = useState(false)

  const [isValidating, setIsValidating] = useState(false)

  const [isDirty, setIsDirty] = useState(false)

  // Last successfully committed value
  const committedValueRef = useRef<T>(initialValue)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const validationIdRef = useRef(0)

  const mountedRef = useRef(true)

  // Cleanup
  useEffect(() => {
    return () => {
      mountedRef.current = false

      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  // Sync external changes
  useEffect(() => {
    setValue(initialValue)

    committedValueRef.current = initialValue

    setError(null)

    setIsDirty(false)
  }, [initialValue])

  const rollback = useCallback(() => {
    setValue(committedValueRef.current)

    setIsDirty(false)
  }, [])

  const validate = useCallback(
    async (next: T) => {
      const parsed = schema.safeParse(next)

      // Sync validation
      if (!parsed.success) {
        const message = parsed.error.issues[0]?.message ?? "Invalid value"

        setError(message)

        toastManager.add({
          title: message,
          type: "error",
        })

        rollback()

        return false
      }

      // Async validation
      if (validateAsync) {
        const validationId = ++validationIdRef.current

        setIsValidating(true)

        const result = await validateAsync(next)

        if (!mountedRef.current) {
          return false
        }

        // Ignore stale validations
        if (validationId !== validationIdRef.current) {
          return false
        }

        setIsValidating(false)

        if (!result.valid) {
          const message = result.error ?? "Invalid value"

          setError(message)

          toastManager.add({
            title: message,
            type: "error",
          })

          rollback()

          return false
        }
      }

      setError(null)

      return true
    },
    [rollback, schema, validateAsync]
  )

  const updateValue = useCallback(
    (next: T) => {
      setValue(next)

      setIsDirty(true)

      // Clear stale errors while editing
      if (error) {
        setError(null)
      }
    },
    [error]
  )

  const save = useCallback(async () => {
    if (!isDirty) return

    const currentValue = value

    const valid = await validate(currentValue)

    if (!valid) {
      return
    }

    try {
      setIsSaving(true)

      await onSave(currentValue)

      if (!mountedRef.current) {
        return
      }

      // Update committed value after successful save
      committedValueRef.current = currentValue

      setIsDirty(false)

      setError(null)

      onSuccess?.()
    } catch (err) {
      if (!mountedRef.current) {
        return
      }

      const error = err instanceof Error ? err : new Error("Failed to save")

      setError(error.message)

      toastManager.add({
        title: error.message,
        type: "error",
      })

      rollback()

      onError?.(error)
    } finally {
      if (mountedRef.current) {
        setIsSaving(false)
      }
    }
  }, [isDirty, onError, onSave, onSuccess, rollback, validate, value])

  const handleBlur = useCallback(() => {
    if (!isDirty) return

    if (debounceMs <= 0) {
      void save()

      return
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      void save()
    }, debounceMs)
  }, [debounceMs, isDirty, save])

  const reset = useCallback(() => {
    setValue(committedValueRef.current)

    setError(null)

    setIsDirty(false)
  }, [])

  return {
    value,
    setValue: updateValue,
    error,
    isDirty,
    isSaving,
    isValidating,
    save,
    reset,
    handleBlur,
  }
}
