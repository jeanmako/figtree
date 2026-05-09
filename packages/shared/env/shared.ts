import { z } from "zod"

export const shared = {
  NODE_ENV: z.enum(["development", "test", "production"]),
}
