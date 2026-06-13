"use client"

import * as React from "react"

import { getTimezones, type Timezone } from "@figtree/utils/constants/timezones"

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

import { Button } from "@figtree/ui/components/button"

import { Icons } from "@figtree/ui/components/icons"

import { cn } from "@figtree/ui/lib/utils"

type Props = {
  id?: string
  name: string
  value?: Timezone
  className?: string
  onValueChange: (value: Timezone) => void
  onBlur?: () => void
  disabled?: boolean
  isInvalid?: boolean
  popupClassName?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
}

export function TimezoneSelector({
  id,
  name,
  value,
  onValueChange,
  onBlur,
  disabled = false,
  isInvalid = false,
  className,
  popupClassName,
  placeholder = "Select timezone",
  searchPlaceholder = "Search...",
  emptyMessage = "No timezone found.",
}: Props) {
  const timezones = getTimezones()

  const [currentBrowserTimezone, setCurrentBrowserTimezone] =
    React.useState<Timezone | null>(null)

  React.useEffect(() => {
    try {
      const browserTimezone = Intl.DateTimeFormat().resolvedOptions()
        .timeZone as Timezone

      setCurrentBrowserTimezone(browserTimezone)
    } catch (error) {
      console.warn("Failed to detect browser timezone:", error)
    }
  }, [])

  const items = timezones.map((timezone) => ({
    value: timezone.tzCode,
    label: `${timezone.name} (${timezone.utc})`,
    timezone,
  }))

  return (
    <Combobox
      name={name}
      items={items}
      value={items.find((item) => item.value === value) ?? null}
      onValueChange={(item) => {
        if (!item) return

        onValueChange(item.value)
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
        <ComboboxValue placeholder={placeholder} />

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
          {(item) => {
            const isBrowserTimezone = item.value === currentBrowserTimezone

            return (
              <ComboboxItem key={item.value} value={item}>
                {item.timezone.name}

                {/* {isBrowserTimezone && (
                    <span className="text-tiny text-quiet">Local</span>
                  )}
                </div> */}
              </ComboboxItem>
            )
          }}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}
