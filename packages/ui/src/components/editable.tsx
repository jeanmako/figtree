"use client";

import * as React from "react";
import { Input } from "@figtree/ui/components/input";
import { Textarea } from "@figtree/ui/components/textarea";
import { FieldError } from "@figtree/ui/components/field";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@figtree/ui/components/tooltip";
import { Button } from "@figtree/ui/components/button";
import { Icons } from "@figtree/ui/components/icons";
import { cn } from "@figtree/ui/lib/utils";

export type InlineEditRenderProps<T> = {
  id?: string;
  value: T;
  onChange: (value: T) => void;
  onBlur: (e: React.FocusEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  autoFocus: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
};

export interface InlineEditProps<T> {
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;

  render: (props: InlineEditRenderProps<T>) => React.ReactNode;

  displayValue?: (value: T) => string;
  placeholder?: string;
  error?: string;
  validate?: (value: T) => string | undefined;

  onSave?: (value: T) => void | Promise<void>;
  onCancel?: () => void;
  onEditingChange?: (editing: boolean) => void;
  isEditing?: boolean;

  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

export function InlineEdit<T>({
  value,
  onChange,
  onBlur,
  render,
  displayValue,
  placeholder = "Click to edit",
  error,
  validate,
  onSave,
  onCancel,
  onEditingChange,
  isEditing: controlledIsEditing,
  disabled = false,
  className,
  id,
  name,
  required,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: InlineEditProps<T>) {
  // Generate unique IDs for accessibility
  const instanceId = React.useId();
  const rootId = id ?? instanceId;
  const errorId = `${rootId}-error`;

  const isControlled = typeof controlledIsEditing !== "undefined";
  const [internalIsEditing, setInternalIsEditing] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<T>(value);
  const [validationError, setValidationError] = React.useState<
    string | undefined
  >();
  const [isSaving, setIsSaving] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const isEditing = isControlled ? controlledIsEditing : internalIsEditing;

  // Sync external value → internal (only when NOT editing)
  React.useEffect(() => {
    if (!isEditing) {
      setInternalValue(value);
    }
  }, [value, isEditing]);

  // Notify parent of editing state changes
  React.useEffect(() => {
    onEditingChange?.(isEditing);
  }, [isEditing, onEditingChange]);

  const setEditingState = React.useCallback(
    (newState: boolean) => {
      if (isControlled) {
        onEditingChange?.(newState);
      } else {
        setInternalIsEditing(newState);
      }
    },
    [isControlled, onEditingChange],
  );

  const startEditing = () => {
    if (!disabled) {
      setEditingState(true);
    }
  };

  const cancel = () => {
    setInternalValue(value);
    setValidationError(undefined);
    setEditingState(false);
    onCancel?.();
  };

  const save = async () => {
    const validationError = validate?.(internalValue);

    if (validationError) {
      setValidationError(validationError);
      return;
    }

    try {
      setIsSaving(true);

      await onSave?.(internalValue);

      onChange(internalValue);
      setEditingState(false);
      setValidationError(undefined);
      onBlur?.();
    } catch (err) {
      // optional: surface error if needed
      console.error("InlineEdit save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    const nextFocused = e.relatedTarget as Node | null;

    // Only save if focus leaves the entire container
    if (!containerRef.current?.contains(nextFocused)) {
      save();
    }
    onBlur?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      save();
    }
  };

  const displayText =
    value === null || value === undefined || value === ""
      ? placeholder
      : (displayValue?.(value) ?? String(value));

  // ✏️ Edit mode
  if (isEditing) {
    return (
      <div
        ref={containerRef}
        className={cn("w-full relative h-full", className)}
      >
        {render({
          value: internalValue,
          onChange: setInternalValue,
          onBlur: handleBlur,
          onKeyDown: handleKeyDown,
          autoFocus: true,
          disabled: disabled || isSaving,
          error: validationError || error,
          placeholder,
          id: rootId,
          "aria-label": ariaLabel,
          "aria-describedby":
            [ariaDescribedBy, validationError || error ? errorId : undefined]
              .filter(Boolean)
              .join(" ") || undefined,
          "aria-invalid": !!(validationError || error),
          "aria-required": required,
        })}

        {validationError && (
          <Tooltip>
            <TooltipTrigger
              render={<Button size="icon-xs" variant="ghost" />}
              className="absolute top-1/2 right-1 transform -translate-y-1/2 text-destructive"
            >
              <Icons.details />
              <span className="sr-only">Error details</span>
            </TooltipTrigger>
            <TooltipPopup>
              <FieldError match={!!validationError}>
                {validationError}
              </FieldError>
            </TooltipPopup>
          </Tooltip>
        )}
      </div>
    );
  }

  // 👁 Read mode
  return (
    <div
      ref={containerRef}
      onClick={startEditing}
      className={cn(
        "cursor-pointer rounded-md px-2 py-1.5 transition-colors duration-300 w-full h-7.5 max-h-7.5 inline-flex items-center justify-start",
        "hover:bg-subtlest ",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      role="button"
      tabIndex={disabled ? undefined : 0}
      aria-label={ariaLabel || (value ? `Edit ${displayText}` : placeholder)}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled}
      aria-invalid={!!error}
      aria-required={required}
      data-state={isEditing ? "open" : "closed"}
    >
      <span
        className={cn(
          "text-sm font-medium leading-5 text-foreground",
          value === null ||
            value === undefined ||
            (value === "" && "text-quieter"),
        )}
        id={rootId}
      >
        {displayText}
      </span>
    </div>
  );
}

export function InlineEditInput(props: InlineEditRenderProps<string>) {
  return (
    <Input
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
      onBlur={props.onBlur}
      onKeyDown={props.onKeyDown}
      autoFocus={props.autoFocus}
      aria-invalid={props.error ? true : props["aria-invalid"]}
      aria-describedby={props["aria-describedby"]}
      aria-label={props["aria-label"]}
      aria-required={props["aria-required"]}
      disabled={props.disabled}
      className="w-full text-sm h-7.5"
      size="sm"
      placeholder={props.placeholder}
      id={props.id}
    />
  );
}

export function InlineEditTextarea(props: InlineEditRenderProps<string>) {
  return (
    <Textarea
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
      onBlur={props.onBlur}
      onKeyDown={props.onKeyDown}
      autoFocus={props.autoFocus}
      aria-invalid={props.error ? true : props["aria-invalid"]}
      aria-describedby={props["aria-describedby"]}
      aria-label={props["aria-label"]}
      aria-required={props["aria-required"]}
      disabled={props.disabled}
      rows={3}
      className="border rounded px-2 py-1 w-full"
      placeholder={props.placeholder}
      id={props.id}
    />
  );
}
