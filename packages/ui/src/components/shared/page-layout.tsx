import { cn } from "@figtree/ui/lib/utils";

function PageContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-h-full h-full max-w-[1680px] relative",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  dashboard?: boolean;
}

function PageWrapper({
  className,
  children,
  dashboard = false,
  ...props
}: PageWrapperProps) {
  return (
    <div
      className={cn("px-8 pt-8 w-full", dashboard && "px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-w-full mx-6 pt-8 grid grid-cols-1 items-end",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function PageTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "!leading-tight text-left text-2xl lg:text-4xl font-semibold lg:!leading-[1.1]",
        className,
      )}
      {...props}
    />
  );
}

function PageDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-quiet leading-[1.4] sm:text-base px-4 sm:px-0 text-center",
        className,
      )}
      {...props}
    />
  );
}

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-start gap-2 py-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  PageActions,
  PageContainer,
  PageWrapper,
  PageHeader,
  PageDescription,
  PageTitle,
};
