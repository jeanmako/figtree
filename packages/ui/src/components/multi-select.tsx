"use client";

import { cn } from "@figtree/ui/lib/utils";
import { Button } from "@figtree/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@figtree/ui/components/command";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@figtree/ui/components/popover";
import {
  ComponentPropsWithRef,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { Badge } from "@figtree/ui/components/badge";
import { Icons } from "@figtree/ui/components/icons";

type MultiSelectContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValues: Set<string>;
  toggleValue: (value: string) => void;
  items: Map<string, ReactNode>;
  single: boolean;
  onItemAdded: (value: string, label: ReactNode) => void;
};
const MultiSelectContext = createContext<MultiSelectContextType | null>(null);

export function MultiSelect({
  children,
  values,
  defaultValues,
  onValuesChange,
  single = false,
}: {
  children: ReactNode;
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  single?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [internalValues, setInternalValues] = useState(
    new Set<string>(values ?? defaultValues),
  );
  const selectedValues = values ? new Set(values) : internalValues;
  const [items, setItems] = useState<Map<string, ReactNode>>(new Map());

  function toggleValue(value: string) {
    const getNewSet = (prev: Set<string>) => {
      if (single) {
        return prev.has(value) ? new Set<string>() : new Set<string>([value]);
      }
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    };
    setInternalValues(getNewSet);
    onValuesChange?.([...getNewSet(selectedValues)]);
    if (single) setOpen(false);
  }

  const onItemAdded = useCallback((value: string, label: ReactNode) => {
    setItems((prev) => {
      if (prev.get(value) === label) return prev;
      return new Map(prev).set(value, label);
    });
  }, []);

  return (
    <MultiSelectContext
      value={{
        open,
        setOpen,
        selectedValues,
        single,
        toggleValue,
        items,
        onItemAdded,
      }}
    >
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        {children}
      </Popover>
    </MultiSelectContext>
  );
}

export function MultiSelectTrigger({
  className,
  children,
  withChevron = true,
  ref,
  ...props
}: {
  className?: string;
  children?: ReactNode;
  withChevron?: boolean;
} & ComponentPropsWithRef<typeof Button>) {
  const { open } = useMultiSelectContext();

  return (
    <PopoverTrigger
      render={
        <Button
          ref={ref}
          className={cn(
            "w-full bg-quietest py-0 has-aria-expanded:bg-quietest",
            className,
          )}
          variant={props.variant ?? "secondary"}
          role={props.role ?? "combobox"}
          aria-expanded={props["aria-expanded"] ?? open}
        />
      }
    >
      <span className="-mx-1.5 w-[calc(100%+12px)] inline-flex items-center justify-between">
        {children}
        {withChevron && <Icons.chevronSelector className="text-quiet" />}
      </span>
    </PopoverTrigger>
  );
}

export function MultiSelectValue({
  placeholder,
  clickToRemove = true,
  customBadge,
  className,
  overflowBehavior = "wrap-when-open",
  ...props
}: {
  placeholder?: string;
  clickToRemove?: boolean;
  overflowBehavior?: "wrap" | "wrap-when-open" | "overflow";
  customBadge?: (
    value: string,
    label: React.ReactNode,
    onRemove: () => void,
  ) => React.ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">) {
  const { selectedValues, toggleValue, items, open, single } =
    useMultiSelectContext();
  const [overflowAmount, setOverflowAmount] = useState(0);
  const valueRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);

  const shouldWrap =
    overflowBehavior === "wrap" ||
    (overflowBehavior === "wrap-when-open" && open);

  const checkOverflow = useCallback(() => {
    if (valueRef.current == null) return;

    const containerElement = valueRef.current;
    const overflowElement = overflowRef.current;
    const items = containerElement.querySelectorAll<HTMLElement>(
      "[data-selected-item]",
    );

    if (overflowElement != null) overflowElement.style.display = "none";
    items.forEach((child) => child.style.removeProperty("display"));
    let amount = 0;
    for (let i = items.length - 1; i >= 0; i--) {
      const child = items[i]!;
      if (containerElement.scrollWidth <= containerElement.clientWidth) {
        break;
      }
      amount = items.length - i;
      child.style.display = "none";
      overflowElement?.style.removeProperty("display");
    }
    setOverflowAmount(amount);
  }, []);

  const handleResize = useCallback(
    (node: HTMLDivElement) => {
      valueRef.current = node;

      const mutationObserver = new MutationObserver(checkOverflow);
      const observer = new ResizeObserver(debounce(checkOverflow, 100));

      mutationObserver.observe(node, {
        childList: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });
      observer.observe(node);

      return () => {
        observer.disconnect();
        mutationObserver.disconnect();
        valueRef.current = null;
      };
    },
    [checkOverflow],
  );

  if (selectedValues.size === 0 && placeholder) {
    return (
      <span
        className={cn(
          "min-w-0 overflow-hidden text-tiny font-medium text-quieter",
          customBadge && "text-sm",
        )}
      >
        {placeholder}
      </span>
    );
  }

  if (single && selectedValues.size > 0) {
    return (
      <span className="min-w-0 overflow-hidden">
        {items.get([...selectedValues][0]!)}
      </span>
    );
  }

  return (
    <div
      {...props}
      ref={handleResize}
      className={cn(
        "flex w-full gap-1 overflow-hidden",
        shouldWrap && "h-full flex-wrap",
        className,
      )}
    >
      {[...selectedValues]
        .filter((value) => items.has(value))
        .map((value) => {
          const label = items.get(value);
          const onRemove = () => {
            if (clickToRemove) {
              toggleValue(value);
            }
          };

          if (customBadge) {
            return (
              <div
                key={value}
                data-selected-item
                onClick={(e) => e.stopPropagation()}
              >
                {customBadge(value, label, onRemove)}
              </div>
            );
          }

          return (
            <Badge
              variant="ghost"
              data-selected-item
              className="group flex items-center gap-1"
              key={value}
              onClick={
                clickToRemove
                  ? (e) => {
                      e.stopPropagation();
                      toggleValue(value);
                    }
                  : undefined
              }
            >
              {label}
              {clickToRemove && (
                <Icons.xFill className="size-3 group-hover:text-destructive transition-color duration-300" />
              )}
            </Badge>
          );
        })}
      <Badge
        style={{
          display: overflowAmount > 0 && !shouldWrap ? "block" : "none",
        }}
        variant="ghost"
        ref={overflowRef}
      >
        +{overflowAmount}
      </Badge>
    </div>
  );
}

export function MultiSelectContent({
  search = true,
  children,
  ...props
}: {
  search?: boolean | { placeholder?: string; emptyMessage?: string };
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Command>, "children">) {
  const canSearch = typeof search === "object" ? true : search;

  return (
    <>
      <div style={{ display: "none" }}>
        <Command>
          <CommandList>{children}</CommandList>
        </Command>
      </div>
      <PopoverPopup>
        <Command {...props}>
          {canSearch ? (
            <CommandInput
              startAddon={<Icons.search />}
              className="border-none focus:ring-0"
              placeholder={
                typeof search === "object" ? search.placeholder : undefined
              }
            />
          ) : (
            <button autoFocus className="sr-only" />
          )}
          <CommandList>
            {canSearch && (
              <CommandEmpty>
                {typeof search === "object" ? search.emptyMessage : undefined}
              </CommandEmpty>
            )}
            {children}
          </CommandList>
        </Command>
      </PopoverPopup>
    </>
  );
}

export function MultiSelectItem({
  value,
  children,
  badgeLabel,
  onSelect,
  disabled,
  ...props
}: {
  badgeLabel?: ReactNode;
  value: string;
  onSelect?: (value: string) => void;
  children: ReactNode;
  disabled?: boolean;
} & Omit<
  ComponentPropsWithoutRef<typeof CommandItem>,
  "value" | "onSelect" | "disabled"
>) {
  const { toggleValue, selectedValues, onItemAdded } = useMultiSelectContext();
  const isSelected = selectedValues.has(value);

  useEffect(() => {
    onItemAdded(value, badgeLabel ?? children);
  }, [value, children, onItemAdded, badgeLabel]);

  return (
    <CommandItem
      {...props}
      {...(disabled && { disabled })}
      onSelect={() => {
        toggleValue(value);
        onSelect?.(value);
      }}
    >
      <div className="col-start-1 flex w-full">{children}</div>
      <span className="col-start-2">
        <Icons.checkFill
          className={cn("size-4", isSelected ? "opacity-100" : "opacity-0")}
        />
      </span>
    </CommandItem>
  );
}

export function MultiSelectGroup({
  ...props
}: ComponentPropsWithoutRef<typeof CommandGroup>) {
  return <CommandGroup {...props} />;
}

export function MultiSelectSeparator(
  props: ComponentPropsWithoutRef<typeof CommandSeparator>,
) {
  return <CommandSeparator {...props} />;
}

export function useMultiSelectContext() {
  const context = useContext(MultiSelectContext);
  if (context == null) {
    throw new Error(
      "useMultiSelectContext must be used within a MultiSelectContext",
    );
  }
  return context;
}

function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
