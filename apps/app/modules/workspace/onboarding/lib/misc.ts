import { Option } from "@figtree/ui/components/toggle-group-selector"
import {
  clientType,
  ClientType,
  headcount,
  Headcount,
  industry,
  Industry,
} from "@figtree/shared/schemas/workspace"

export const formId = (prefix: string): string =>
  `workspace-onboarding-${prefix}-form`

export const industryLabels: Record<Industry, string> = {
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

export const industries: Option[] = industry.map((slug) => ({
  slug,
  name: industryLabels[slug],
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

type MonthOption = {
  slug: number
  name: string
}

export const monthOptions: MonthOption[] = [
  { slug: 1, name: "January" },
  { slug: 2, name: "February" },
  { slug: 3, name: "March" },
  { slug: 4, name: "April" },
  { slug: 5, name: "May" },
  { slug: 6, name: "June" },
  { slug: 7, name: "July" },
  { slug: 8, name: "August" },
  { slug: 9, name: "September" },
  { slug: 10, name: "October" },
  { slug: 11, name: "November" },
  { slug: 12, name: "December" },
]
