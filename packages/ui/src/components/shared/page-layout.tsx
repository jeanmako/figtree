import { cn } from "@figtree/ui/lib/utils"

function PageContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative mx-auto h-full min-h-full w-full max-w-[1680px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function PageWrapper({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full px-8 pt-8", className)} {...props}>
      {children}
    </div>
  )
}

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-6 grid max-w-full grid-cols-1 items-end pt-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function PageTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-left text-2xl !leading-tight font-semibold lg:text-4xl lg:!leading-[1.1]",
        className
      )}
      {...props}
    />
  )
}

function PageDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-quiet px-4 text-center leading-[1.4] sm:px-0 sm:text-base",
        className
      )}
      {...props}
    />
  )
}

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-start gap-2 py-2",
        className
      )}
      {...props}
    />
  )
}

export {
  PageActions,
  PageContainer,
  PageWrapper,
  PageHeader,
  PageDescription,
  PageTitle,
}
