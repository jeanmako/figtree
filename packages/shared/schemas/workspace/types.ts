import z from "zod"
import { WorkspaceMemberSchema } from "./schema"

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

export const workspaceVertical = [
  "web_dev",
  "web_design",
  "photography",
  "illustration",
  "design_development",
  "software_dev",
  "game_dev",
  "graphic_design",
] as const

export type WorkspaceVertical = (typeof workspaceVertical)[number]

export const plans = ["trial", "solo", "pro", "studio", "agency"] as const

export type WorkspaceMemberParams = z.infer<typeof WorkspaceMemberSchema>
