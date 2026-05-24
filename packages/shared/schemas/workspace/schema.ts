import z from "zod"
import {
  headcount,
  plans,
  workspaceRolesEnum,
  vertical,
  clientType,
} from "./types"
import slugify from "@sindresorhus/slugify"
import { ClientTypeSchema, validSlugRegex } from "../misc"
import { countryCodes } from "@figtree/utils/constants/countries"
import { currencyCodes } from "@figtree/utils/constants/currencies"

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
  country: z.string().describe("The country the business is in.").nullable(),
  currency: z.string().describe("The currency the business uses.").nullable(),
  plan: z.enum(plans).default("solo").describe("The plan of the workspace."),
  vertical: z
    .enum(vertical)
    .nullable()
    .default("design_development")
    .describe("The vertical of the workspace."),
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
    vertical: z.enum(vertical),
    country: z.enum(countryCodes),
    currency: z.enum(currencyCodes),
    metadata: z.object({
      customVertical: z.string().trim().optional(), // TODO: Turn this into an enum for better validation.
    }),
    headcount: z.enum(headcount),
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
  })
  .partial()

export const workspaceBusinessSetupSchema = z
  .object({
    vertical: z.enum(vertical).default("design_development").nonoptional(),

    metadata: z.object({
      customVertical: z.string().trim().optional(), // TODO: Turn this into an enum for better validation.
    }),
    headcount: z.enum(headcount),
    typicalClients: z
      .array(ClientTypeSchema)
      .min(1, { message: "Select at least one client type." }),
  })
  .superRefine((data, ctx) => {
    if (
      data.vertical === "other" &&
      (!data.metadata.customVertical || data.metadata.customVertical.length < 2)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["metadata", "customVertical"],
        message: "Please specify the vertical.",
      })
    }
  })
