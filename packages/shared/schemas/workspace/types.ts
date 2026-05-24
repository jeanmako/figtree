import z from "zod"
import {
  CreateWorkspaceResponseSchema,
  createWorkspaceSchema,
  updateWorkspaceSchema,
  workspaceBusinessSetupSchema,
  WorkspaceMemberSchema,
  WorkspaceSchema,
} from "./schema"

export const workspaceRolesEnum = [
  "owner",
  "member",
  "admin",
  "viewer",
] as const

export type WorkspaceRoles = (typeof workspaceRolesEnum)[number]

export const headcount = [
  "solo",
  "micro",
  "small",
  "mid",
  "large",
  "enterprise",
] as const

export type Headcount = (typeof headcount)[number]

export const vertical = [
  "web_dev",
  "web_design",
  "photography",
  "illustration",
  "design_development",
  "software_dev",
  "game_dev",
  "graphic_design",
  "other",
] as const

export type Vertical = (typeof vertical)[number]

export const plans = ["trial", "solo", "pro", "studio", "agency"] as const

export const clientType = [
  "startups",
  "smb",
  "agencies",
  "creators",
  "saas",
  "enterprises",
  "ecommerce",
  "nonprofits",
  "local_businesses",
  "personal_brands",
] as const

export type ClientType = (typeof clientType)[number]

export type WorkspaceResponse = z.infer<typeof WorkspaceSchema>

export type WorkspaceMemberParams = z.infer<typeof WorkspaceMemberSchema>
export type CreateWorkspacePayload = z.infer<typeof createWorkspaceSchema>
export type WorkspaceCreateResponse = z.infer<
  typeof CreateWorkspaceResponseSchema
>

export type UpdateWorkspacePayload = z.infer<typeof updateWorkspaceSchema>
export type WorkspaceBusinessSetupPayload = z.infer<
  typeof workspaceBusinessSetupSchema
>
