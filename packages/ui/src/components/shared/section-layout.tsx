import { cn } from "@figtree/ui/lib/utils"

type Props = {
  title: string
  description?: React.ReactNode
  className?: string
}

function SectionWrapper({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative w-full py-6", className)} {...props}>
      {children}
    </div>
  )
}

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  dashboard?: boolean
}

function SectionContainer({
  className,
  children,
  dashboard = false,
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "relative z-1 w-full max-w-full px-6",
        dashboard && "px-8",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

function SectionHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4 w-full px-6", className)} {...props}>
      {children}
    </div>
  )
}

function SectionHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-xl leading-tight font-medium capitalize", className)}
      {...props}
    />
  )
}

function SectionHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-washed-purple-300 font-light text-balance lg:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function Section({ title, description, className }: Props) {
  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <h2 className="text-2xl leading-6.5 font-medium tracking-tight">
        {title}
      </h2>
      <p className="text-[15px] font-normal text-quiet">{description}</p>
    </div>
  )
}

function Header({ title, description, className }: Props) {
  return (
    <div className={cn("flex flex-col", className)}>
      <h2 className="mb-2 text-center font-semibold tracking-snug text-balance lg:text-3xl lg:leading-tight">
        {title}
      </h2>
      {description &&
        (description instanceof String || typeof description === "string" ? (
          <p className="text-center text-base font-normal tracking-snug text-quiet">
            {description}
          </p>
        ) : (
          description
        ))}
    </div>
  )
}

export {
  SectionHeader,
  SectionHeaderDescription,
  SectionHeaderTitle,
  SectionContainer,
  SectionWrapper,
  Section,
  Header,
}
