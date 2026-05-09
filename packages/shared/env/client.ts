import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const clientEnv = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_SERVER_URL: z.string().min(1),
    NEXT_PUBLIC_BETTER_AUTH_SERVER_URL: z.url(),
    NEXT_PUBLIC_APP_NAME: z.string().min(1).default("Figtree").nonoptional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_BETTER_AUTH_SERVER_URL:
      process.env.NEXT_PUBLIC_BETTER_AUTH_SERVER_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
})
