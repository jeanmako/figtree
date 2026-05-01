import { cn } from "@figtree/ui/lib/utils"
import { useInlineEditContext } from "@figtree/ui/components/inline-edit/inline-edit"

export function InlineEditPreview<T>() {
  const {
    value,
    isEditing,
    startEditing,
    placeholder,
    displayValue,
    disabled,
  } = useInlineEditContext<T>()

  if (isEditing) return null

  const text =
    value === null || value === undefined || value === ""
      ? placeholder
      : (displayValue?.(value) ?? String(value))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      startEditing()
    }
  }

  return (
    <div
      onClick={startEditing}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex h-8 max-h-8 w-full cursor-pointer items-center justify-start rounded-md px-2 py-1.5 transition-colors duration-300",
        "hover:bg-subtlest",
        disabled && "cursor-not-allowed opacity-50"
      )}
      role="button"
      tabIndex={disabled ? undefined : 0}
      aria-label={text ? `Edit ${text}` : placeholder}
      aria-disabled={disabled}
    >
      <span
        className={cn(
          "truncate text-sm leading-5 font-medium text-foreground",
          (value === null || value === undefined || value === "") &&
            "text-quieter"
        )}
      >
        {text}
      </span>
    </div>
  )
}
