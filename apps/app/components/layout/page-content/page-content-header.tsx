import { cn } from "@figtree/ui/lib/utils"
import { ReactNode } from "react"
import { PageWidthWrapper } from "./page-width-wrapper"
import { Button } from "@figtree/ui/components/button"
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@figtree/ui/components/tooltip"
import { Icons } from "@figtree/ui/components/icons"
import { SidebarBtnTrigger } from "../sidebar/sidebar-trigger"
import PageContentTab, { PageContentTabItem } from "./page-content-tab"

export type PageContentHeaderProps = {
  title?: ReactNode
  icon?: ReactNode
  titleInfo?: ReactNode | { title: string; href?: string }
  controls?: ReactNode
  headerContent?: ReactNode
  withAskFig?: boolean
  tabs?: PageContentTabItem[]
}

export function PageContentHeader({
  title,
  icon,
  titleInfo,
  controls,
  headerContent,
  withAskFig = true,
  tabs,
}: PageContentHeaderProps): React.ReactElement {
  // Generate titleInfo from object if provided
  const finalTitleInfo =
    titleInfo && typeof titleInfo === "object" && "title" in titleInfo ? (
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon-xs" />}>
          ?
        </TooltipTrigger>
        <TooltipPopup>
          {titleInfo.href
            ? `${titleInfo.title} [Learn more](${titleInfo.href})`
            : titleInfo.title}
        </TooltipPopup>
      </Tooltip>
    ) : (
      titleInfo
    )

  return (
    <div
      className={cn(
        "relative flex min-h-12 flex-[1_1_auto] flex-row items-center justify-start gap-1.5 overflow-hidden px-3 py-2.5 shadow-bottom!"
      )}
    >
      <PageWidthWrapper>
        <div
          className={cn(
            "flex h-full items-center justify-between gap-4"
            // hasHeaderContent ? "sm:h-16" : "sm:h-0",
          )}
        >
          <div className="flex min-w-0 items-center gap-x-1">
            <SidebarBtnTrigger />
            {tabs ? (
              <PageContentTab tabs={tabs} />
            ) : title && icon ? (
              <div className="flex min-w-0 items-center gap-1.5 px-1.5 [&>svg]:size-3.75 [&>svg]:shrink-0 [&>svg]:text-foreground">
                {icon}
                <h1 className="text-sm leading-5 font-medium text-foreground">
                  {title}
                </h1>
                {finalTitleInfo}
              </div>
            ) : null}
          </div>
          {controls && (
            <div className="flex items-center gap-2">{controls}</div>
          )}
          {withAskFig && (
            <Button size="sm" variant="outline">
              <Icons.leaf className="size-4!" />
              Ask Fig
            </Button>
          )}
        </div>
        {headerContent && <div className="pt-1 pb-3">{headerContent}</div>}
      </PageWidthWrapper>
    </div>
  )
}
