import { Option } from "@figtree/ui/components/toggle-group-selector"
import {
  serviceStatusEnum,
  ServiceStatus,
  serviceVisibilityEnum,
  ServiceVisibility,
} from "@figtree/shared/schemas/services"

export const statusLabels: Record<ServiceStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
}

export const statuses: Option[] = serviceStatusEnum.map((slug) => ({
  slug,
  name: statusLabels[slug],
}))

export const visibilityLabels: Record<ServiceVisibility, string> = {
  public: "Public",
  portal_only: "Portal only",
  link_only: "Link only",
}

export const visibility: Option[] = serviceVisibilityEnum.map((slug) => ({
  slug,
  name: visibilityLabels[slug],
}))
