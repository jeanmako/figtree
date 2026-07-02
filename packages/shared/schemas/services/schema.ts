import { z } from "zod"
import {
  durationUnitEnum,
  lineItemTypeEnum,
  pricingTypeEnum,
  serviceStatusEnum,
  serviceVisibilityEnum,
} from "./types"
import slugify from "@sindresorhus/slugify"

const validSlugRegex = new RegExp(/^[a-zA-Z0-9\-]+$/)

export const deliverableSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  quantity: z.number().positive().default(1).nonoptional(),
  unit: z.string().optional(),
  variants: z.array(z.string()).default([]).nonoptional(),
  fileTypes: z.array(z.string()).default([]).nonoptional(),
  estimatedHours: z.number().positive().optional(),
  dependencies: z.array(z.string()).default([]).nonoptional(),
  required: z.boolean().default(true).nonoptional(),
  acceptanceCriteria: z.array(z.string()).default([]).nonoptional(),
  clientInput: z.object({
    required: z.boolean().default(false).nonoptional(),
    description: z.string().optional(),
    dueAfter: z
      .object({
        value: z.number().positive(),
        unit: z.enum(["days", "weeks"]),
      })
      .optional(),
  }),
})

export const lineItemDiscountSchema = z.object({
  type: z.enum(["fixed", "percentage"]),
  value: z.number().nonnegative(),
})

export const lineItemSchema = z.object({
  label: z.string().min(1, "Label is required."),

  details: z.string().optional(),
  type: z.enum(lineItemTypeEnum).default("fixed").nonoptional(),
  quantity: z.number().positive().default(1).nonoptional(),
  unitLabel: z.string().trim().optional(),
  unitPrice: z.number().nonnegative(),
  subtotal: z.number().nonnegative().optional(), // Computed
  taxable: z.boolean().default(true).nonoptional(),
  taxRate: z.number().min(0).max(1).default(0).optional(),

  optional: z.boolean().default(false).nonoptional(),

  discount: lineItemDiscountSchema.optional(),

  /**
   * Deliverables included in this pricing item.
   *
   * A single pricing item may cover multiple deliverables.
   */
  deliverableIds: z.array(z.string()).default([]).optional(),

  /**
   * Internal planning
   */
  estimatedHours: z.number().positive().optional(),
  estimatedCost: z.number().nonnegative().optional(),
  targetMargin: z.number().min(0).max(1).optional(),
})

const phaseAction = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("request_approval"),
  }),
  z.object({
    type: z.literal("unlock_deliverables"),
    deliverableIds: z.array(z.string()),
  }),
  z.object({
    type: z.literal("generate_invoice"),
    paymentMilestoneId: z.string(),
  }),
  z.object({
    type: z.literal("notify_client"),
    template: z.string().optional(),
  }),
])

export const timelineSchema = z.object({
  name: z.string().min(1, "Phase name is required."),
  description: z.string().optional(),
  duration: z.object({
    value: z.number().int().positive(),

    unit: z.enum(durationUnitEnum),
  }),
  deliverableIds: z.array(z.string()).default([]).optional(),
  completionActions: phaseAction.array(),
  estimatedHours: z.number().positive().optional(),
})

export const ServiceSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  status: z.enum(serviceStatusEnum),
  visibility: z.enum(serviceVisibilityEnum),
  featured: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const ServicePackageSchema = z.object({
  id: z.string(),
  serviceId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  pricingType: z.enum(pricingTypeEnum),
  price: z.number().positive(),
  currency: z.string(),
  featured: z.boolean(),
  active: z.boolean(),
  // interval: z.enum(billingCadenceEnum).nullable(),
  // intervalCount: z.int().positive().nullable(),
  // sortOrder: z.number().int(),
  // paymentPreferences: z.unknown().nullable(),
  // lineItems: lineItemSchema.array(),
  // deliverables: deliverableSchema.array(),
  // timeline: timelineSchema.array(),
  // paymentSchedule: z.unknown().nullable(),
  // legalClauses: z.unknown().nullable(),
  // revisionPolicy: z.unknown().nullable(),
  // autoCreateProject: z.boolean(),
  // autoCreateCompany: z.boolean(),
  // autoSendBriefForm: z.boolean(),
  // autoSendPortalInvite: z.boolean(),
  // briefFormId: z.string().nullable(),
  // autoApplyRevisionPolicy: z.boolean(),
  // autoApplyPaymentSchedule: z.boolean(),
  // autoApplyLegalClauses: z.boolean(),
  // createdAt: z.date(),
  // updatedAt: z.date(),
})

export const CreateServiceResponseSchema = ServiceSchema.pick({
  id: true,
  slug: true,
  name: true,
  description: true,
  status: true,
  visibility: true,
  featured: true,
})

export const createServiceSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required.")
    .max(128, "Name must be less than 128 characters."),
  slug: z
    .string()
    .nonempty("Slug is required.")
    .max(128, "Slug must be less than 128 characters.")
    .transform((v) => slugify(v))
    .refine((v) => validSlugRegex.test(v), {
      message: "Invalid slug format",
    }),
  description: z.string().optional(),
  visibility: z.enum(serviceVisibilityEnum).default("public").nonoptional(),
  featured: z.boolean().default(false).nonoptional(),
})
