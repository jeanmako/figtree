"use client"

import { useRef } from "react"
import {
  SectionCard,
  SectionCardContent,
  SectionCardFooter,
  SectionCardFrame,
  SectionCardHeader,
  SectionCardRow,
} from "@/components/layout/section-card"
import { useUpdateWorkspaceMutation } from "@/modules/workspace/hooks/workspace-update-mutation"
import {
  UpdateWorkspacePayload,
  updateWorkspaceBusinessSettingsSchema as schema,
  WorkspaceResponse,
} from "@figtree/shared/schemas/workspace"
import { useAppForm } from "@figtree/ui/hooks/form-hook"
import {
  industries,
  headcounts,
  clientTypes,
} from "@/modules/workspace/onboarding/lib/misc"
import { SelectItem } from "@figtree/ui/components/select"
import { MultiSelectItem } from "@figtree/ui/components/multi-select"
import { Button } from "@figtree/ui/components/button"
import { Spinner } from "@figtree/ui/components/spinner"

type Props = {
  workspace: WorkspaceResponse
}

const industryItems = industries.map((industry) => ({
  label: industry.name,
  value: industry.slug,
}))

const headcountItems = headcounts.map((headcount) => ({
  label: headcount.name,
  value: headcount.slug,
}))

export const WorkspaceBusinessSettings = ({ workspace }: Props) => {
  const id = "workspace-business"
  const { mutateAsync: updateWorkspace, isPending: loading } =
    useUpdateWorkspaceMutation()

  const form = useAppForm({
    defaultValues: {
      website: workspace.website || "",
      industry: workspace.industry,
      typicalClients: workspace.typicalClients || [],
      headcount: workspace.headcount,
    } satisfies Pick<
      UpdateWorkspacePayload,
      "industry" | "typicalClients" | "headcount" | "website"
    > as Pick<
      UpdateWorkspacePayload,
      "industry" | "typicalClients" | "headcount" | "website"
    >,
    validators: {
      onSubmit: schema,
      onBlur: schema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateWorkspace(
          {
            data: {
              industry: value.industry,
              typicalClients: value.typicalClients,
              headcount: value.headcount,
              website: value.website,
            },
          },
          {}
        )
        committedValuesRef.current = value
        console.log(value.website)
      } catch (error) {
        form.reset(committedValuesRef.current)

        throw error
      }
    },
  })

  const committedValuesRef = useRef(form.state.values)

  return (
    <div id={id} className="w-full">
      <SectionCard>
        <SectionCardHeader
          title="Company Information"
          description="Information about your business used to personalize your workspace experience."
        />
        <SectionCardFrame>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="w-full"
            id={`${id}-form`}
          >
            <SectionCardContent>
              <SectionCardRow
                title="Company website"
                htmlFor={`${id}-website`}
                className="**:data-[slot=field]:w-80"
              >
                <form.AppField name="website">
                  {(field) => (
                    <field.Input
                      id={`${id}-${field.name}`}
                      disabled={loading}
                      withToastError
                      placeholder="https://somewebsite.com"
                      size="sm"
                    />
                  )}
                </form.AppField>
              </SectionCardRow>
              <SectionCardRow
                title="Industry"
                description="The industry your company primarily operates in."
                htmlFor={`${id}-industry`}
                className="**:data-[slot=field]:w-80"
              >
                <form.AppField name="industry">
                  {(field) => (
                    <field.Select
                      id={`${id}-${field.name}`}
                      disabled={loading}
                      withToastError
                      items={industryItems}
                      size="sm"
                    >
                      {industryItems.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </field.Select>
                  )}
                </form.AppField>
              </SectionCardRow>
              <SectionCardRow
                title="Headcount"
                htmlFor={`${id}-headcount`}
                className="**:data-[slot=field]:w-80"
              >
                <form.AppField name="headcount">
                  {(field) => (
                    <field.Select
                      id={`${id}-${field.name}`}
                      disabled={loading}
                      withToastError
                      items={headcountItems}
                      size="sm"
                    >
                      {headcountItems.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </field.Select>
                  )}
                </form.AppField>
              </SectionCardRow>
              <SectionCardRow
                title="Typical clients"
                description="The types of clients your business primarily serves."
                htmlFor={`${id}-fiscal_year`}
                className="**:data-[slot=field]:w-80"
              >
                <form.AppField name="typicalClients">
                  {(field) => (
                    <field.MultiSelect
                      id={`${id}-${field.name}`}
                      disabled={loading}
                      withToastError
                      size="sm"
                      placeholder="Select one or more client types"
                    >
                      {clientTypes.map(({ name, slug }) => (
                        <MultiSelectItem key={slug} value={slug}>
                          {name}
                        </MultiSelectItem>
                      ))}
                    </field.MultiSelect>
                  )}
                </form.AppField>
              </SectionCardRow>
            </SectionCardContent>
            <SectionCardFooter>
              <form.Subscribe
                selector={(state) => ({
                  canSubmit: state.canSubmit,
                  values: state.values,
                })}
              >
                {({ canSubmit, values }) => {
                  const hasChanges =
                    JSON.stringify(values) !==
                    JSON.stringify(committedValuesRef.current)

                  return (
                    <div className="flex items-center gap-2">
                      {hasChanges && (
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          disabled={loading}
                          onClick={() => {
                            form.reset(committedValuesRef.current)
                          }}
                        >
                          Cancel
                        </Button>
                      )}

                      <Button
                        type="submit"
                        size="sm"
                        disabled={loading || !hasChanges || !canSubmit}
                      >
                        Save changes
                        {loading && <Spinner />}
                      </Button>
                    </div>
                  )
                }}
              </form.Subscribe>
            </SectionCardFooter>
          </form>
        </SectionCardFrame>
      </SectionCard>
    </div>
  )
}
