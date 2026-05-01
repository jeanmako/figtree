"use client"

import {
  getCurrencyLabel,
  uniqueCurrencies,
} from "@figtree/utils/constants/currencies"
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
import { ChevronsUpDownIcon, SearchIcon } from "lucide-react"

type Props = {
  value?: string
  className?: string
  currencies?: string[]
  onChange?: (value: string) => void
}

export function CurrencySelector({
  value: propValue,
  currencies: currenciesProp,
  onChange,
  className,
}: Props) {
  const currencyCodes = (
    currenciesProp && currenciesProp.length ? currenciesProp : uniqueCurrencies
  )
    .slice()
    .sort()

  const items = currencyCodes.map((code) => ({
    value: code,
    label: getCurrencyLabel(code),
  }))

  const [value, setValue] = React.useState<string>(propValue ?? "")

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if ((propValue ?? "") !== value) setValue(propValue ?? "")
  }, [propValue, value])

  return (
    <Combobox
      items={items}
      value={items.find((i) => i.value === value) ?? null}
      onValueChange={(item) => {
        const newValue = item?.value ?? ""
        setValue(newValue)
        onChange?.(newValue)
      }}
    >
      <ComboboxTrigger
        render={
          <Button
            className={`bg-quietest w-full justify-between text-foreground ${
              className ?? ""
            }`}
            variant="outline"
          />
        }
      >
        <ComboboxValue />
        <ChevronsUpDownIcon className="text-quiet -me-1" />
      </ComboboxTrigger>
      <ComboboxPopup aria-label="Select currency">
        <div className="border-b p-2">
          <ComboboxInput
            className="w-full border-none focus:ring-0"
            placeholder="Search..."
            showTrigger={false}
            startAddon={
              <SearchIcon strokeWidth={1.5} className="text-quieter" />
            }
          />
        </div>

        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}
