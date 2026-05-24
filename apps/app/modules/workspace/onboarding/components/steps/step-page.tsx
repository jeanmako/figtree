import { cn } from "@figtree/ui/lib/utils";
import { PropsWithChildren, ReactNode } from "react";

export function StepPage({
  children,
  title,
  description,
  className,
}: PropsWithChildren<{
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "flex flex-col w-full h-full",
        // "animate-slide-up-fade [--offset:10px] animation-duration-[1s] fill-mode-[both]",
        className,
      )}
    >
      <h1 className="text-xl leading-6 tracking-snug font-semibold">{title}</h1>
      <div className="mt-1.5 text-balance text-left text-sm text-quiet font-medium">
        {description}
      </div>
      <div className="mt-5 w-full h-full">{children}</div>
    </div>
  );
}
