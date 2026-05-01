"use client"

import * as React from "react"
import { cn } from "@figtree/ui/lib/utils"

// Context

type InlineEditContextType<T> = {
  value: T
  setValue: (v: T) => void
  isEditing: boolean
  startEditing: () => void
  cancel: () => void
  save: () => void
  error?: string
  validationError?: string
  placeholder: string
  displayValue?: (value: T) => string
  disabled?: boolean
  required?: boolean
  isSaving: boolean
  interacting: boolean
  startInteraction: () => void
  endInteraction: () => void
  containerRef: React.RefObject<HTMLDivElement | null>
}

const InlineEditContext =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.createContext<InlineEditContextType<any> | null>(null)

export function useInlineEditContext<T>() {
  const ctx = React.useContext(InlineEditContext)
  if (!ctx)
    throw new Error("InlineEdit components must be used inside <InlineEdit>")
  return ctx as InlineEditContextType<T>
}

// Props

export interface InlineEditProps<T> {
  value: T
  onChange: (value: T) => void
  onSave?: (value: T) => void | Promise<void>
  validate?: (value: T) => string | undefined
  placeholder?: string
  displayValue?: (value: T) => string
  isEditing?: boolean
  onEditingChange?: (editing: boolean) => void
  submitOnBlur?: boolean
  disabled?: boolean
  required?: boolean
  className?: string
  children: React.ReactNode
}

// InlineEdit

export function InlineEdit<T>({
  value,
  onChange,
  onSave,
  validate,
  placeholder = "Click to edit",
  displayValue,
  isEditing: controlledEditing,
  onEditingChange,
  submitOnBlur = true,
  disabled,
  required,
  className,
  children,
}: InlineEditProps<T>) {
  const isControlled = controlledEditing !== undefined

  const [internalEditing, setInternalEditing] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<T>(value)
  const [validationError, setValidationError] = React.useState<
    string | undefined
  >()
  const [isSaving, setIsSaving] = React.useState(false)
  const [interacting, setInteracting] = React.useState(false)

  const containerRef = React.useRef<HTMLDivElement>(null)
  const blurTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  const isEditing = isControlled ? controlledEditing! : internalEditing

  // Sync external value → internal when not editing
  React.useEffect(() => {
    if (!isEditing) setInternalValue(value)
  }, [value, isEditing])

  // Notify parent of editing state changes
  React.useEffect(() => {
    onEditingChange?.(isEditing)
  }, [isEditing, onEditingChange])

  // Cleanup blur timeout on unmount
  React.useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current)
    }
  }, [])

  const setEditing = (v: boolean) => {
    if (isControlled) onEditingChange?.(v)
    else setInternalEditing(v)
  }

  const startEditing = () => {
    if (!disabled) setEditing(true)
  }

  const cancel = () => {
    setInternalValue(value)
    setValidationError(undefined)
    setEditing(false)
  }

  const save = async () => {
    if (isSaving) return

    const err = validate?.(internalValue)
    if (err) {
      setValidationError(err)
      return
    }

    // Skip save if value hasn't changed
    const normalize = (v: T) =>
      typeof v === "string" ? (v as string).trim() : v

    if (
      JSON.stringify(normalize(internalValue)) ===
      JSON.stringify(normalize(value))
    ) {
      setValidationError(undefined)
      setEditing(false)
      return
    }

    try {
      setIsSaving(true)
      await onSave?.(internalValue)
      onChange(internalValue)
      setValidationError(undefined)
      setEditing(false)
    } catch {
      // Revert to original value on error
      setInternalValue(value)
      setEditing(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handleBlur = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null

    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current)

    blurTimeoutRef.current = setTimeout(() => {
      const inside = containerRef.current?.contains(next)
      if (!inside && !interacting && submitOnBlur) {
        save()
      }
    }, 0)
  }

  return (
    <InlineEditContext.Provider
      value={{
        value: internalValue,
        setValue: setInternalValue,
        isEditing,
        startEditing,
        cancel,
        save,
        error: undefined,
        validationError,
        placeholder,
        displayValue,
        disabled,
        required,
        isSaving,
        interacting,
        startInteraction: () => setInteracting(true),
        endInteraction: () => setInteracting(false),
        containerRef,
      }}
    >
      <div
        ref={containerRef}
        onBlur={handleBlur}
        className={cn("w-full", className)}
      >
        {children}
      </div>
    </InlineEditContext.Provider>
  )
}
