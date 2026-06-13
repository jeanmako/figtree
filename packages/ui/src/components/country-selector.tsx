"use client"

import { countries, type CountryCode } from "@figtree/utils/constants/countries"
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
} from "@figtree/ui/components/combobox"
import { Button } from "@figtree/ui/components/button"
import { Icons } from "@figtree/ui/components/icons"
import { cn } from "@figtree/ui/lib/utils"

type Props = {
  value?: CountryCode
  id?: string
  name: string
  onValueChange: (value: CountryCode) => void
  onBlur?: () => void
  disabled?: boolean
  isInvalid?: boolean
  placeholder?: string
  className?: string
  popupClassName?: string
  searchPlaceholder?: string
  emptyMessage?: string
}

export function CountrySelector({
  id,
  name,
  value,
  onValueChange,
  onBlur,
  disabled = false,
  isInvalid = false,
  placeholder = "Select country",
  className,
  searchPlaceholder = "Search...",
  emptyMessage = "No country found.",
  popupClassName,
}: Props) {
  return (
    <Combobox
      name={name}
      items={Object.values(countries)}
      value={value ?? ""}
      onValueChange={(v) => {
        if (typeof v !== "string") return

        onValueChange(v as CountryCode)
      }}
    >
      <ComboboxTrigger
        render={
          <Button
            className={cn("w-full justify-between bg-quietest px-2", className)}
            variant="secondary"
          />
        }
        id={id}
        disabled={disabled}
        onBlur={onBlur}
        aria-invalid={isInvalid}
      >
        {value ? (
          <span className="flex items-center gap-2">
            <span>{countries[value].emoji}</span>
            <span>{countries[value].name}</span>
          </span>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}

        <Icons.chevronSelector className="text-quiet" />
      </ComboboxTrigger>

      <ComboboxPopup aria-label={placeholder} className={popupClassName}>
        <div className="border-b p-2">
          <ComboboxInput
            className="w-full border-none focus:ring-0"
            placeholder={searchPlaceholder}
            showTrigger={false}
            startAddon={<Icons.search className="text-quieter" />}
          />
        </div>

        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>

        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item.code}>
              {item.emoji} {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}
