import { cn } from "@figtree/ui/lib/utils";

type Props = {
  title: string;
  description?: string;
  className?: string;
};

function SectionWrapper({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full py-6 relative", className)} {...props}>
      {children}
    </div>
  );
}

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  dashboard?: boolean;
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
        "px-6 relative z-1 max-w-full w-full",
        dashboard && "px-8",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

function SectionHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 mb-4 w-full", className)} {...props}>
      {children}
    </div>
  );
}

function SectionHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-xl font-medium leading-tight capitalize", className)}
      {...props}
    />
  );
}

function SectionHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-light lg:leading-relaxed text-washed-purple-300 text-balance",
        className,
      )}
      {...props}
    />
  );
}

function Section({ title, description, className }: Props) {
  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <h2 className="text-2xl font-medium tracking-tight leading-6.5">
        {title}
      </h2>
      <p className="text-[15px] font-normal text-quiet">{description}</p>
    </div>
  );
}

function Header({ title, description, className }: Props) {
  return (
    <div className={cn("flex flex-col", className)}>
      <h2 className="mb-2 lg:text-3xl lg:leading-tight font-semibold tracking-snug text-balance text-center">
        {title}
      </h2>
      {description && (
        <p className="text-quiet text-center text-base font-medium">
          {description}
        </p>
      )}
    </div>
  );
}

export {
  SectionHeader,
  SectionHeaderDescription,
  SectionHeaderTitle,
  SectionContainer,
  SectionWrapper,
  Section,
  Header,
};
