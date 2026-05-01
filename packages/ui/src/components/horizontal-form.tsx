import { cn } from "@figtree/ui/lib/utils";
import { Field, FieldLabel } from "@figtree/ui/components/field";

// RHF InlineEdit wrapper for horizontal forms
function HorizontalFormFieldWrapper({
  label,
  addOn,
  htmlFor,
  className,
  children,
}: {
  label: string;
  addOn?: React.ReactNode;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <HorizontalFormField className={cn(className)}>
      <HorizontalFormFieldLabel htmlFor={htmlFor} addOn={addOn}>
        {label}
      </HorizontalFormFieldLabel>
      <HorizontalFormFieldContent>{children}</HorizontalFormFieldContent>
    </HorizontalFormField>
  );
}

function HorizontalForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="horizontal-form"
      className={cn(
        "relative flex flex-col items-stretch justify-start gap-3 py-4 px-3 w-full bg-background",
      )}
      {...props}
    />
  );
}

function HorizontalFormHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="horizontal-form-header"
      className={cn(
        "flex flex-row items-center justify-start gap-1.5",
        className,
      )}
      {...props}
    >
      <div className="w-full">{props.children}</div>
    </div>
  );
}

function HorizontalFormTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="horizontal-form-title"
      className={cn("font-medium text-sm leading-5 tracking-snug", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

function HorizontalFormDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="horizontal-form-description"
      className={cn(
        "text-sm text-quiet font-semimedium text-balance",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

function HorizontalFormContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="horizontal-form-content"
      className={cn(
        "flex flex-col items-stretch justify-start gap-0.5 w-full px-1",
        className,
      )}
      {...props}
    />
  );
}

function HorizontalFormField({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="horizontal-form-field" className="min-h-0">
      <Field
        className={cn(
          "flex flex-row gap-1.5 items-start justify-start w-full",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function HorizontalFormFieldLabel({
  className,
  children,
  htmlFor,
  addOn,
  ...props
}: React.ComponentProps<"div"> & {
  htmlFor?: string;
  addOn?: React.ReactNode;
}) {
  return (
    <div
      data-slot="horizontal-form-field-label"
      className={cn(
        "w-[clamp(6rem,40%,8rem)] min-h-8 shrink-0 flex flex-row items-center justify-start gap-1.5 [&_svg:not([class*='size-'])]:size-3.75 [&_svg]:text-quiet [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {addOn && <span>{addOn}</span>}
      <FieldLabel
        className="font-medium leading-4! truncate text-quiet cursor-text"
        htmlFor={htmlFor}
      >
        {children}
      </FieldLabel>
    </div>
  );
}

function HorizontalFormFieldContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="horizontal-form-field-content"
      className={cn(
        "flex flex-row min-h-8 max-h-8 px-px items-center flex-1 overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function HorizontalFormFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="horizontal-form-footer"
      className={cn(
        "bg-background border-t border-default flex items-center px-4 h-12 rounded-b-lg",
        className,
      )}
      {...props}
    />
  );
}

export {
  HorizontalForm,
  HorizontalFormHeader,
  HorizontalFormTitle,
  HorizontalFormDescription,
  HorizontalFormContent,
  HorizontalFormField,
  HorizontalFormFieldLabel,
  HorizontalFormFieldContent,
  HorizontalFormFooter,
  HorizontalFormFieldWrapper,
};
