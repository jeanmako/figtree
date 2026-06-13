"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@figtree/ui/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@figtree/ui/components/dialog"
import { ScrollArea } from "@figtree/ui/components/scroll-area"
function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-[12px] bg-alternative text-foreground dark:shadow-combo",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  startAddon,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  startAddon?: React.ReactNode
}) {
  return (
    <div data-slot="command-input-wrapper" className="border-b p-2!">
      <div className="relative flex w-full items-center">
        {startAddon && (
          <div
            aria-hidden="true"
            data-slot="command-start-addon"
            className="pointer-events-none absolute inset-y-0 inset-s-px z-10 flex items-center text-quieter [&_svg:not([class*='size-'])]:size-4"
          >
            {startAddon}
          </div>
        )}
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "relative h-6 w-full bg-transparent text-tiny font-medium outline-none placeholder:text-quieter disabled:cursor-not-allowed disabled:opacity-50",
            startAddon && "pl-6",
            className
          )}
          {...props}
        />
      </div>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <ScrollArea scrollbarGutter scrollFade>
      <CommandPrimitive.List
        data-slot="command-list"
        className={cn(
          "no-scrollbar! max-h-72 overflow-hidden outline-none not-empty:scroll-py-1 not-empty:px-1 not-empty:py-1",
          className
        )}
        {...props}
      />
    </ScrollArea>
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        "py-2! text-center text-sm font-medium text-quiet",
        className
      )}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-quiet **:[[cmdk-group-items]]:space-y-0.5",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative grid min-h-8 cursor-default grid-cols-[1fr_1rem] items-center gap-2 rounded-md py-1 ps-2! pe-4! text-sm font-medium outline-hidden outline-none select-none in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-alternative-foreground! data-[selected=true]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-quiet group-data-selected/command-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
