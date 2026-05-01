import { cn } from "@figtree/ui/lib/utils";

type Props = {
  className?: string;
};

export const HrSeparator = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center my-4 mx-auto text-xs text-subtler font-semibold leading-tight before:w-full before:mr-4 before:ml-2.5 before:border-b before:border-border before:content-[''] after:w-full after:ml-4 after:mr-2.5 after:border-b after:border-border after:content-['']",
        className,
      )}
    >
      <span>OR</span>
    </div>
  );
};
