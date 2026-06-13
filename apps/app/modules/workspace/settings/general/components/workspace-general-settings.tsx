"use client"

import { useRef } from "react"
import {
  SectionCard,
  SectionCardContent,
  SectionCardFooter,
  SectionCardFrame,
  SectionCardRow,
} from "@/components/layout/section-card"
import { useAppForm } from "@figtree/ui/hooks/form-hook"
import { useUpdateWorkspaceMutation } from "@/modules/workspace/hooks/workspace-update-mutation"
import {
  UpdateWorkspacePayload,
  updateWorkspaceSchema,
  WorkspaceResponse,
} from "@figtree/shared/schemas/workspace"
import { Button } from "@figtree/ui/components/button"
import { SlugInput } from "@figtree/ui/components/shared/slug-input"
import { Spinner } from "@figtree/ui/components/spinner"

type Props = {
  workspace: WorkspaceResponse
}

export const WorkspaceGeneralSettings = ({ workspace }: Props) => {
  const id = "workspace-general"

  const { mutateAsync: updateWorkspace, isPending: loading } =
    useUpdateWorkspaceMutation()

  const form = useAppForm({
    defaultValues: {
      name: workspace.name ?? "",
    } satisfies Pick<UpdateWorkspacePayload, "name"> as Pick<
      UpdateWorkspacePayload,
      "name"
    >,

    validators: {
      onBlur: updateWorkspaceSchema.pick({
        name: true,
      }),
      onSubmit: updateWorkspaceSchema.pick({
        name: true,
      }),
    },

    onSubmit: async ({ value }) => {
      try {
        await updateWorkspace({
          data: {
            name: value.name,
          },
        })

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
      <form
        id={`${id}-form`}
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <SectionCard>
          <SectionCardFrame>
            <SectionCardContent>
              <SectionCardRow
                title="Name"
                htmlFor={`${id}-name`}
                className="**:data-[slot=field]:w-80"
              >
                <form.AppField name="name">
                  {(field) => (
                    <field.Input
                      id={`${id}-${field.name}`}
                      disabled={loading}
                      withToastError
                      size="sm"
                    />
                  )}
                </form.AppField>
              </SectionCardRow>

              <SectionCardRow title="Slug" htmlFor={`${id}-slug`}>
                <SlugInput
                  id={`${id}-slug`}
                  addOn="app.figtree.com/"
                  value={workspace.slug}
                  readOnly
                  disabled={loading}
                  size="sm"
                  className="h-7.5 w-80"
                />
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
          </SectionCardFrame>
        </SectionCard>
      </form>
    </div>
  )
}
