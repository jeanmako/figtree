import React from "react"
import { Input } from "@figtree/ui/components/input"
import { cn } from "@figtree/ui/lib/utils"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  url: string
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
    <div className="flex rounded-md has-aria-invalid:border-destructive/80 has-focus-visible:has-aria-invalid:border-destructive">
      <span className="bg-quietest/80 inline-flex items-center rounded-s-md px-2 text-sm text-accent-foreground">
        {url}
      </span>

      <Input
        {...props}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        className={cn("-ms-px rounded-s-none border-l shadow-none", className)}
      />
    </div>
  )
}
