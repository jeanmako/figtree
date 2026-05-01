"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@figtree/ui/components/multi-select";
import { EntityCustomBadge } from "./entity-custom-badge.js";

// Sample data
const sampleCompanies = [
  { id: "1", name: "Acme Corporation" },
  { id: "2", name: "Tech Startup Inc" },
  { id: "3", name: "Design Agency LLC" },
];

const exampleSchema = z.object({
  companies: z
    .array(
      z.object({
        companyId: z.string(),
        jobTitle: z.string().optional(),
        isPrimary: z.boolean().optional(),
      }),
    )
    .optional(),
});

type ExampleFormData = z.infer<typeof exampleSchema>;

export function EntityCustomBadgeExample() {
  const form = useForm<ExampleFormData>({
    resolver: zodResolver(exampleSchema),
    defaultValues: {
      companies: [],
    },
  });

  const getCompanyUrl = (companyId: string) => {
    return `/companies/${companyId}`;
  };

  // Custom badge renderer for multi-select
  const customBadgeRenderer = (
    value: string,
    label: React.ReactNode,
    onRemove: () => void,
  ) => {
    const company = sampleCompanies.find((c) => c.id === value);
    if (!company) return null;

    const entityData =
      form.watch("companies")?.find((c: any) => c.companyId === value) || {};

    const handleUpdate = (updates: any) => {
      const currentCompanies = form.getValues("companies") || [];
      const updatedCompanies = currentCompanies.map((c: any) =>
        c.companyId === value ? { ...c, ...updates } : c,
      );
      form.setValue("companies", updatedCompanies);
    };

    return (
      <EntityCustomBadge
        id={company.id}
        name={company.name}
        onUpdate={handleUpdate}
        onRemove={onRemove}
        getEntityUrl={getCompanyUrl}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">{company.name}</h3>
          </div>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-xs font-medium">Job title</label>
              <input
                type="text"
                className="w-full px-2 py-1 text-sm border rounded"
                placeholder="e.g. Creative Director"
                value={entityData.jobTitle || ""}
                onChange={(e) => handleUpdate({ jobTitle: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">
                Main point of contact?
              </label>
              <input
                type="checkbox"
                className="size-4"
                checked={entityData.isPrimary || false}
                onChange={(e) => handleUpdate({ isPrimary: e.target.checked })}
              />
            </div>
          </div>
        </div>
      </EntityCustomBadge>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Custom Badge in MultiSelect</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Multi-Select with Custom Entity Badges
        </h3>

        <MultiSelect
          values={form.watch("companies")?.map((c: any) => c.companyId) || []}
          onValuesChange={(companyIds: string[]) => {
            const currentCompanies = form.getValues("companies") || [];
            const next = companyIds.map((companyId) => {
              const existing = currentCompanies.find(
                (c: any) => c.companyId === companyId,
              );
              return existing ?? { companyId, jobTitle: "", isPrimary: false };
            });
            form.setValue("companies", next);
          }}
        >
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue
              placeholder="Select companies..."
              customBadge={customBadgeRenderer}
            />
          </MultiSelectTrigger>
          <MultiSelectContent
            search={{
              placeholder: "Search companies...",
              emptyMessage: "No company found.",
            }}
          >
            <MultiSelectGroup>
              {sampleCompanies.map((company) => (
                <MultiSelectItem key={company.id} value={company.id}>
                  {company.name}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Form Values</h3>
        <pre className="p-4 bg-muted rounded-md text-sm overflow-auto">
          {JSON.stringify(form.watch(), null, 2)}
        </pre>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Features</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Custom badges in multi-select value</li>
          <li>
            Click badge to open popover with job title and isPrimary fields
          </li>
          <li>Click chevron to navigate to company page</li>
          <li>Click X to remove company</li>
          <li>Fully integrated with React Hook Form</li>
        </ul>
      </div>
    </div>
  );
}
