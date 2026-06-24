"use client"

import * as React from "react"

import { Button } from "@figtree/ui/components/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@figtree/ui/components/command"
import { Kbd, KbdGroup } from "@figtree/ui/components/kbd"
import { Icons } from "@figtree/ui/components/icons"

export function ActivityControl() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="flex w-full flex-col gap-4">
      <Button
        onClick={() => setOpen(true)}
        variant="inverse"
        size="xl"
        className="h-9.5 w-full justify-start bg-subtle px-0 py-0 shadow-box [:hover,[data-pressed]]:bg-subtle/60"
      >
        <div className="me-auto flex items-center overflow-hidden p-2">
          <span className="mr-1">
            <Icons.kButton className="size-4 shrink-0 opacity-80 **:data-[slot=bg]:fill-super **:data-[slot=letter-k]:text-secondary" />
          </span>
          <span className="truncate text-tiny">Quick actions</span>
        </div>
        <span className="ms-auto flex p-2">
          <KbdGroup>
            <Kbd>CTRL</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
