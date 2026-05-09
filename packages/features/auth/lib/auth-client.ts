import { createAuthClient } from "better-auth/react"
import { clientEnv } from "@figtree/shared/env/client"
import { AuthClient } from "better-auth/client"
import { twoFactorClient } from "better-auth/plugins"
import { emailOTPClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: "http://localhost:4000",
  plugins: [
    emailOTPClient(),
    twoFactorClient({
      onTwoFactorRedirect({ twoFactorMethods }) {
        // twoFactorMethods is e.g. ["totp", "otp"]
        window.location.href = "/2fa" // Handle the 2FA verification redirect
      },
    }),
  ],
})
