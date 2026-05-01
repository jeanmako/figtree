"use client";

import { cn } from "@figtree/ui/lib/utils";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@figtree/ui/components/toggle-group";

export type Option = {
  name: string;
  slug: string;
};

type Props = {
  options: Option[];
  value?: string | null;
  onChange: (slug: string | null) => void;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "secondary";
  allowDeselect?: boolean;
};

export function ToggleGroupSelector({
  options,
  value,
  onChange,
  className,
  size = "default",
  variant = "default",
  allowDeselect = false,
}: Props) {
  return (
    <ToggleGroup
      value={value ? [value] : []}
      onValueChange={(next) => {
        if (!next || next.length === 0) {
          if (allowDeselect) onChange(null);
          return;
        }
        onChange(next[0]!);
      }}
      className={cn("flex-wrap gap-1.25", className)}
      size={size}
      variant={variant}
    >
      {options.map((option) => (
        <ToggleGroupItem
          className="sm:text-tiny tracking-snug"
          key={option.slug}
          value={option.slug}
        >
          {option.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
