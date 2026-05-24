import { Option } from "@figtree/ui/components/toggle-group-selector"
import {
  clientType,
  ClientType,
  headcount,
  Headcount,
  vertical,
  Vertical,
} from "@figtree/shared/schemas/workspace"

export const formId = (prefix: string): string =>
  `workspace-onboarding-${prefix}-form`

export const verticalLabels: Record<Vertical, string> = {
  design_development: "Design and Development",
  web_design: "Web Design",
  photography: "Photography",
  web_dev: "Web Development",
  graphic_design: "Graphic Design",
  software_dev: "Software Development",
  game_dev: "Game Development",
  illustration: "Illustration",
  other: "Other",
}

export const verticals: Option[] = vertical.map((slug) => ({
  slug,
  name: verticalLabels[slug],
}))

export const headcountLabels: Record<Headcount, string> = {
  solo: "Just myself",
  micro: "2-5",
  small: "6-20",
  mid: "21-50",
  large: "51-100",
  enterprise: "100+",
}

export const headcounts: Option[] = headcount.map((slug) => ({
  slug,
  name: headcountLabels[slug],
}))

export const clientTypeLabels: Record<ClientType, string> = {
  startups: "Startups",
  smb: "SMBs",
  agencies: "Agencies",
  creators: "Creators",
  saas: "SaaS",
  ecommerce: "Ecommerce brands",
  enterprises: "Enterprises",
  nonprofits: "Nonprofits",
  local_businesses: "Local businesses",
  personal_brands: "Personal brands",
}

export const clientTypes: Option[] = clientType.map((slug) => ({
  slug,
  name: clientTypeLabels[slug],
}))
