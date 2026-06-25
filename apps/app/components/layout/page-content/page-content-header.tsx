import { cn } from "@figtree/ui/lib/utils"
import { ReactNode } from "react"
import { PageWidthWrapper } from "./page-width-wrapper"

export type PageContentHeaderProps = {
  title?: string
  icon?: ReactNode
  controls?: ReactNode
}

export function PageContentHeader({
  title,
  icon,
  controls,
}: PageContentHeaderProps): React.ReactElement {
  return (
    <>
      {title && (
        <PageWidthWrapper className="item-center flex h-8 w-full justify-start px-4">
          <div
            className={cn(
              "me-auto flex h-full items-center justify-between gap-4"
              // hasHeaderContent ? "sm:h-16" : "sm:h-0",
            )}
          >
            <div className="flex min-w-0 items-center gap-x-1">
              <div className="flex min-w-0 items-center gap-1.5 px-1.5 [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-foreground">
                {icon}
                <h1 className="text-[19px] leading-6 font-semibold! tracking-snug text-foreground">
                  {title}
                </h1>
              </div>
            </div>
            {controls && (
              <div className="flex items-center gap-2">{controls}</div>
            )}
          </div>
        </PageWidthWrapper>
      )}
    </>
  )
}
