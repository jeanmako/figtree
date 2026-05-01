/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import {
  useFormContext,
  useController,
  FieldPath,
  Control,
} from "react-hook-form"
import { InlineEdit } from "@figtree/ui/components/inline-edit/inline-edit"
import { InlineEditPreview } from "@figtree/ui/components/inline-edit/inline-edit-preview"
import { InlineEditInput } from "@figtree/ui/components/inline-edit/inline-edit-input"
import { useInlineEditContext } from "@figtree/ui/components/inline-edit/inline-edit"
import { Button } from "@figtree/ui/components/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipPopup,
} from "@figtree/ui/components/tooltip"
import { FieldError } from "@figtree/ui/components/field"
import { Icons } from "@figtree/ui/components/icons"
import { cn } from "@figtree/ui/lib/utils"

type RHFInlineEditProps<
  TFormValues extends Record<string, any>,
  TFieldName extends FieldPath<TFormValues>,
> = {
  name: TFieldName
  control?: Control<TFormValues> // Optional control prop to bypass context
  placeholder?: string
  validate?: (value: TFormValues[TFieldName]) => string | undefined
  onSave?: (value: TFormValues[TFieldName]) => void | Promise<void>
  displayValue?: (value: TFormValues[TFieldName]) => string
  disabled?: boolean
  required?: boolean
  className?: string
  // Custom input component (defaults to InlineEditInput)
  inputComponent?: React.ComponentType<unknown>
}

export function RHFInlineEdit<
  TFormValues extends Record<string, any>,
  TFieldName extends FieldPath<TFormValues>,
>({
  name,
  control: controlProp,
  placeholder = "Click to edit",
  validate,
  onSave,
  displayValue,
  disabled,
  required,
  className,
  inputComponent: InputComponent = InlineEditInput,
}: RHFInlineEditProps<TFormValues, TFieldName>) {
  // Try to get form context first, then use provided control prop
  const formContext = useFormContext<TFormValues>()
  const control = controlProp || formContext?.control

  if (!control) {
    throw new Error(
      "RHFInlineEdit must be used within a React Hook Form context " +
        "or have a 'control' prop passed directly."
    )
  }

  const { field } = useController({ name, control })

  return (
    <InlineEdit
      value={field.value}
      onChange={field.onChange}
      onSave={onSave}
      validate={validate}
      placeholder={placeholder}
      displayValue={displayValue}
      disabled={disabled}
      required={required}
      className={cn("relative", className)}
    >
      <InlineEditPreview />
      <ConditionalInput Component={InputComponent} />
      <ValidationErrorDisplay />
    </InlineEdit>
  )
}

// Component to display validation error from context
function ValidationErrorDisplay() {
  const { validationError, isEditing } = useInlineEditContext()

  if (!validationError || !isEditing) return null

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            size="icon-xs"
            variant="ghost"
            className="hover:bg-destructive-chill"
          />
        }
        className="absolute top-1/2 right-0.75 -translate-y-1/2 transform text-destructive"
      >
        <Icons.info />
        <span className="sr-only">Error details</span>
      </TooltipTrigger>
      <TooltipPopup>
        <FieldError match={!!validationError}>{validationError}</FieldError>
      </TooltipPopup>
    </Tooltip>
  )
}

// Helper component to only render input when editing
function ConditionalInput({
  Component,
}: {
  Component: React.ComponentType<unknown>
}) {
  const { isEditing } = useInlineEditContext()

  if (!isEditing) return null
  return <Component />
}
