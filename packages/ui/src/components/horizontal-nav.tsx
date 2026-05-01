import { cn } from "@figtree/ui/lib/utils"
import { cva } from "class-variance-authority"

function HorizontalNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="nav-menu"
      data-nav="menu"
      className={cn("relative w-full min-w-0 px-3 py-2", className)}
      {...props}
    />
  )
}

function HorizontalNavContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="nav-menu-content"
      data-nav="content"
      className={cn(
        "flex w-full min-w-0 flex-row items-center gap-x-2",
        className
      )}
      {...props}
    />
  )
}

function HorizontalNavItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="nav-menu-item"
      data-nav="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const horizontalNavButtonVariants = cva(
  "peer/menu-button [&>svg]:text-duper flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm font-medium ring-sidebar-ring outline-hidden transition-[width,height,padding,background] duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-3.75 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-7",
        sm: "h-8 text-xs",
        lg: "h-12 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export {
  HorizontalNavContent,
  HorizontalNav,
  HorizontalNavItem,
  horizontalNavButtonVariants,
}
