import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "@figtree/prisma"
import { serverEnv } from "@figtree/shared/env/server"
import { clientEnv } from "@figtree/shared/env/client"
import { hashPassword, validatePassword } from "./password"
import { PASSWORD_RESET_TOKEN_EXPIRY } from "./constants"

export const auth = betterAuth({
  appName: clientEnv.NEXT_PUBLIC_APP_NAME,
  trustedOrigins: [serverEnv.CLIENT_ORIGIN],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,

    /*
    Better user experience to not require email verification on sign up.
    We will instead ask them to verify their email when they try to do a major action like adding a payment method,
    changing their password, sending a proposal, inviting a client to a portal, etc. 
    This way they can get started right away and we can still ensure that they verify their email before doing anything important.
    */
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: PASSWORD_RESET_TOKEN_EXPIRY,
    maxPasswordLength: 72,
    password: {
      hash: hashPassword,
      verify: validatePassword,
    },
  },
  advanced: {
    cookiePrefix:
      serverEnv.NODE_ENV === "production" ? "__Secure-figtree" : "figtree",
    useSecureCookies: serverEnv.NODE_ENV === "production",
    defaultCookieAttributes: {
      httpOnly: true,
      secure: serverEnv.NODE_ENV === "production",
      sameSite: "lax",
    },
  },
})
