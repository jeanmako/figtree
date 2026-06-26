"use client"

import {
  CurrencyCode,
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
import { cn } from "@figtree/ui/lib/utils"

type Props = {
  id?: string
  name: string
  value?: CurrencyCode
  className?: string
  currencies?: string[]
  onValueChange: (value: CurrencyCode) => void
  onBlur?: () => void
  disabled?: boolean
  isInvalid?: boolean
  popupClassName?: string
}

export function CurrencySelector({
  id,
  name,
  disabled,
  isInvalid,
  value: propValue,
  currencies: currenciesProp,
  onValueChange,
  onBlur,
  className,
  popupClassName,
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
        onValueChange?.(newValue as CurrencyCode)
      }}
      name={name}
    >
      <ComboboxTrigger
        render={
          <Button
            className={cn("w-full justify-between px-2", className)}
            variant="outline"
          />
        }
        id={id}
        disabled={disabled}
        onBlur={onBlur}
        aria-invalid={isInvalid}
      >
        <ComboboxValue placeholder="Select currency" />
        <ChevronsUpDownIcon className="text-quiet" />
      </ComboboxTrigger>
      <ComboboxPopup aria-label="Select currency" className={popupClassName}>
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

        <ComboboxEmpty>No currency found.</ComboboxEmpty>
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
