export const pricingTypeEnum = ["one_time", "instalment", "recurring"] as const

export type PricingTypes = (typeof pricingTypeEnum)[number]

export const serviceStatusEnum = ["draft", "published", "archived"] as const

export type ServiceStatus = (typeof serviceStatusEnum)[number]

export const serviceVisibilityEnum = [
  "public",
  "portal_only",
  "link_only",
  "draft",
] as const

export type ServiceVisibility = (typeof serviceVisibilityEnum)[number]

export const billingCadenceEnum = ["day", "week", "month", "year"] as const

export type billingCadence = (typeof billingCadenceEnum)[number]
