"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@figtree/ui/lib/utils";

type TabsVariant = "default" | "underline" | "custom";

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      className={cn(
        "flex flex-col gap-2 data-[orientation=vertical]:flex-row",
        className,
      )}
      data-slot="tabs"
      {...props}
    />
  );
}

function TabsList({
  variant = "default",
  className,
  children,
  ...props
}: TabsPrimitive.List.Props & {
  variant?: TabsVariant;
}) {
  return (
    <TabsPrimitive.List
      className={cn(
        "relative z-0 flex w-fit items-center justify-center gap-x-0.5 text-quiet",
        "data-[orientation=vertical]:flex-col",
        variant === "default"
          ? "rounded-lg bg-accent p-0.5 text-quiet/72"
          : variant === "custom"
            ? "data-[orientation=horizontal]:py-0 *:data-[slot=tabs-trigger]:hover:bg-background"
            : "data-[orientation=vertical]:px-1 data-[orientation=horizontal]:py-1 *:data-[slot=tabs-trigger]:hover:bg-accent",
        className,
      )}
      data-slot="tabs-list"
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        className={cn(
          "-translate-y-(--active-tab-bottom) absolute bottom-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) transition-[width,translate] duration-200 ease-in-out",
          variant === "underline"
            ? "data-[orientation=vertical]:-translate-x-px z-10 bg-primary data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 data-[orientation=horizontal]:translate-y-px"
            : "-z-1 rounded-md bg-background shadow-sm dark:bg-accent",
          variant === "custom" &&
            "bg-background dark:bg-background rounded-none shadow-none",
        )}
        data-slot="tab-indicator"
      />
    </TabsPrimitive.List>
  );
}

function TabsTab({
  className,
  custom = true,
  ...props
}: TabsPrimitive.Tab.Props & { custom?: boolean }) {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "[&_svg]:-mx-0.5 flex shrink-0 grow cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent font-medium text-base outline-none transition-[color,background-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-64 sm:text-sm [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "hover:text-quiet data-active:text-foreground",
        "h-9 gap-1.5 px-2.5 sm:h-8",
        "data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        custom && [
          "group flex h-7 sm:h-7 items-center gap-1.5 px-2 text-sm font-medium",
          "text-quiet",
          "hover:text-foreground hover:shadow-square",
          "data-active:bg-subtlest/70 data-active:hover:bg-subtlest/70! dark:data-active:bg-subtlest/40 dark:data-active:hover:bg-subtlest/40! data-active:shadow-square data-active:text-foreground",
        ],
        className,
      )}
      data-slot="tabs-trigger"
      {...props}
    />
  );
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      className={cn("flex-1 outline-none", className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTab,
  TabsTab as TabsTrigger,
  TabsPanel,
  TabsPanel as TabsContent,
};
