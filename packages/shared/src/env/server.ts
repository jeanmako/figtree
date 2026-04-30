import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"
import { shared } from "./shared"

export const serverEnv = createEnv({
  server: {
    ...shared,
    PORT: z.coerce.number().default(4000),
    DATABASE_URL: z.url(),
    DATABASE_PASSWORD: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),
    RESEND_API_KEY: z.string().min(1),
  },
  runtimeEnv: process.env,
})
