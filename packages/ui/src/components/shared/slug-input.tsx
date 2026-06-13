import { InputProps } from "@figtree/ui/components/input"

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
    <InputGroup className={cn("w-full", className)}>
      <InputGroupInput
        {...props}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        className="*:[input]:ps-1!"
      />
      <InputGroupAddon className="text-quiet">{addOn}</InputGroupAddon>
    </InputGroup>
  )
}
