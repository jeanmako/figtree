import z from "zod"
import {
  createServiceSchema,
  ServicePackageSchema,
  ServiceSchema,
} from "./schema"

export const pricingTypeEnum = ["one_time", "instalment", "recurring"] as const

export type PricingTypes = (typeof pricingTypeEnum)[number]

export const serviceStatusEnum = ["draft", "published", "archived"] as const

export type ServiceStatus = (typeof serviceStatusEnum)[number]

export const serviceVisibilityEnum = [
  "public",
  "portal_only",
  "link_only",
] as const

export type ServiceVisibility = (typeof serviceVisibilityEnum)[number]

export const billingCadenceEnum = ["day", "week", "month", "year"] as const

export type billingCadence = (typeof billingCadenceEnum)[number]

export const lineItemTypeEnum = [
  "fixed",
  "hourly",
  "day_rate",
  "expense",
  "change_order",
  "retainer_cycle",
] as const

export type lineItemType = (typeof lineItemTypeEnum)[number]

export const durationUnitEnum = ["days", "weeks", "months"] as const

export type durationUnit = (typeof durationUnitEnum)[number]

export const completionActionEnum = [
  "request_approval",
  "unlock_deliverables",
  "generate_invoice",
  "notify_client",
  "notify_team",
  "start_next_phase",
] as const

export type completionAction = (typeof completionActionEnum)[number]

export type ServiceResponse = z.infer<typeof ServiceSchema>
export type ServicePackageResponse = z.infer<typeof ServicePackageSchema>
export type CreateServicePayload = z.infer<typeof createServiceSchema>
