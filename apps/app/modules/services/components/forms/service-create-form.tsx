"use client"

import { useAppForm } from "@figtree/ui/hooks/form-hook"
import {
  CreateServicePayload,
  createServiceSchema,
} from "@figtree/shared/schemas/services"
import { visibility } from "@/modules/services/lib/misc"
import slugify from "@sindresorhus/slugify"

export const ServiceCreateForm = () => {
  const id = "service-create-form"
  const form = useAppForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      featured: false,
      visibility: "public",
    } satisfies CreateServicePayload as CreateServicePayload,
    validators: {
      onSubmit: createServiceSchema,
    },
  })
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
        <form.AppField
          name="name"
          listeners={{
            onChange: ({ value }) => {
              form.setFieldValue("slug", slugify(value))
            },
          }}
        >
          {(field) => (
            <field.Input
              id={`${id}-${field.name}`}
              htmlFor={`${id}-${field.name}`}
              label="Name"
              placeholder="Website Design"
            />
          )}
        </form.AppField>
        <form.AppField name="slug">
          {(field) => (
            <field.SlugInput
              addOn="app.figtree.com/services/"
              id={`${id}-${field.name}`}
              htmlFor={`${id}-${field.name}`}
              label="Slug"
              placeholder="website-design"
            />
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.Textarea
              id={`${id}-${field.name}`}
              htmlFor={`${id}-${field.name}`}
              label="Description"
              placeholder="Custom marketing website"
            />
          )}
        </form.AppField>
        <form.AppField name="visibility">
          {(field) => (
            <field.ToggleGroupSelector
              options={visibility}
              id={`${id}-${field.name}`}
              htmlFor={`${id}-${field.name}`}
              label="Visibility"
              size="sm"
              variant="secondary"
            />
          )}
        </form.AppField>
      </div>
    </form>
  )
}

export default ServiceCreateForm
