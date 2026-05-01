import { Input } from "@figtree/ui/components/input";
import { Textarea } from "@figtree/ui/components/textarea";
import { useInlineEditContext } from "@figtree/ui/components/inline-edit/inline-edit";

export function InlineEditInput() {
  const {
    value,
    setValue,
    isEditing,
    save,
    cancel,
    isSaving,
    validationError,
    placeholder,
    disabled,
  } = useInlineEditContext<string>();

  if (!isEditing) return null;

  return (
    <Input
      value={value || ""}
      onChange={(e) => setValue(e.target.value)}
      autoFocus
      disabled={isSaving || disabled}
      placeholder={placeholder}
      aria-invalid={!!validationError}
      className="w-full text-sm h-7.5"
      onKeyDown={(e) => {
        if (e.key === "Enter") save();
        if (e.key === "Escape") cancel();
      }}
    />
  );
}

export function InlineEditTextarea() {
  const {
    value,
    setValue,
    isEditing,
    save,
    cancel,
    isSaving,
    validationError,
    placeholder,
    disabled,
  } = useInlineEditContext<string>();

  if (!isEditing) return null;

  return (
    <Textarea
      value={value || ""}
      onChange={(e) => setValue(e.target.value)}
      autoFocus
      disabled={isSaving || disabled}
      placeholder={placeholder}
      aria-invalid={!!validationError}
      rows={3}
      className="w-full text-sm"
      onKeyDown={(e) => {
        if (e.key === "Escape") cancel();
        // Allow Enter to create new lines, save on Ctrl+Enter
        if (e.key === "Enter" && e.ctrlKey) save();
      }}
    />
  );
}
