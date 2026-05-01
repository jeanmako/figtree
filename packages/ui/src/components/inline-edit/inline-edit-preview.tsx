import { cn } from "@figtree/ui/lib/utils";
import { useInlineEditContext } from "@figtree/ui/components/inline-edit/inline-edit";

export function InlineEditPreview<T>() {
  const {
    value,
    isEditing,
    startEditing,
    placeholder,
    displayValue,
    disabled,
  } = useInlineEditContext<T>();

  if (isEditing) return null;

  const text =
    value === null || value === undefined || value === ""
      ? placeholder
      : (displayValue?.(value) ?? String(value));

  return (
    <div
      onClick={startEditing}
      className={cn(
        "cursor-pointer rounded-md px-2 py-1.5 transition-colors duration-300 w-full h-8 max-h-8 inline-flex items-center justify-start",
        "hover:bg-subtlest",
        disabled && "opacity-50 cursor-not-allowed",
      )}
      role="button"
      tabIndex={disabled ? undefined : 0}
      aria-label={text ? `Edit ${text}` : placeholder}
      aria-disabled={disabled}
    >
      <span
        className={cn(
          "text-sm font-medium leading-5 text-foreground truncate",
          (value === null || value === undefined || value === "") &&
            "text-quieter",
        )}
      >
        {text}
      </span>
    </div>
  );
}
