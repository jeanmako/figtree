"use client";

import type { ReactNode } from "react";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectSeparator,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@figtree/ui/components/multi-select";

// ============================================================================
// Types
// ============================================================================

/**
 * Item type for the Selector component.
 * Generic over the value type T for full type safety.
 */
export interface SelectorItem<T> {
  /** The unique value that will be returned on selection */
  value: T;
  /** The display label shown in the dropdown and trigger */
  label: string;
  /** Optional badge label shown in the selected badge (defaults to label) */
  badgeLabel?: ReactNode;
  /** Optional flag to disable this item */
  disabled?: boolean;
}

/**
 * Group type for organizing items into labeled sections.
 */
export interface SelectorGroup<T> {
  /** The group label shown as a header */
  label: string;
  /** Items belonging to this group */
  items: SelectorItem<T>[];
}

type SelectorItems<T> = SelectorItem<T>[] | SelectorGroup<T>[];

function isGrouped<T>(items: SelectorItems<T>): items is SelectorGroup<T>[] {
  return items.length > 0 && "items" in items[0]!;
}

function flattenItems<T>(items: SelectorItems<T>): SelectorItem<T>[] {
  if (isGrouped(items)) {
    return items.flatMap((group) => group.items);
  }
  return items;
}

// ============================================================================
// Shared Props
// ============================================================================

interface BaseSelectorProps<T> {
  /** Array of items or grouped items to display */
  items: SelectorItems<T>;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Search configuration - true to enable with defaults, object for custom config, false to disable */
  search?: boolean | { placeholder?: string; emptyMessage?: string };
  /** Disable the selector */
  disabled?: boolean;
  /** Additional class name for the trigger */
  className?: string;
  /** Custom render function for items in the dropdown */
  renderItem?: (item: SelectorItem<T>) => ReactNode;
}

// ============================================================================
// Single Selector
// ============================================================================

export interface SelectorProps<T> extends BaseSelectorProps<T> {
  /** Controlled value */
  value?: T;
  /** Default value for uncontrolled mode */
  defaultValue?: T;
  /** Callback when value changes */
  onValueChange?: (value: T | undefined) => void;
}

function Selector<T>({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select...",
  search = true,
  disabled = false,
  className,
  renderItem,
}: SelectorProps<T>) {
  const flatItems = flattenItems(items);

  // Convert T to string for internal use
  const valueToString = (v: T): string => String(v);
  const stringToValue = (s: string): T | undefined => {
    const item = flatItems.find((i) => valueToString(i.value) === s);
    return item?.value;
  };

  const handleValuesChange = (vals: string[]) => {
    const newValue = vals.length > 0 ? stringToValue(vals[0]!) : undefined;
    onValueChange?.(newValue);
  };

  const controlledValue =
    value !== undefined ? [valueToString(value)] : undefined;
  const defaultVal =
    defaultValue !== undefined ? [valueToString(defaultValue)] : undefined;

  return (
    <MultiSelect
      single
      values={controlledValue}
      defaultValues={defaultVal}
      onValuesChange={handleValuesChange}
    >
      <MultiSelectTrigger className={className} disabled={disabled}>
        <MultiSelectValue placeholder={placeholder} />
      </MultiSelectTrigger>
      <MultiSelectContent search={search}>
        {isGrouped(items)
          ? items.map((group, groupIndex) => (
              <MultiSelectGroup key={group.label} heading={group.label}>
                {group.items.map((item) => (
                  <MultiSelectItem
                    key={valueToString(item.value)}
                    value={valueToString(item.value)}
                    badgeLabel={item.badgeLabel ?? item.label}
                    disabled={item.disabled}
                  >
                    {renderItem ? renderItem(item) : item.label}
                  </MultiSelectItem>
                ))}
                {groupIndex < items.length - 1 && <MultiSelectSeparator />}
              </MultiSelectGroup>
            ))
          : flatItems.map((item) => (
              <MultiSelectItem
                key={valueToString(item.value)}
                value={valueToString(item.value)}
                badgeLabel={item.badgeLabel ?? item.label}
                disabled={item.disabled}
              >
                {renderItem ? renderItem(item) : item.label}
              </MultiSelectItem>
            ))}
      </MultiSelectContent>
    </MultiSelect>
  );
}

// ============================================================================
// Multi Selector
// ============================================================================

export interface MultiSelectorProps<T> extends BaseSelectorProps<T> {
  /** Controlled value array */
  value?: T[];
  /** Default value array for uncontrolled mode */
  defaultValue?: T[];
  /** Callback when values change */
  onValueChange?: (value: T[]) => void;
  /** Maximum number of items that can be selected */
  maxItems?: number;
  /** Whether badges can be removed by clicking (default: true) */
  clickToRemove?: boolean;
  /** Overflow behavior for selected items (default: "wrap-when-open") */
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff";
}

function MultiSelector<T>({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select...",
  search = true,
  disabled = false,
  className,
  renderItem,
  maxItems,
  clickToRemove = true,
  overflowBehavior = "wrap-when-open",
}: MultiSelectorProps<T>) {
  const flatItems = flattenItems(items);

  // Convert T to string for internal use
  const valueToString = (v: T): string => String(v);
  const stringToValue = (s: string): T | undefined => {
    const item = flatItems.find((i) => valueToString(i.value) === s);
    return item?.value;
  };

  const handleValuesChange = (vals: string[]) => {
    // Enforce maxItems limit
    if (maxItems !== undefined && vals.length > maxItems) {
      return;
    }
    const newValues = vals
      .map(stringToValue)
      .filter((v): v is T => v !== undefined);
    onValueChange?.(newValues);
  };

  const controlledValue = value?.map(valueToString);
  const defaultVal = defaultValue?.map(valueToString);

  // Determine if an item should be disabled (including max items check)
  const isItemDisabled = (item: SelectorItem<T>): boolean => {
    if (item.disabled) return true;
    if (maxItems === undefined) return false;
    const currentCount = value?.length ?? 0;
    const isSelected = value?.some(
      (v) => valueToString(v) === valueToString(item.value),
    );
    return currentCount >= maxItems && !isSelected;
  };

  return (
    <MultiSelect
      values={controlledValue}
      defaultValues={defaultVal}
      onValuesChange={handleValuesChange}
    >
      <MultiSelectTrigger className={className} disabled={disabled}>
        <MultiSelectValue
          placeholder={placeholder}
          clickToRemove={clickToRemove}
          overflowBehavior={overflowBehavior}
        />
      </MultiSelectTrigger>
      <MultiSelectContent search={search}>
        {isGrouped(items)
          ? items.map((group, groupIndex) => (
              <MultiSelectGroup key={group.label} heading={group.label}>
                {group.items.map((item) => (
                  <MultiSelectItem
                    key={valueToString(item.value)}
                    value={valueToString(item.value)}
                    badgeLabel={item.badgeLabel ?? item.label}
                    disabled={isItemDisabled(item)}
                  >
                    {renderItem ? renderItem(item) : item.label}
                  </MultiSelectItem>
                ))}
                {groupIndex < items.length - 1 && <MultiSelectSeparator />}
              </MultiSelectGroup>
            ))
          : flatItems.map((item) => (
              <MultiSelectItem
                key={valueToString(item.value)}
                value={valueToString(item.value)}
                badgeLabel={item.badgeLabel ?? item.label}
                disabled={isItemDisabled(item)}
              >
                {renderItem ? renderItem(item) : item.label}
              </MultiSelectItem>
            ))}
      </MultiSelectContent>
    </MultiSelect>
  );
}

// ============================================================================
// Exports
// ============================================================================

export { Selector, MultiSelector };
