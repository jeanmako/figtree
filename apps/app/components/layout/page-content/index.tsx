import { cn } from "@figtree/ui/lib/utils"
import { PropsWithChildren } from "react"
import {
  // PageContentHeader,
  PageContentHeaderProps,
} from "./page-content-header"
import { ScrollArea } from "@figtree/ui/components/scroll-area"
import PageContentTab, { PageContentTabItem } from "./page-content-tab"

export { PageContentTab, type PageContentTabItem }

export function PageContent({
  className,
  contentClassName,
  children,
  // ...headerProps
}: PropsWithChildren<
  {
    className?: string
    contentClassName?: string
  } & PageContentHeaderProps
>) {
  return (
    <div
      className={cn(
        "@container/page flex max-w-full flex-[1_1_auto] flex-col items-stretch justify-start py-4",
        className
      )}
    >
      {/* <PageContentHeader {...headerProps} /> */}
      <div className="relative flex h-full w-full flex-col items-stretch justify-start overflow-hidden">
        <ScrollArea className={cn("h-full", contentClassName)}>
          {children}
        </ScrollArea>
      </div>
    </div>
  )
}
