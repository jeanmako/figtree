import { cn } from "@figtree/ui/lib/utils";
import { ReactNode } from "react";

export function PageWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("w-full", className)}>{children}</div>;
}
