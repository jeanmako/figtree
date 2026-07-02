"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@figtree/ui/lib/utils"
import { Icons } from "@figtree/ui/components/icons"
import { buttonVariants } from "@figtree/ui/components/button"

const Select = SelectPrimitive.Root

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default" | "lg"
}) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        buttonVariants({ size: size, variant: "outline" }),
        "min-h-8 min-w-36 justify-between text-left",
        size === "sm" && "min-h-7.5 gap-1.5 px-2",
        size === "lg" && "min-h-9",
        className
      )}
      data-slot="select-trigger"
      {...props}
    >
      {children}
      <SelectPrimitive.Icon data-slot="select-icon">
        <Icons.chevronSelector className="text-quiet" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      className={cn("flex-1 truncate data-placeholder:text-quiet", className)}
      data-slot="select-value"
      {...props}
    />
  )
}

function SelectPopup({
  className,
  children,
  sideOffset = 4,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props & {
  sideOffset?: SelectPrimitive.Positioner.Props["sideOffset"]
  alignItemWithTrigger?: SelectPrimitive.Positioner.Props["alignItemWithTrigger"]
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-50 select-none"
        data-slot="select-positioner"
        sideOffset={sideOffset}
      >
        <SelectPrimitive.Popup
          className="origin-(--transform-origin) transition-[scale,opacity] has-data-starting-style:scale-98 has-data-starting-style:opacity-0 has-data-[side=none]:scale-100 has-data-[side=none]:transition-none"
          data-slot="select-popup"
          {...props}
        >
          <SelectPrimitive.ScrollUpArrow
            className="before:from-popover top-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:top-px before:h-[200%] before:rounded-t-lg before:bg-linear-to-b before:from-50%"
            data-slot="select-scroll-up-arrow"
          >
            <Icons.chevronUp className="relative size-4" />
          </SelectPrimitive.ScrollUpArrow>
          <span className="relative block h-full rounded-[12px] border bg-alternative bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:shadow-lg dark:not-in-data-[slot=group]:bg-clip-border">
            <SelectPrimitive.List
              className={cn(
                "max-h-(--available-height) min-w-(--anchor-width) overflow-y-auto p-1",
                className
              )}
              data-slot="select-list"
            >
              {children}
            </SelectPrimitive.List>
          </span>
          <SelectPrimitive.ScrollDownArrow
            className="bottom-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:bottom-px before:h-[200%] before:rounded-b-lg before:bg-linear-to-t before:from-background before:from-50%"
            data-slot="select-scroll-down-arrow"
          >
            <Icons.chevronDown className="relative size-4" />
          </SelectPrimitive.ScrollDownArrow>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "grid min-h-8 cursor-default grid-cols-[1fr_1rem] items-center gap-2 overflow-hidden rounded-md py-1 ps-2 pe-4 text-sm font-medium outline-none in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] data-disabled:pointer-events-none data-disabled:opacity-64 data-highlighted:bg-alternative-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-3.75",
        className
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemText className="col-start-1 min-w-0 truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="col-start-2">
        <Icons.checkFill />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      className={cn("mx-2 my-1 h-px bg-border", className)}
      data-slot="select-separator"
      {...props}
    />
  )
}

function SelectGroup(props: SelectPrimitive.Group.Props) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectGroupLabel(props: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      className="px-2 py-1.5 text-xs font-medium text-quiet"
      data-slot="select-group-label"
      {...props}
    />
  )
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectPopup as SelectContent,
  SelectItem,
  SelectSeparator,
  SelectGroup,
  SelectGroupLabel,
}
