import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "@figtree/prisma"
import { hashPassword, validatePassword } from "./password"
import {
  TOTP_CODE_LENGTH,
  TOTP_EXPIRY_IN,
  PASSWORD_RESET_TOKEN_EXPIRY,
} from "./constants"
import { twoFactor, emailOTP } from "better-auth/plugins"
import { createAuthMiddleware } from "better-auth/api"
import { serverEnv } from "@figtree/shared/env/server"

export const auth = betterAuth({
  appName: "Figtree",
  trustedOrigins: ["http://localhost:3000"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: PASSWORD_RESET_TOKEN_EXPIRY,
    maxPasswordLength: 72,
    password: {
      hash: hashPassword,
      verify: validatePassword,
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    cookiePrefix:
      process.env.NODE_ENV === "production" ? "__Secure-figtree" : "figtree",
    useSecureCookies: process.env.NODE_ENV === "production",
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  },
  plugins: [
    twoFactor({
      issuer: "Figtree",
      totpOptions: {
        period: TOTP_EXPIRY_IN,
        digits: TOTP_CODE_LENGTH,
      },
    }),
    emailOTP({
      overrideDefaultEmailVerification: true,
      sendVerificationOnSignUp: true,
      expiresIn: 300,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          serverEnv.NODE_ENV === "production"
            ? {}
            : console.log("Your verification code: ", otp)
        } else if (type === "forget-password") {
          // Send the OTP for email verification
        } else {
          return
        }
      },
    }),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              image: `https://api.dicebear.com/9.x/thumbs/svg?seed=${ctx.body.email}`, // generate a unique avatar based on the user's email using Dicebear's API
            },
          },
        }
      }
    }),
  },
  user: {
    additionalFields: {
      role: {
        type: ["internal", "client", "admin"], // TODO: Pass in the roles from a shared package instead of hardcoding them here
        required: false,
        defaultValue: "internal",
        input: false, // don't allow user to set role
      },
    },
  },
})
