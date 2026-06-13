import z from "zod"
import {
  headcount,
  plans,
  workspaceRolesEnum,
  industry,
  clientType,
} from "./types"
import slugify from "@sindresorhus/slugify"
import { ClientTypeSchema, validSlugRegex } from "../misc"
import { countryCodes } from "@figtree/utils/constants/countries"
import { currencyCodes } from "@figtree/utils/constants/currencies"
import { timezoneValues } from "@figtree/utils/constants/timezones"

export const workspaceQueryWithSlug = z.object({
  workspaceSlug: z.string(),
})

export const addressSchema = z.object({
  line1: z.string().optional(),
  line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
})

export const WorkspaceSchema = z.object({
  id: z.string().describe("The unique ID of the workspace."),
  name: z.string().describe("The name of the workspace."),
  slug: z.string().describe("The slug of the workspace."),
  country: z
    .enum(countryCodes)
    .describe("The country the business is in.")
    .nullable(),
  currency: z.enum(currencyCodes).describe("The currency the business uses."),
  timezone: z
    .enum(timezoneValues)
    .describe("The timezone specific to the workspace.")
    .nullish(),
  plan: z.enum(plans).default("solo").describe("The plan of the workspace."),
  website: z.string().nullable().describe("The URL of the company's website."),
  industry: z
    .enum(industry)
    .nullable()
    .default("design_development")
    .describe("The industry the company primarily operates in."),
  logoIconUrl: z
    .string()
    .nullable()
    .default(null)
    .describe("The mark logo of the workspace."),
  logoWordmarkUrl: z
    .string()
    .nullable()
    .default(null)
    .describe("The wordmark logo of the workspace."),
  inviteCode: z
    .string()
    .nullable()
    .describe("The invite code of the workspace."),
  billingName: z
    .string()
    .nullable()
    .describe("The name on the workspace's billing account."),
  billingEmail: z
    .string()
    .nullable()
    .describe("The email on the workspace's billing account."),
  // billingAddress: z
  //   .record(z.string(), z.string())
  //   .nullable()
  //   .describe("The address on the workspace's billing account."),
  typicalClients: z
    .array(ClientTypeSchema)
    .describe("The types of clients the business primarily serves."),
  fiscalYearStartMonth: z
    .number()
    .int()
    .min(1)
    .max(12)
    .nullable()
    .describe("The month the fiscal year starts for the workspace."),
  stripeAccountId: z
    .string()
    .nullable()
    .describe("The Stripe account ID for the workspace."),
  stripeConnected: z.boolean().default(false).describe("Whether the user"),
  workspaceUrl: z
    .string()
    .nullable()
    .describe("The URL of the workspace in Figtree."),
  headcount: z
    .enum(headcount)
    .nullable()
    .describe("The number of teammates that will use Figtree."),
  billingCycleStart: z
    .number()
    .describe("The date and time the billing cycle starts for the workspace."),
  trialEndsAt: z
    .date()
    .nullable()
    .describe("The date and time the workspace's free trial ends."),
  paymentTerms: z.string().default("net_14"),
  members: z.array(
    z.object({
      role: z
        .enum(workspaceRolesEnum)
        .describe("The role of the authenticated user within the workspace."),
      canManageBilling: z.boolean(),
      canManageTeam: z.boolean(),
      canViewIntelligence: z.boolean(),
      canManageStore: z.boolean(),
    })
  ),
  createdAt: z
    .date()
    .describe("The date and time when the workspace was created."),
})

export const WorkspaceMemberSchema = z.object({
  role: z.enum(workspaceRolesEnum).default("member"),
  title: z.string(),
  canManageBilling: z.boolean(),
  canManageTeam: z.boolean(),
  canViewIntelligence: z.boolean(),
  canManageStore: z.boolean(),
  joinedAt: z.date(),
})

export const CreateWorkspaceResponseSchema = WorkspaceSchema.omit({
  // billingAddress: true,
  paymentTerms: true,
  headcount: true,
  billingEmail: true,
  billingName: true,
  stripeAccountId: true,
  stripeConnected: true,
})

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, "Workspace name must be at least 2 characters.")
    .max(48, "Workspace name must be less than 48 characters."),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters.")
    .max(48, "Slug must be less than 48 characters.")
    .transform((v) => slugify(v))
    .refine((v) => validSlugRegex.test(v), {
      message: "Invalid slug format",
    }),

  country: z.enum(countryCodes),
  currency: z.enum(currencyCodes),
})

export const updateWorkspaceSchema = z
  .object({
    name: z
      .string()
      .min(2, "Workspace name must be at least 2 characters.")
      .max(48, "Workspace name must be less than 48 characters."),
    plan: z.enum(plans),
    industry: z.enum(industry).nullable(),
    country: z.enum(countryCodes).nullable(),
    currency: z.enum(currencyCodes),
    timezone: z.enum(timezoneValues).nullable(),
    website: z.url().or(z.literal("")).nullable(),
    metadata: z.object({
      customIndustry: z.string().trim().optional(), // TODO: Turn this into an enum for better validation.
    }),
    headcount: z.enum(headcount).nullable(),
    typicalClients: z
      .array(ClientTypeSchema)
      .min(1, { message: "Select at least one client type." }),
    inviteCode: z.string(),
    logoIconUrl: z.string().nullish(),
    logoWordmarkUrl: z.string().nullish(),
    billingName: z.string().nullish(),
    billingEmail: z.string().nullish(),
    billingAddress: addressSchema.optional(),
    paymentTerms: z.string(),
    members: z.array(
      z.object({
        role: z
          .enum(workspaceRolesEnum)
          .describe("The role of the authenticated user within the workspace."),
        canManageBilling: z.boolean(),
        canManageTeam: z.boolean(),
        canViewIntelligence: z.boolean(),
        canManageStore: z.boolean(),
      })
    ),
    taxRate: z.number().positive(),
    lateFeeRate: z.number().positive(),
    invoicePrefix: z.string(),
    revisionRounds: z.int().positive(),
    validDays: z.int().positive(),
    scopeProtectionEnabled: z.boolean(),
    effectiveRateMin: z.number().positive(),
    wiseEmail: z.string().nullish(),
    fiscalYearStartMonth: z.int().lte(12).positive(),
  })
  .partial()

export const updateWorkspaceBusinessSettingsSchema = updateWorkspaceSchema
  .pick({
    industry: true,
    headcount: true,
    typicalClients: true,
    website: true,
  })
  .partial()

export const workspaceBusinessSetupSchema = z
  .object({
    industry: z.enum(industry).default("design_development").nonoptional(),

    metadata: z.object({
      customIndustry: z.string().trim().optional(), // TODO: Turn this into an enum for better validation.
    }),
    headcount: z.enum(headcount),
    typicalClients: z
      .array(ClientTypeSchema)
      .min(1, { message: "Select at least one client type." }),
  })
  .superRefine((data, ctx) => {
    if (
      data.industry === "other" &&
      (!data.metadata.customIndustry || data.metadata.customIndustry.length < 2)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["metadata", "customIndustry"],
        message: "Please specify the industry.",
      })
    }
  })
