import React from "react";
import { Input } from "@figtree/ui/components/input";
import { cn } from "@figtree/ui/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  url: string;
}

export const SlugInput = ({
  url,
  id,
  placeholder,
  className,
  disabled,
  ...props
}: Props) => {
  return (
    <div className="flex rounded-md has-focus-visible:has-aria-invalid:border-destructive has-aria-invalid:border-destructive/80">
      <span className="inline-flex items-center rounded-s-md bg-quietest/80 px-2 text-accent-foreground text-sm">
        {url}
      </span>

      <Input
        {...props}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          (className = "-ms-px rounded-s-none border-l shadow-none"),
          className,
        )}
      />
    </div>
  );
};
