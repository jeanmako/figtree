"use client"

import { Button } from "@figtree/ui/components/button"
import { z } from "zod"
import {
  CreateWorkspacePayload,
  createWorkspaceSchema,
} from "@figtree/shared/schemas/workspace"
import { formId } from "@/modules/workspace/onboarding/lib/misc"
import { useCreateWorkspaceMutation } from "@/modules/workspace/hooks/workspace-create-mutation"
import { useAppForm } from "@figtree/ui/hooks/form-hook"

type Props = {
  onSuccess?: (payload: z.infer<typeof createWorkspaceSchema>) => void
}

export const OnboardingWorkspaceForm = ({ onSuccess }: Props) => {
  const { mutateAsync: createWorkspace, isPending: loading } =
    useCreateWorkspaceMutation()
  const form = useAppForm({
    defaultValues: {
      name: "",
      slug: "",
      country: "CY",
      currency: "EUR",
    } satisfies CreateWorkspacePayload as CreateWorkspacePayload,
    validators: {
      onSubmit: createWorkspaceSchema,
    },
    onSubmit: async ({ value: payload }) => {
      await createWorkspace(payload, {
        onSuccess: () => {
          onSuccess?.(payload)
        },
      })
    },
  })

  const id = formId("details")

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
        <form.AppField name="name">
          {(field) => (
            <field.Input
              id={`${id}-${field.name}`}
              htmlFor={`${id}-${field.name}`}
              label="What's the name of your company or team?"
              disabled={loading}
              placeholder="Acme Corp"
            />
          )}
        </form.AppField>
        <form.AppField name="slug">
          {(field) => (
            <field.SlugInput
              addOn="app.figtree.com/"
              id={`${id}-${field.name}`}
              htmlFor={`${id}-${field.name}`}
              label="What will your workspace handle be?"
              disabled={loading}
              placeholder="acme-corp"
              className="h-7.5"
            />
          )}
        </form.AppField>
        <form.AppField name="country">
          {(field) => (
            <field.CountrySelector
              id={`${id}-${field.name}`}
              htmlFor={`${id}-${field.name}`}
              label="Where is your business located?"
              disabled={loading}
            />
          )}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => (
            <field.CurrencySelector
              id={`${id}-${field.name}`}
              htmlFor={`${id}-${field.name}`}
              label="What currency does your business use?"
              disabled={loading}
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
