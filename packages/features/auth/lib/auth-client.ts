import { createAuthClient } from "better-auth/react"
import { clientEnv } from "@figtree/shared/env/client"
import { AuthClient } from "better-auth/client"

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_SERVER_URL,
})
