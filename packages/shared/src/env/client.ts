import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_API_URL: z.string().min(1),
    NEXT_PUBLIC_BETTER_AUTH_SERVER_URL: z.url(),
    NEXT_PUBLIC_APP_NAME: z.string().min(1),
  },
  runtimeEnv: process.env,
})
