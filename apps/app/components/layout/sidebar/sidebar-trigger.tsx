"use client";
import { Button } from "@figtree/ui/components/button";
import { useSidebar } from "@figtree/ui/components/sidebar";
import { Icons } from "@figtree/ui/components/icons";
import { cn } from "@figtree/ui/lib/utils";

type Props = {
  isOutside?: boolean;
  className?: string;
};

export const SidebarBtnTrigger = ({
  isOutside = true,
  className,
}: Props): React.ReactElement => {
  const { state, toggleSidebar } = useSidebar();

  return (
    <div className="flex">
      {isOutside ? (
        state === "collapsed" && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "hover:bg-transparent size-6 transition-transform [&>svg]:size-4.5! [&>svg]:text-quiet [&>svg]:shrink-0",
              className,
            )}
            aria-label={"Expand sidebar"}
            aria-expanded={!(state === "collapsed")}
          >
            <Icons.panelOpen />
          </Button>
        )
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "hover:bg-transparent size-6 transition-transform [&>svg]:size-4.5! [&>svg]:text-quiet [&>svg]:shrink-0",
            className,
          )}
          aria-label={
            state === "collapsed" ? "Expand sidebar" : "Collapse sidebar"
          }
          aria-expanded={!(state === "collapsed")}
        >
          {state === "expanded" ? <Icons.panelClosed /> : <Icons.panelOpen />}
        </Button>
      )}
    </div>
  );
};
