import { Input, InputProps } from "@figtree/ui/components/input"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@figtree/ui/components/input-group"
import { cn } from "@figtree/ui/lib/utils"

interface Props extends InputProps {
  addOn: string
}

export const SlugInput = ({
  addOn,
  id,
  placeholder,
  className,
  disabled,
  ...props
}: Props) => {
  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        className={cn("*:[input]:ps-1!", className)}
      />
      <InputGroupAddon className="text-quiet">{addOn}</InputGroupAddon>
    </InputGroup>
  )
}
