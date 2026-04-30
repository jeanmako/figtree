import { createEnv } from "@t3-oss/env-core"
import * as z from "zod"

export const env = createEnv({
  clientPrefix: "",
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_API_URL: z.string().min(1),
    BETTER_AUTH_SERVER_URL: z.url(),
  },
  runtimeEnv: process.env,
})
