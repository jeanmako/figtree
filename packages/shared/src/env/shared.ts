import { z } from "zod"

export const shared = {
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
}
