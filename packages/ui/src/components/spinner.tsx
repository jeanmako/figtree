import { cn } from "@figtree/ui/lib/utils";
import { Icons } from "@figtree/ui/components/icons";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Icons.spinner
      role="status"
      aria-label="Loading"
      className={cn("size-4", className)}
      {...props}
    />
  );
}

export { Spinner };
