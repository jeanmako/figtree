"use client"
import {
  workspaceBusinessSetupSchema,
  WorkspaceBusinessSetupPayload,
} from "@figtree/shared/schemas/workspace"
import { Button } from "@figtree/ui/components/button"
import {
  clientTypes,
  formId,
  headcounts,
  verticals,
} from "@/modules/workspace/onboarding/lib/misc"
import { useOnboardingProgress } from "@/modules/workspace/onboarding/hooks/use-onboarding-progress"
import { useUpdateWorkspaceDetailsMutation } from "@/modules/workspace/onboarding/hooks/workspace-details-update-mutation"
import { useAppForm } from "@figtree/ui/hooks/form-hook"

export const BusinessOnboardingStep = () => {
  const { finish } = useOnboardingProgress()
  const { mutateAsync: updateDetails, isPending: loading } =
    useUpdateWorkspaceDetailsMutation()
  const form = useAppForm({
    defaultValues: {
      vertical: "design_development",
      headcount: "solo",
      metadata: {
        customVertical: "",
      },
      typicalClients: [],
    } satisfies WorkspaceBusinessSetupPayload as WorkspaceBusinessSetupPayload,
    validators: {
      onSubmit: workspaceBusinessSetupSchema,
    },
    onSubmit: async ({ value: payload }) => {
      await updateDetails(payload, {
        onSuccess: () => {
          finish() // TODO: Update to send to the invite page instead.
        },
      })
    },
  })

  const id = formId("business")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="flex h-full w-full flex-col gap-y-5"
      id={id}
    >
      <div className="flex w-full grow-2 flex-col items-start gap-y-3">
        <form.AppField name="headcount">
          {(field) => (
            <field.ToggleGroupSelector
              description="This helps us understand the scale of your business."
              options={headcounts}
              id={`${id}-${field.name}`}
              htmlFor={`${id}-${field.name}`}
              label="How many people will be working on this workspace?"
              disabled={loading}
              size="sm"
              variant="secondary"
            />
          )}
        </form.AppField>
        <form.AppField name="vertical">
          {(field) => (
            <field.ToggleGroupSelector
              description="This helps us tailor your experience."
              options={verticals}
              id={`${id}-${field.name}`}
              htmlFor={`${id}-${field.name}`}
              label="What kind of work does your business do?"
              disabled={loading}
              size="sm"
              variant="secondary"
            />
          )}
        </form.AppField>
        <form.AppField name="typicalClients">
          {(field) => (
            <field.MultiToggleGroupSelector
              options={clientTypes}
              id={`${id}-${field.name}`}
              htmlFor={`${id}-${field.name}`}
              label="Who do you typically work with?"
              disabled={loading}
              size="sm"
              variant="secondary"
            />
          )}
        </form.AppField>
      </div>
      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  )
}
