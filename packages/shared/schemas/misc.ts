import z from "zod"
import { clientType } from "./workspace"

export const validSlugRegex = new RegExp(/^[a-zA-Z0-9\-]+$/)

export const ClientTypeSchema = z.enum(clientType)
