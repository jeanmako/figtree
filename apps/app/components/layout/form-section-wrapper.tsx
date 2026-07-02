import { PropsWithChildren } from "react"
import { cn } from "@figtree/ui/lib/utils"

type Props = {
  title?: string
  className?: string
  addOn?: React.ReactNode
}

export const FormSectionWrapper = ({
  children,
  title,
  className,
  // addOn
}: Props & PropsWithChildren) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col rounded-[12px] bg-background p-4 shadow-square",
        title && "gap-y-4",
        className
      )}
    >
      {title && (
        <span className="w-full text-left text-sm leading-4.5 font-semibold tracking-snug">
          {title}
        </span>
      )}
      {children}
    </div>
  )
}
