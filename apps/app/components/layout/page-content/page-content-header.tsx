import { cn } from "@figtree/ui/lib/utils";
import { ReactNode } from "react";
import { PageWidthWrapper } from "./page-width-wrapper";
import { Button } from "@figtree/ui/components/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@figtree/ui/components/tooltip";
import { Icons } from "@figtree/ui/components/icons";
import { SidebarBtnTrigger } from "../sidebar/sidebar-trigger";

export type PageContentHeaderProps = {
  title?: ReactNode;
  icon?: ReactNode;
  titleInfo?: ReactNode | { title: string; href?: string };
  controls?: ReactNode;
  headerContent?: ReactNode;
  withAskFig?: boolean;
};

export function PageContentHeader({
  title,
  icon,
  titleInfo,
  controls,
  headerContent,
  withAskFig = true,
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
    );

  return (
    <div
      className={cn(
        "relative min-h-12 shadow-bottom! flex flex-row items-center justify-start gap-1.5 flex-[1_1_auto] px-3 py-2.5 overflow-hidden",
      )}
    >
      <PageWidthWrapper>
        <div
          className={cn(
            "flex h-full items-center justify-between gap-4",
            // hasHeaderContent ? "sm:h-16" : "sm:h-0",
          )}
        >
          <div className="flex min-w-0 items-center gap-x-1">
            <SidebarBtnTrigger />
            {title && icon && (
              <div className="flex min-w-0 items-center gap-1.5 px-1.5 [&>svg]:size-3.75 [&>svg]:text-foreground [&>svg]:shrink-0">
                {icon}
                <h1 className="text-sm font-medium text-foreground leading-5">
                  {title}
                </h1>
                {finalTitleInfo}
              </div>
            )}
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
        {headerContent && <div className="pb-3 pt-1">{headerContent}</div>}
      </PageWidthWrapper>
    </div>
  );
}
