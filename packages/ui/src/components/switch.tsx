"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@figtree/ui/lib/utils"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "group/switch inline-flex h-4 w-7.5 shrink-0 cursor-pointer items-center rounded-full p-px transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-checked:bg-primary data-disabled:opacity-64 data-unchecked:bg-thumb",
        className
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-2.75 w-4 rounded-full bg-primary-foreground shadow-sm transition-[translate,width] group-active/switch:not-data-disabled:w-4 data-checked:translate-x-2.5 data-checked:group-active/switch:translate-x-3 data-unchecked:translate-x-0"
        )}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
