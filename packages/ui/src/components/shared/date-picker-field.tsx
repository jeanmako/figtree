"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@figtree/ui/components/button"
import { Calendar } from "@figtree/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@figtree/ui/components/popover"
import { cn } from "@figtree/ui/lib/utils"

interface DatePickerFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  id: string
  className?: string
  placeholder?: string
  disabled?: boolean
  value?: Date | null
  onChange?: (date: Date | null) => void
  name?: string
}

// eslint-disable-next-line react/display-name
export const DatePickerField = React.forwardRef<
  HTMLInputElement,
  DatePickerFieldProps
>(
  (
    {
      id,
      className,
      placeholder = "Select date",
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const dateValue = value ? new Date(value) : undefined

    const formatDate = (date: Date | undefined | null) => {
      if (!date) {
        return ""
      }
      return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    }

    return (
      <div className="w-full" id={id}>
        <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                role="combobox"
                size={"lg"}
                disabled={disabled}
                className={cn(
                  "h-9! w-full justify-between font-normal",
                  !dateValue && "text-quiet",
                  className
                )}
                type="button"
              />
            }
          >
            {formatDate(dateValue) || placeholder}
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </PopoverTrigger>
          <PopoverContent
            className="w-80 overflow-hidden rounded-2xl p-0"
            align="center"
            side="left"
          >
            <Calendar
              mode="single"
              selected={dateValue}
              captionLayout="dropdown"
              disabled={disabled}
              onSelect={(date: Date | null) => {
                onChange?.(date || null)
                setOpen(false)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <input
          type="hidden"
          ref={ref}
          {...props}
          value={dateValue ? dateValue.toISOString() : ""}
        />
      </div>
    )
  }
)
