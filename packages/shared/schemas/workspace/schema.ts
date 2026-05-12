import z from "zod"
import {
  headcount,
  plans,
  workspaceRolesEnum,
  workspaceVertical,
} from "./types"

// TODO: Maybe add an enum for ISO country codes to be strict with country inputs?

export const WorkspaceSchema = z.object({
  id: z.string().describe("The unique ID of the workspace."),
  name: z.string().describe("The name of the workspace."),
  slug: z.string().describe("The slug of the workspace."),
  country: z.string().describe("The country the business is in.").nullable(),
  currency: z.string().describe("The currency the business uses.").nullable(),
  plan: z.enum(plans).default("solo").describe("The plan of the workspace."),
  vertical: z
    .enum(workspaceVertical)
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
  billingAddress: z
    .string()
    .nullable()
    .describe("The address on the workspace's billing account."),
  stripeAccountId: z
    .string()
    .nullable()
    .describe("The Stripe account ID for the workspace."),

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
