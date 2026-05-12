import { z } from "zod"

export const ProfileSchema = z.object({
  id: z.string(),
  locale: z.string(),
  weekStartsOnMonday: z.boolean().default(false),
  timezone: z.string(),
  dateFormat: z.string().nullable(),
})
