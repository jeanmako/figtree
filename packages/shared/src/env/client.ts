import { createEnv } from "@t3-oss/env-core"
import * as z from "zod"
import { shared } from "./shared"

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    ...shared,
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_API_URL: z.string().min(1),
  },
  runtimeEnv: process.env,
})
