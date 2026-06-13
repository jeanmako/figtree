"use client"

import {
  SectionCard,
  SectionCardContent,
  SectionCardFooter,
  SectionCardFrame,
  SectionCardHeader,
  SectionCardRow,
} from "@/components/layout/section-card"
import { useAppForm } from "@figtree/ui/hooks/form-hook"
import { useUpdateWorkspaceMutation } from "@/modules/workspace/hooks/workspace-update-mutation"
import {
  UpdateWorkspacePayload,
  updateWorkspaceSchema,
  WorkspaceResponse,
} from "@figtree/shared/schemas/workspace"
import { useRef } from "react"
import { Button } from "@figtree/ui/components/button"
import { Spinner } from "@figtree/ui/components/spinner"

type Props = {
  workspace: WorkspaceResponse
}

export const WorkspaceTimeLocaleSettings = ({ workspace }: Props) => {
  const id = "workspace-time-locale"
  const { mutateAsync: updateWorkspace, isPending: loading } =
    useUpdateWorkspaceMutation()

  const schema = updateWorkspaceSchema.pick({
    country: true,
    currency: true,
    timezone: true,
  })

  const form = useAppForm({
    defaultValues: {
      country: workspace.country,
      currency: workspace.currency,
      timezone: workspace.timezone,
    } satisfies Pick<
      UpdateWorkspacePayload,
      "country" | "currency" | "timezone"
    > as Pick<UpdateWorkspacePayload, "country" | "currency" | "timezone">,
    validators: {
      onBlur: schema,
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateWorkspace(
          {
            data: {
              country: value.country,
              currency: value.currency,
              timezone: value.timezone,
            },
          },
          {}
        )
        committedValuesRef.current = value
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
        <SectionCardHeader title="Time & localization" />
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
                title="Business country"
                description="This is your business country of origin."
                htmlFor={`${id}-country`}
                className="**:data-[slot=field]:w-80"
              >
                <form.AppField name="country">
                  {(field) => (
                    <field.CountrySelector
                      id={`${id}-${field.name}`}
                      disabled={loading}
                      popupClassName="[&_[data-slot=combobox-popup]]:w-84"
                      withToastError
                    />
                  )}
                </form.AppField>
              </SectionCardRow>
              <SectionCardRow
                title="Currency"
                htmlFor={`${id}-currency`}
                className="**:data-[slot=field]:w-80"
              >
                <form.AppField name="currency">
                  {(field) => (
                    <field.CurrencySelector
                      id={`${id}-${field.name}`}
                      disabled={loading}
                      popupClassName="[&_[data-slot=combobox-popup]]:w-84"
                      withToastError
                    />
                  )}
                </form.AppField>
              </SectionCardRow>
              <SectionCardRow
                title="Timezone"
                htmlFor={`${id}-timezone`}
                className="**:data-[slot=field]:w-80"
              >
                <form.AppField name="timezone">
                  {(field) => (
                    <field.TimezoneSelector
                      id={`${id}-${field.name}`}
                      disabled={loading}
                      popupClassName="[&_[data-slot=combobox-popup]]:w-84"
                    />
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
