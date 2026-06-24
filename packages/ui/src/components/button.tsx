import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@figtree/ui/lib/utils"

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-md bg-clip-padding text-sm font-medium tracking-snug whitespace-nowrap transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.75",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-7.5 px-3 py-1.5",
        icon: "size-7.5 rounded-md",
        "icon-lg": "size-8",
        "icon-sm": "size-7 rounded-md",
        "icon-xl":
          "size-9 rounded-[12px] [&_svg:not([class*='size-'])]:size-4.5",
        "icon-xs": "size-6 rounded-sm",
        lg: "h-8 px-3.5 py-2 text-[15px]",
        sm: "h-7 gap-1.5 px-1.5 py-1 text-tiny!",
        xl: "h-9 rounded-[12px] px-4 py-2 text-base [&_svg:not([class*='size-'])]:size-4.5",
        xs: "h-6 gap-1 rounded-md px-2 py-1 text-xs before:rounded-md [&_svg:not([class*='size-'])]:size-3",
      },
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-primary/24 shadow-primary hover:bg-primary/90 [&:is(:disabled,:active,[data-pressed])]:shadow-none",
        destructive:
          "bg-destructive text-white shadow-xs shadow-destructive/24 hover:bg-destructive/90 [&:is(:disabled,:active,[data-pressed])]:shadow-none",
        "destructive-outline":
          "border-border bg-transparent text-destructive-foreground shadow-xs dark:bg-input/32 dark:not-in-data-[slot=group]:bg-clip-border [&:is(:disabled,:active,[data-pressed])]:shadow-none [&:is(:hover,[data-pressed])]:border-destructive/32 [&:is(:hover,[data-pressed])]:bg-destructive/4",
        ghost: "border-transparent hover:bg-subtlest data-pressed:bg-subtlest",
        link: "border-transparent underline-offset-4 hover:underline",
        outline:
          "bg-background shadow-square dark:not-in-data-[slot=group]:bg-clip-border [&:is(:disabled,:active,[data-pressed])]:shadow-none [&:is(:hover,[data-pressed])]:bg-subtlest",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 data-pressed:bg-secondary/80",
        inverse:
          "text-input [:hover,:active,[data-pressed]]:bg-subtle [:hover,:active,[data-pressed]]:shadow-box",
      },
    },
  }
)

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
}

function Button({ className, variant, size, render, ...props }: ButtonProps) {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button"

  const defaultProps = {
    className: cn(buttonVariants({ className, size, variant })),
    "data-slot": "button",
    type: typeValue,
  }

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  })
}

export { Button, buttonVariants }
