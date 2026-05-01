/* eslint-disable react-hooks/exhaustive-deps */
import { countries } from "@figtree/utils/constants/countries"
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
  ComboboxValue,
} from "@figtree/ui/components/combobox"
import * as React from "react"
import { useEffect } from "react"
import { Button } from "@figtree/ui/components/button"
import { Icons } from "@figtree/ui/components/icons"
import { cn } from "@figtree/ui/lib/utils"

// TODO: Add flags to the country list and display them in the selector.

type Props = {
  defaultValue: string
  onSelect: (code: string, name: string) => void
  value?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  searchPlaceholder?: string
  emptyMessage?: string
}

export function CountrySelector({
  defaultValue,
  onSelect,
  disabled = false,
  placeholder = "Select country",
  className,
  searchPlaceholder = "Search...",
  emptyMessage = "No country found.",
}: Props) {
  const defaultCountry = Object.values(countries).find(
    (country) => country.code === defaultValue
  )
  const [value, setValue] = React.useState(defaultCountry?.name || "")

  useEffect(() => {
    const newDefaultCountry = Object.values(countries).find(
      (country) => country.code === defaultValue
    )
    if (newDefaultCountry?.name !== value) {
      setValue(newDefaultCountry?.name || "")
    }
  }, [defaultValue])

  return (
    <Combobox
      items={Object.values(countries)}
      value={value}
      onValueChange={(v) => {
        const newValue = String(v ?? "")
        setValue(newValue)
        const selected = Object.values(countries).find(
          (c) => c.name === newValue
        )
        if (selected) onSelect?.(selected.code, selected.name)
      }}
    >
      <ComboboxTrigger
        render={
          <Button
            className={cn("bg-quietest w-full justify-between px-2", className)}
            variant="secondary"
          />
        }
        disabled={disabled}
      >
        <ComboboxValue />
        <Icons.chevronSelector className="text-quiet" />
      </ComboboxTrigger>
      <ComboboxPopup aria-label={placeholder}>
        <div className="border-b p-2">
          <ComboboxInput
            className="w-full border-none focus:ring-0"
            placeholder={searchPlaceholder}
            showTrigger={false}
            startAddon={<Icons.search className="text-quieter" />}
            // size={"sm"}
          />
        </div>

        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item.name}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}
